from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.ocr.engine import OcrEngine
from app.ocr.models import OcrResponse, FaceVerificationRequest, FaceVerificationResponse
from app.services.face_verifier import FaceVerifier

app = FastAPI(
    title="Skill-Bridge OCR & Verification API",
    version="1.0.0",
    description="Python OCR Processing & Biometric Quality Verification Service for Skill Bridge"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {
        "status": "healthy",
        "service": "Skill-Bridge OCR & Biometric Engine",
        "version": "1.0.0"
    }

@app.get("/health")
def health_status():
    return {"status": "ok"}

@app.post("/api/ocr/process-document", response_model=OcrResponse)
async def process_document(
    file: UploadFile = File(...),
    document_type: str = Form("student_id"),
    student_id: str = Form("stu-2024-042")
):
    """
    Receives uploaded academic or identity document (PNG, JPG, JPEG, PDF)
    and extracts structured text, student ID, name, institution, and validity dates.
    """
    # 1. Read file bytes
    content = await file.read()
    file_size = len(content)

    # 2. Server-side file size verification
    # Images: Max 2 MB, PDFs: Max 5 MB
    is_pdf = file.content_type == "application/pdf" or file.filename.lower().endswith(".pdf")
    max_size = 5 * 1024 * 1024 if is_pdf else 2 * 1024 * 1024

    if file_size > max_size:
        max_mb = 5 if is_pdf else 2
        return OcrResponse(
            status="failed",
            document_type=document_type,
            extracted_text="",
            extracted_fields={},
            confidence=0.0,
            word_count=0,
            engine="validator",
            is_valid_document=False,
            quality_metrics={"file_size_bytes": file_size},
            error=f"{'PDF' if is_pdf else 'Image'} documents must be {max_mb} MB or smaller."
        )

    # 3. Server-side MIME & Magic Bytes Validation
    # PDF magic: %PDF- (0x25 0x50 0x44 0x46)
    # PNG magic: \x89PNG (0x89 0x50 0x4E 0x47)
    # JPG magic: \xFF\xD8\xFF
    is_valid_magic = False
    if content.startswith(b"%PDF-"):
        is_valid_magic = True
    elif content.startswith(b"\x89PNG\r\n\x1a\n") or content.startswith(b"\x89PNG"):
        is_valid_magic = True
    elif content.startswith(b"\xff\xd8\xff"):
        is_valid_magic = True

    if not is_valid_magic:
        return OcrResponse(
            status="failed",
            document_type=document_type,
            extracted_text="",
            extracted_fields={},
            confidence=0.0,
            word_count=0,
            engine="mime_validator",
            is_valid_document=False,
            quality_metrics={"file_size_bytes": file_size},
            error="Only PNG, JPG and PDF files are supported."
        )

    # 4. Process via Python OCR Engine
    result = OcrEngine.process_document(
        file_bytes=content,
        filename=file.filename or "document",
        content_type=file.content_type or ("application/pdf" if is_pdf else "image/jpeg"),
        document_type=document_type
    )

    return result

@app.post("/api/verification/process-face", response_model=FaceVerificationResponse)
def process_face(request: FaceVerificationRequest):
    """
    Receives captured live selfie photo from browser canvas (auto or manual capture),
    validates lighting, centering, clarity, and biometric presence.
    """
    return FaceVerifier.verify_capture(request)

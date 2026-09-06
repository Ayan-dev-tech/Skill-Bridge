from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List

class ExtractedFields(BaseModel):
    name: Optional[str] = None
    id_number: Optional[str] = None
    institution: Optional[str] = None
    course: Optional[str] = None
    semester: Optional[str] = None
    valid_until: Optional[str] = None
    detected_type: Optional[str] = None

class QualityMetrics(BaseModel):
    resolution: Optional[str] = None
    aspect_ratio: Optional[float] = None
    format: Optional[str] = None
    file_size_bytes: int

class OcrResponse(BaseModel):
    status: str
    document_type: str
    extracted_text: str
    extracted_fields: ExtractedFields
    confidence: float
    word_count: int
    engine: str
    is_valid_document: bool
    quality_metrics: QualityMetrics
    error: Optional[str] = None

class FaceVerificationRequest(BaseModel):
    student_id: str
    image_base64: str
    capture_mode: str = "auto" # "auto" | "manual"
    face_detected_client: bool = True

class FaceVerificationResponse(BaseModel):
    status: str
    student_id: str
    face_detected: bool
    quality_passed: bool
    confidence: float
    capture_mode: str
    checks: Dict[str, bool]
    message: str

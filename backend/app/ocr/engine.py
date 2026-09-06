import io
import re
import time
import subprocess
import tempfile
import os
from typing import Tuple, Dict, Any, Optional
from PIL import Image
from pypdf import PdfReader
from app.ocr.models import OcrResponse, ExtractedFields, QualityMetrics

class OcrEngine:
    """
    Modular Python OCR Service for Skill Bridge.
    Supports digital PDF text extraction, Image OCR via system OCR / Tesseract,
    and structured academic/identity field extraction.
    """

    @classmethod
    def process_document(
        cls,
        file_bytes: bytes,
        filename: str,
        content_type: str,
        document_type: str
    ) -> OcrResponse:
        start_time = time.time()
        file_size = len(file_bytes)

        if not file_bytes:
            return OcrResponse(
                status="failed",
                document_type=document_type,
                extracted_text="",
                extracted_fields=ExtractedFields(),
                confidence=0.0,
                word_count=0,
                engine="none",
                is_valid_document=False,
                quality_metrics=QualityMetrics(file_size_bytes=0),
                error="Uploaded file is empty."
            )

        # 1. Handle PDF Documents
        if content_type == "application/pdf" or filename.lower().endswith(".pdf"):
            return cls._process_pdf(file_bytes, filename, document_type, start_time)

        # 2. Handle Image Documents (PNG, JPG, JPEG)
        return cls._process_image(file_bytes, filename, content_type, document_type, start_time)

    @classmethod
    def _process_pdf(
        cls,
        file_bytes: bytes,
        filename: str,
        document_type: str,
        start_time: float
    ) -> OcrResponse:
        try:
            reader = PdfReader(io.BytesIO(file_bytes))
            num_pages = len(reader.pages)
            if num_pages == 0:
                raise ValueError("PDF has 0 pages.")

            extracted_pages_text = []
            for page_idx, page in enumerate(reader.pages):
                text = page.extract_text() or ""
                if text.strip():
                    extracted_pages_text.append(text.strip())

            full_text = "\n\n".join(extracted_pages_text)

            # If digital text extraction is empty, attempt image OCR on embedded pages/images
            if not full_text.strip():
                extracted_images_text = []
                try:
                    for page in reader.pages:
                        for img_file in page.images:
                            img_text, _ = cls._ocr_image(Image.open(io.BytesIO(img_file.data)), img_file.data)
                            if img_text.strip():
                                extracted_images_text.append(img_text.strip())
                except Exception:
                    pass
                full_text = "\n\n".join(extracted_images_text)

            if not full_text.strip():
                return OcrResponse(
                    status="failed",
                    document_type=document_type,
                    extracted_text="",
                    extracted_fields=ExtractedFields(),
                    confidence=0.0,
                    word_count=0,
                    engine="pypdf_digital_extractor",
                    is_valid_document=False,
                    quality_metrics=QualityMetrics(
                        resolution=f"{num_pages} pages",
                        aspect_ratio=None,
                        format="PDF",
                        file_size_bytes=len(file_bytes)
                    ),
                    error="No readable text found in PDF. Please upload a clear document."
                )

            words = full_text.split()
            word_count = len(words)

            fields = cls._extract_structured_fields(full_text, document_type)
            confidence = 0.95 if word_count > 20 else (0.75 if word_count > 5 else 0.40)
            is_valid = word_count >= 5 or fields.id_number is not None

            elapsed_ms = (time.time() - start_time) * 1000

            return OcrResponse(
                status="success",
                document_type=document_type,
                extracted_text=full_text,
                extracted_fields=fields,
                confidence=round(confidence, 2),
                word_count=word_count,
                engine="pypdf_digital_extractor",
                is_valid_document=is_valid,
                quality_metrics=QualityMetrics(
                    resolution=f"{num_pages} pages",
                    aspect_ratio=None,
                    format="PDF",
                    file_size_bytes=len(file_bytes)
                )
            )
        except Exception as e:
            return OcrResponse(
                status="failed",
                document_type=document_type,
                extracted_text="",
                extracted_fields=ExtractedFields(),
                confidence=0.0,
                word_count=0,
                engine="pypdf_digital_extractor",
                is_valid_document=False,
                quality_metrics=QualityMetrics(
                    format="PDF",
                    file_size_bytes=len(file_bytes)
                ),
                error=f"PDF parsing error: {str(e)}"
            )

    @classmethod
    def _process_image(
        cls,
        file_bytes: bytes,
        filename: str,
        content_type: str,
        document_type: str,
        start_time: float
    ) -> OcrResponse:
        try:
            image = Image.open(io.BytesIO(file_bytes))
            width, height = image.size
            img_format = image.format or "IMAGE"
            aspect_ratio = round(width / max(height, 1), 2)

            # Minimum acceptable resolution check for identity/document
            if width < 150 or height < 150:
                return OcrResponse(
                    status="failed",
                    document_type=document_type,
                    extracted_text="",
                    extracted_fields=ExtractedFields(),
                    confidence=0.0,
                    word_count=0,
                    engine="image_validator",
                    is_valid_document=False,
                    quality_metrics=QualityMetrics(
                        resolution=f"{width}x{height}",
                        aspect_ratio=aspect_ratio,
                        format=img_format,
                        file_size_bytes=len(file_bytes)
                    ),
                    error="Image resolution is too low for document verification (minimum 150x150 required)."
                )

            # Attempt extraction via Windows OCR / Tesseract
            extracted_text, engine_used = cls._ocr_image(image, file_bytes)
            
            if not extracted_text.strip():
                return OcrResponse(
                    status="failed",
                    document_type=document_type,
                    extracted_text="",
                    extracted_fields=ExtractedFields(),
                    confidence=0.0,
                    word_count=0,
                    engine=engine_used,
                    is_valid_document=False,
                    quality_metrics=QualityMetrics(
                        resolution=f"{width}x{height}",
                        aspect_ratio=aspect_ratio,
                        format=img_format,
                        file_size_bytes=len(file_bytes)
                    ),
                    error="No recognizable text found in document image. Please upload a clearer document."
                )

            words = extracted_text.split()
            word_count = len(words)

            fields = cls._extract_structured_fields(extracted_text, document_type)
            confidence = 0.90 if word_count > 10 else (0.70 if word_count > 2 else 0.50)
            is_valid = True

            return OcrResponse(
                status="success",
                document_type=document_type,
                extracted_text=extracted_text,
                extracted_fields=fields,
                confidence=round(confidence, 2),
                word_count=word_count,
                engine=engine_used,
                is_valid_document=is_valid,
                quality_metrics=QualityMetrics(
                    resolution=f"{width}x{height}",
                    aspect_ratio=aspect_ratio,
                    format=img_format,
                    file_size_bytes=len(file_bytes)
                )
            )
        except Exception as e:
            return OcrResponse(
                status="failed",
                document_type=document_type,
                extracted_text="",
                extracted_fields=ExtractedFields(),
                confidence=0.0,
                word_count=0,
                engine="image_analyzer",
                is_valid_document=False,
                quality_metrics=QualityMetrics(
                    format="IMAGE",
                    file_size_bytes=len(file_bytes)
                ),
                error=f"Image processing error: {str(e)}"
            )

    @classmethod
    def _ocr_image(cls, image: Image.Image, file_bytes: bytes) -> Tuple[str, str]:
        """
        Attempts Windows native OCR or Tesseract.
        Strictly returns genuine extracted text. Does NOT invent dummy text.
        """
        # 1. Try Windows Runtime OCR if on Windows
        try:
            if os.name == "nt":
                text = cls._run_windows_native_ocr(file_bytes)
                if text and len(text.strip()) > 0:
                    return text.strip(), "windows_native_ocr"
        except Exception:
            pass

        # 2. Try pytesseract if installed and tesseract in PATH
        try:
            import pytesseract
            text = pytesseract.image_to_string(image)
            if text and len(text.strip()) > 0:
                return text.strip(), "tesseract_ocr"
        except Exception:
            pass

        return "", "none"

    @classmethod
    def _run_windows_native_ocr(cls, file_bytes: bytes) -> Optional[str]:
        """
        Invokes Windows.Media.Ocr via PowerShell (native to Windows 10/11, zero extra install).
        Uses System.Runtime.WindowsRuntime AsTask generic helper for robust async completion.
        """
        with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as img_tmp:
            img_tmp.write(file_bytes)
            img_path = os.path.abspath(img_tmp.name)

        ps_script = """
param([string]$ImagePath)
Add-Type -AssemblyName System.Runtime.WindowsRuntime
[Windows.Media.Ocr.OcrEngine, Windows.Foundation.UniversalApiContract, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation.UniversalApiContract, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null

$asTaskGeneric = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' } | Select-Object -First 1

function Await-Op($op, $type) {
    $m = $asTaskGeneric.MakeGenericMethod($type)
    $task = $m.Invoke($null, @($op))
    $task.Wait()
    return $task.Result
}

$fileOp = [Windows.Storage.StorageFile]::GetFileFromPathAsync($ImagePath)
$file = Await-Op $fileOp ([Windows.Storage.StorageFile])

$streamOp = $file.OpenAsync([Windows.Storage.FileAccessMode]::Read)
$stream = Await-Op $streamOp ([Windows.Storage.Streams.IRandomAccessStream])

$decoderOp = [Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)
$decoder = Await-Op $decoderOp ([Windows.Graphics.Imaging.BitmapDecoder])

$bitmapOp = $decoder.GetSoftwareBitmapAsync()
$bitmap = Await-Op $bitmapOp ([Windows.Graphics.Imaging.SoftwareBitmap])

$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
if ($null -eq $engine) {
    $engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage([Windows.Globalization.Language]::new("en-US"))
}

if ($null -ne $engine) {
    $recOp = $engine.RecognizeAsync($bitmap)
    $ocrResult = Await-Op $recOp ([Windows.Media.Ocr.OcrResult])
    Write-Output $ocrResult.Text
}
try { $stream.Dispose() } catch {}
"""

        with tempfile.NamedTemporaryFile(suffix=".ps1", mode="w", encoding="utf-8", delete=False) as ps_tmp:
            ps_tmp.write(ps_script)
            ps_path = ps_tmp.name

        try:
            proc = subprocess.run(
                ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", ps_path, "-ImagePath", img_path],
                capture_output=True,
                text=True,
                timeout=12
            )
            if proc.returncode == 0 and proc.stdout.strip():
                return proc.stdout.strip()
            return None
        except Exception:
            return None
        finally:
            for p in (img_path, ps_path):
                try:
                    os.remove(p)
                except Exception:
                    pass

    @classmethod
    def _extract_structured_fields(cls, text: str, document_type: str) -> ExtractedFields:
        """
        Extracts student name, ID number, institution, and validity dates from raw text using regex patterns.
        """
        fields = ExtractedFields()

        # ID / Roll number regex patterns (e.g. 2024-CS-042, STU12345, ROLL: 202401)
        id_match = re.search(r'(?:roll|reg(?:istration)?|id|student\s*id|roll\s*no\.?)\s*[:#-]?\s*([A-Za-z0-9\-_/]{4,20})', text, re.IGNORECASE)
        if id_match:
            fields.id_number = id_match.group(1).strip()
        else:
            # Look for general alphanumeric patterns like 2024-CS-042 or 24BCS042
            fallback_id = re.search(r'\b(?:20\d{2}[A-Z]{2,4}\d{2,6}|[A-Z]{2,4}\d{4,8})\b', text)
            if fallback_id:
                fields.id_number = fallback_id.group(0)

        # Name patterns
        name_match = re.search(r'(?:name|student\s*name)\s*[:#-]?\s*([A-Za-z\s.]{3,35})(?:\r|\n|$)', text, re.IGNORECASE)
        if name_match:
            fields.name = name_match.group(1).strip()

        # Institution patterns
        inst_match = re.search(r'(?:university|institute|college|school|board\s*of)\s*[A-Za-z\s,\-&.]{3,50}', text, re.IGNORECASE)
        if inst_match:
            fields.institution = inst_match.group(0).strip()

        # Course / Degree patterns
        course_match = re.search(r'\b(b\.?tech|b\.?e\.?|b\.?sc|b\.?ca|m\.?tech|m\.?sc|m\.?ca|computer\s*science|information\s*technology|engineering)\b', text, re.IGNORECASE)
        if course_match:
            fields.course = course_match.group(0).upper()

        # Validity date
        date_match = re.search(r'(?:valid\s*(?:thru|through|until)?|expiry|issue\s*date)\s*[:#-]?\s*(\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|20\d{2})', text, re.IGNORECASE)
        if date_match:
            fields.valid_until = date_match.group(1).strip()

        # Detected type
        if "marksheet" in text.lower() or "transcript" in text.lower() or "grade" in text.lower():
            fields.detected_type = "Academic Marksheet / Transcript"
        elif "identity" in text.lower() or "student id" in text.lower() or "identity card" in text.lower():
            fields.detected_type = "Student Identity Card"
        elif "certificate" in text.lower() or "certify" in text.lower():
            fields.detected_type = "Enrollment Certificate"
        else:
            fields.detected_type = document_type.replace("_", " ").title()

        return fields

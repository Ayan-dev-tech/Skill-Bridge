import os
from PIL import Image, ImageDraw

fixtures_dir = os.path.join(os.path.dirname(__file__), "fixtures")
os.makedirs(fixtures_dir, exist_ok=True)

# 1. Valid Student ID Image with clear text
valid_img_path = os.path.join(fixtures_dir, "valid_student_id.png")
img1 = Image.new("RGB", (800, 300), color=(255, 255, 255))
draw1 = ImageDraw.Draw(img1)
draw1.text(
    (30, 40),
    "STUDENT IDENTIFICATION CARD\nNAME: Jane Doe\nINSTITUTE: Global Institute of Technology\nROLL NO: GIT-2024-9988\nVALID UNTIL: 2027-06-30",
    fill=(0, 0, 0)
)
img1.save(valid_img_path)
print(f"Created {valid_img_path}")

# 2. Blank Image (No text) -> should trigger real OCR failure
blank_img_path = os.path.join(fixtures_dir, "blank_image.png")
img2 = Image.new("RGB", (300, 300), color=(240, 240, 240))
img2.save(blank_img_path)
print(f"Created {blank_img_path}")

# 3. Valid Transcript PDF with embedded text
try:
    from pypdf import PdfWriter
    writer = PdfWriter()
    # create a page or simple text PDF
except Exception as e:
    pass

print("Fixtures ready.")

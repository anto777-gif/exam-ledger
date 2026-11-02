import os
import io
import re
from pypdf import PdfReader
from docx import Document

def clean_document_text(raw: str) -> str:
    if not raw:
        return ""
    
    cleaned_lines = []
    for line in raw.splitlines():
        trimmed = line.strip()
        # Drop PDF header and internal metadata markers
        if re.match(r"^%PDF-\d", trimmed, re.I):
            continue
        if re.match(r"^/?(Type|Pages|Catalog|ViewerPreferences|Font|MediaBox|Contents|StructParents|Filter|FlateDecode)", trimmed, re.I):
            continue
        if re.search(r"\b\d+\s+\d+\s+R\b", trimmed):
            continue
        if re.search(r"\b(endobj|endstream|xref|trailer|startxref)\b", trimmed, re.I):
            continue
        if re.match(r"^/?(ProcSet|ExtGState|Encoding|BaseFont|Subtype)\b", trimmed, re.I):
            continue
        if trimmed.startswith("<<") or trimmed.endswith(">>"):
            continue
        cleaned_lines.append(trimmed)

    return "\n".join(cleaned_lines).strip()

def extract_text_from_file(file_bytes: bytes, filename: str) -> str:
    ext = os.path.splitext(filename)[1].lower()

    if ext in [".txt", ".text"]:
        try:
            return clean_document_text(file_bytes.decode("utf-8"))
        except UnicodeDecodeError:
            return clean_document_text(file_bytes.decode("latin-1", errors="ignore"))

    elif ext == ".docx":
        try:
            doc = Document(io.BytesIO(file_bytes))
            full_text = [para.text for para in doc.paragraphs if para.text.strip()]
            for table in doc.tables:
                for row in table.rows:
                    full_text.append(" | ".join(cell.text.strip() for cell in row.cells if cell.text.strip()))
            return clean_document_text("\n".join(full_text))
        except Exception as e:
            raise ValueError(f"Failed to extract text from DOCX document: {str(e)}")

    elif ext == ".pdf":
        try:
            reader = PdfReader(io.BytesIO(file_bytes))
            extracted_pages = []
            for page in reader.pages:
                text = page.extract_text()
                if text:
                    extracted_pages.append(text)
            
            extracted = clean_document_text("\n".join(extracted_pages))
            if len(extracted) > 20:
                return extracted
        except Exception as e:
            pass

        # Fallback for plain stream tokens
        try:
            latin_str = file_bytes.decode("latin-1", errors="ignore")
            token_matches = re.findall(r"\(([^)]+)\)\s*(?:Tj|'|\")", latin_str)
            if token_matches:
                fallback_text = clean_document_text(" ".join(token_matches))
                if len(fallback_text) > 20:
                    return fallback_text
        except Exception:
            pass

        raise ValueError("Unable to extract text from this PDF document. Please ensure it is a text-based document or paste the text directly.")

    else:
        raise ValueError(f"Unsupported file format: {ext}. Please provide PDF, DOCX, or TXT file.")

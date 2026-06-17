from pypdf import PdfReader


def extract_text_from_pdf(file) -> str:
    """
    Reads an uploaded PDF file object and returns all its text as one string.
    """
    reader = PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text
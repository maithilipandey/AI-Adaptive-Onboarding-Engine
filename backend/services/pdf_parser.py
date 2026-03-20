import pdfplumber
from io import BytesIO

def extract_text_from_pdf(pdf_file):
    """
    Extract text from a PDF file.
    
    Args:
        pdf_file: File object from Flask request
        
    Returns:
        str: Extracted text from PDF
    """
    try:
        # Read the file into bytes
        file_bytes = pdf_file.read()
        pdf_file.seek(0)  # Reset file pointer
        
        # Open PDF from bytes
        with pdfplumber.open(BytesIO(file_bytes)) as pdf:
            text = ""
            for page in pdf.pages:
                text += page.extract_text() + "\n"
        
        return text.strip()
    
    except Exception as e:
        raise Exception(f"Error parsing PDF: {str(e)}")

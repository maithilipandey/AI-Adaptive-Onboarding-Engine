# Career Development Analysis Tool - Setup Guide

This project consists of a Next.js frontend and a Python Flask backend. Follow these steps to get started.

## Prerequisites

- Node.js 18+ and pnpm
- Python 3.8+ with pip or uv

## Frontend Setup

### 1. Install Frontend Dependencies

```bash
pnpm install
```

### 2. Start Frontend Development Server

```bash
pnpm dev
```

The frontend will be available at `http://localhost:3000`

## Backend Setup

### 1. Install Backend Dependencies

Navigate to the backend directory and install Python dependencies:

```bash
cd backend
pip install -r requirements.txt
# OR using uv:
uv pip install -r requirements.txt
```

### 2. Start Backend Server

```bash
python run.py
# OR using uv:
uv run run.py
```

The backend will be available at `http://localhost:5000`

## How to Use

1. Open `http://localhost:3000` in your browser
2. Upload your resume (PDF file)
3. Provide the job description either by:
   - Pasting text directly in the form
   - Uploading a PDF file
4. Click "Analyze Resume & Job Description"
5. View your skill gaps and personalized learning paths

## Architecture

### Frontend
- **Framework**: Next.js 16 with React
- **Styling**: Tailwind CSS with shadcn/ui components
- **API Communication**: Fetch API with error handling

### Backend
- **Framework**: Flask with CORS support
- **Services**:
  - `pdf_parser.py`: Extract text from PDF files using pdfplumber
  - `skill_extractor.py`: Match skills using keyword patterns
  - `skill_gap_analyzer.py`: Calculate missing skills (JD - Resume)
  - `learning_path_generator.py`: Provide learning steps for each gap
  - `reasoning_engine.py`: Generate explanations for why skills matter

### Data Files
- `data/skills.json`: Database of 20+ technical skills with keywords and metadata
- `data/learning_paths.json`: Predefined learning steps for each skill

## API Endpoint

### POST /api/analyze

Analyze resume and job description to identify skill gaps.

**Request:**
- Form data with:
  - `resume` (required): PDF file of resume
  - `jd` (optional): PDF file of job description
  - `jd_text` (optional): Job description as plain text

**Response:**
```json
{
  "resume_skills": ["Python", "JavaScript", ...],
  "jd_skills": ["React", "TypeScript", ...],
  "skill_gaps": ["React", "TypeScript", ...],
  "learning_paths": {
    "React": ["Learn React basics...", "Master hooks...", ...],
    ...
  },
  "reasoning": {
    "React": {
      "skill": "React",
      "category": "Frontend Framework",
      "description": "JavaScript library for building UIs",
      "level": "intermediate",
      "importance": "React is required for this role..."
    },
    ...
  }
}
```

## Future Enhancements

- Integration with AI models for intelligent skill recommendations
- User accounts and progress tracking
- Additional skill datasets
- Assessment tools to validate learning
- Integration with job board APIs
- Competitive salary analysis based on skills

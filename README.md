# Career Development Analysis Tool 

A modern web application that analyzes your resume against job descriptions to identify skill gaps and provide personalized learning paths for career advancement.

## Features

- **Resume Analysis**: Upload your resume (PDF) for automated skill extraction
- **Job Description Analysis**: Input job descriptions as text or PDF files
- **Skill Gap Identification**: Automatically identifies missing skills between your profile and target roles
- **Personalized Learning Paths**: Generates step-by-step learning recommendations for each skill gap
- **Detailed Reasoning**: Explains why each skill is important for the target role
- **Clean, Modern UI**: Professional interface built with Next.js and shadcn/ui
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

### Frontend
- **Next.js 16**: Modern React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: High-quality component library
- **React Hooks**: State management

### Backend
- **Flask**: Lightweight Python web framework
- **pdfplumber**: PDF text extraction
- **CORS**: Cross-Origin Resource Sharing support
- **JSON**: Data persistence for skills and learning paths

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.8+
- pnpm or npm

### Installation

 **Install frontend dependencies**
```bash
pnpm install
```
**Install backend dependencies**
```bash
cd backend
pip install -r requirements.txt
cd ..
```

### Running the Application

**Terminal 1 - Start Frontend:**
```bash
pnpm dev
```
Access at: `http://localhost:3000`

**Terminal 2 - Start Backend:**
```bash
cd backend
python run.py
```
Access at: `http://localhost:5000`

## How It Works

1. **User uploads resume** (PDF) and provides job description (text or PDF)
2. **PDF Parser** extracts text content from uploaded files
3. **Skill Extractor** matches text against predefined skill database using keyword patterns
4. **Skill Gap Analyzer** compares resume skills with job requirements
5. **Learning Path Generator** looks up recommended learning steps for each gap
6. **Reasoning Engine** generates explanations for skill importance
7. **Results displayed** in organized sections with actionable insights

## Project Structure

```
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Main page component
│   └── globals.css          # Global styles and design tokens
├── components/
│   ├── upload-form.tsx      # Resume/JD upload form
│   ├── results-display.tsx  # Results visualization
│   └── ui/                  # shadcn/ui components
├── backend/
│   ├── app.py               # Flask application
│   ├── run.py               # Startup script
│   ├── requirements.txt      # Python dependencies
│   ├── services/
│   │   ├── pdf_parser.py
│   │   ├── skill_extractor.py
│   │   ├── skill_gap_analyzer.py
│   │   ├── learning_path_generator.py
│   │   └── reasoning_engine.py
│   └── data/
│       ├── skills.json      # Technical skills database
│       └── learning_paths.json # Learning recommendations
├── public/                  # Static assets
├── SETUP.md                 # Detailed setup guide
└── README.md                # This file
```

## Skills Database

The application includes a curated database of 20+ technical skills:

**Programming Languages**: Python, JavaScript, TypeScript
**Frontend**: React, Vue.js, Angular, Next.js, Tailwind CSS
**Backend**: Node.js, REST API, GraphQL
**DevOps**: Docker, Kubernetes, CI/CD
**Database**: SQL
**Cloud**: AWS
**Testing**: Jest
**Version Control**: Git
**Methodology**: Agile
**AI/ML**: Machine Learning

Each skill includes:
- Category classification
- Keyword patterns for detection
- Proficiency level
- Description
- Personalized learning path

## API Reference

### POST /api/analyze

Analyzes resume and job description to identify skill gaps.

**Request:**
```bash
curl -X POST http://localhost:5000/api/analyze \
  -F "resume=@resume.pdf" \
  -F "jd_text=Python, React, AWS..."
```

**Response:**
```json
{
  "resume_skills": ["Python", "JavaScript", "React"],
  "jd_skills": ["React", "TypeScript", "AWS", "Docker"],
  "skill_gaps": ["TypeScript", "AWS", "Docker"],
  "learning_paths": {
    "TypeScript": ["Learn TypeScript basics...", "..."],
    "AWS": ["Learn AWS services...", "..."],
    "Docker": ["Learn Docker fundamentals...", "..."]
  },
  "reasoning": {
    "TypeScript": {
      "skill": "TypeScript",
      "category": "Programming Language",
      "description": "Typed superset of JavaScript",
      "level": "intermediate",
      "importance": "TypeScript is required for this role..."
    }
  }
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{ "status": "ok" }
```

## Design Highlights

- **Clean Typography**: Professional font hierarchy with excellent readability
- **Thoughtful Colors**: Blue-based accent colors with neutral backgrounds
- **Organized Results**: Five-section layout for clear information architecture
- **Interactive Elements**: Smooth transitions and responsive feedback
- **Accessibility**: Semantic HTML, proper contrast ratios, ARIA attributes
- **Mobile Responsive**: Optimized for all screen sizes

## Customization

### Add More Skills

Edit `backend/data/skills.json` to add new technical skills:
```json
{
  "NewSkill": {
    "category": "Category Name",
    "keywords": ["keyword1", "keyword2"],
    "level": "beginner|intermediate|advanced",
    "description": "Skill description"
  }
}
```

Add learning path in `backend/data/learning_paths.json`:
```json
{
  "NewSkill": [
    "Learning step 1",
    "Learning step 2",
    "Learning step 3"
  ]
}
```

### Modify UI Theme

Edit `app/globals.css` to change design tokens:
- Color scheme
- Border radius
- Spacing
- Typography

## Limitations & Future Enhancements

### Current Limitations
- Keyword-based skill matching (no AI/NLP)
- Static skill database
- No user authentication
- No progress tracking
- No data persistence

### Planned Features
- Integration with OpenAI/Claude for intelligent recommendations
- User accounts with progress tracking
- Skill difficulty assessments
- Interactive learning modules
- Job market data integration
- Salary insights based on skills
- Resume quality feedback
- Portfolio recommendations

## Performance Considerations

- PDF parsing is performed server-side for security
- Large PDFs may take a few seconds to process
- Frontend uses optimized components from shadcn/ui
- CSS is minified and tree-shaken by Tailwind
- API requests include proper error handling

## Troubleshooting

### Backend connection error
- Ensure backend is running on port 5000
- Check CORS is enabled in Flask
- Verify network connectivity

### PDF parsing fails
- Ensure PDF is valid and not corrupted
- Check file size (very large PDFs may timeout)
- Try converting PDF to text first

### Skills not detected
- Ensure skill keywords match text in document
- Check skill database has been loaded
- Verify PDF text extraction worked properly

## Contributing

This is a demonstration project. To contribute:
1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT License - feel free to use this for personal or commercial projects.

## Support

For issues or questions:
- Check SETUP.md for detailed setup instructions
- Review the API reference above
- Check browser console for error messages
- Verify backend is running with `curl http://localhost:5000/health`
---
Built with Next.js, Flask, and modern web technologies for career development.

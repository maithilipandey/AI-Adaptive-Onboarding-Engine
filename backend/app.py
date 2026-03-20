from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(__file__))

from services.pdf_parser import extract_text_from_pdf
from services.skill_extractor import extract_skills
from services.skill_gap_analyzer import analyze_skill_gaps
from services.learning_path_generator import generate_learning_paths
from services.reasoning_engine import generate_reasoning

app = Flask(__name__)
CORS(app)

@app.route('/api/analyze', methods=['POST'])
def analyze():
    """
    Main endpoint for analyzing resume and job description.
    Expects: resume_file (PDF), jd_file (PDF or text)
    """
    try:
        # Get uploaded files
        resume_file = request.files.get('resume')
        jd_file = request.files.get('jd')
        jd_text = request.form.get('jd_text', '')

        if not resume_file:
            return jsonify({'error': 'Resume file is required'}), 400

        # Extract text from resume
        resume_text = extract_text_from_pdf(resume_file)

        # Extract text from JD (file or direct text)
        if jd_file:
            jd_content = extract_text_from_pdf(jd_file)
        elif jd_text:
            jd_content = jd_text
        else:
            return jsonify({'error': 'Job description is required (file or text)'}), 400

        # Extract skills from resume and JD
        resume_skills = extract_skills(resume_text)
        jd_skills = extract_skills(jd_content)

        # Analyze skill gaps
        skill_gaps = analyze_skill_gaps(jd_skills, resume_skills)

        # Generate learning paths for gaps
        learning_paths = generate_learning_paths(skill_gaps)

        # Generate reasoning for each gap
        reasoning = generate_reasoning(skill_gaps)

        return jsonify({
            'resume_skills': sorted(list(resume_skills)),
            'jd_skills': sorted(list(jd_skills)),
            'skill_gaps': sorted(list(skill_gaps)),
            'learning_paths': learning_paths,
            'reasoning': reasoning
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)

import json
import os
import re

def load_skills_database():
    """Load the skills database from JSON file."""
    script_dir = os.path.dirname(__file__)
    skills_file = os.path.join(script_dir, '../data/skills.json')
    
    with open(skills_file, 'r') as f:
        data = json.load(f)
    
    return data['technical_skills']

def extract_skills(text):
    """
    Extract skills from text using keyword matching against the skills database.
    
    Args:
        text: str, text to extract skills from
        
    Returns:
        set: Set of detected skills
    """
    skills_db = load_skills_database()
    detected_skills = set()
    
    # Convert text to lowercase for matching
    text_lower = text.lower()
    
    # Iterate through skills database and check for keyword matches
    for skill_name, skill_info in skills_db.items():
        keywords = skill_info.get('keywords', [])
        
        for keyword in keywords:
            # Use word boundaries to avoid partial matches
            pattern = r'\b' + re.escape(keyword) + r'\b'
            if re.search(pattern, text_lower):
                detected_skills.add(skill_name)
                break  # Found this skill, move to next skill
    
    return detected_skills

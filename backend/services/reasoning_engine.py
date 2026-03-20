import json
import os

def load_skills_database():
    """Load the skills database from JSON file."""
    script_dir = os.path.dirname(__file__)
    skills_file = os.path.join(script_dir, '../data/skills.json')
    
    with open(skills_file, 'r') as f:
        data = json.load(f)
    
    return data['technical_skills']

def generate_reasoning(skill_gaps):
    """
    Generate reasoning traces for why each skill gap is important.
    
    Args:
        skill_gaps: set, skills that need to be learned
        
    Returns:
        dict: Dictionary mapping skill to reasoning explanation
    """
    skills_db = load_skills_database()
    result = {}
    
    for skill in skill_gaps:
        if skill in skills_db:
            skill_info = skills_db[skill]
            category = skill_info.get('category', 'Technical')
            description = skill_info.get('description', 'Important skill')
            level = skill_info.get('level', 'intermediate')
            
            reasoning = {
                "skill": skill,
                "category": category,
                "description": description,
                "level": level,
                "importance": f"{skill} is required for this role. {description} at a {level} level is essential to meet the job requirements."
            }
            result[skill] = reasoning
        else:
            # Provide generic reasoning for unknown skills
            result[skill] = {
                "skill": skill,
                "category": "Unknown",
                "description": "This skill was found in the job description",
                "level": "unspecified",
                "importance": f"{skill} is listed as a required skill for this position and should be developed."
            }
    
    return result

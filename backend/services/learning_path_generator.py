import json
import os

def load_learning_paths_database():
    """Load the learning paths database from JSON file."""
    script_dir = os.path.dirname(__file__)
    paths_file = os.path.join(script_dir, '../data/learning_paths.json')
    
    with open(paths_file, 'r') as f:
        data = json.load(f)
    
    return data['learning_paths']

def generate_learning_paths(skill_gaps):
    """
    Generate learning paths for each skill gap.
    
    Args:
        skill_gaps: set, skills that need to be learned
        
    Returns:
        dict: Dictionary mapping skill to learning steps
    """
    learning_paths_db = load_learning_paths_database()
    result = {}
    
    for skill in skill_gaps:
        if skill in learning_paths_db:
            result[skill] = learning_paths_db[skill]
        else:
            # Provide generic learning path for unknown skills
            result[skill] = [
                f"Learn {skill} fundamentals",
                f"Study {skill} core concepts",
                f"Practice {skill} through projects",
                f"Master advanced {skill} topics",
                f"Apply {skill} in real-world scenarios"
            ]
    
    return result

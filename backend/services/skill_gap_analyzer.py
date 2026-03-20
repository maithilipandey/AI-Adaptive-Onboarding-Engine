def analyze_skill_gaps(jd_skills, resume_skills):
    """
    Analyze the skill gaps between job description and resume.
    Gaps are skills required in JD but not present in resume.
    
    Args:
        jd_skills: set, skills found in job description
        resume_skills: set, skills found in resume
        
    Returns:
        set: Set of skill gaps (JD skills - Resume skills)
    """
    skill_gaps = jd_skills - resume_skills
    return skill_gaps

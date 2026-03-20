#!/usr/bin/env python3
"""
Backend startup script for the AI-Adaptive Onboarding Engine.
Run this script to start the Flask API server on localhost:5000
"""

import sys
import os

# Add the backend directory to the Python path
sys.path.insert(0, os.path.dirname(__file__))

from app import app

if __name__ == '__main__':
    print("Starting AI-Adaptive Onboarding Engine Backend...")
    print("Server running at http://localhost:5000")
    print("Available endpoints:")
    print("  POST /api/analyze - Analyze resume and job description")
    print("  GET /health - Health check")
    app.run(debug=True, port=5000, host='0.0.0.0')

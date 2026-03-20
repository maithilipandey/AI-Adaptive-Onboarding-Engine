'use client';

import { useState } from 'react';
import { UploadForm } from '@/components/upload-form';
import { ResultsDisplay } from '@/components/results-display';

interface AnalysisResult {
  resume_skills: string[];
  jd_skills: string[];
  skill_gaps: string[];
  learning_paths: { [key: string]: string[] };
  reasoning: {
    [key: string]: {
      skill: string;
      category: string;
      description: string;
      level: string;
      importance: string;
    };
  };
}

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysisSuccess = (data: AnalysisResult) => {
    setResult(data);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setResult(null);
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Career Development Analysis
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover skill gaps and get personalized learning paths to advance your career
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 border border-red-300 dark:border-red-700 rounded-lg">
            <p className="font-medium">Error:</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Main Content */}
        {!result ? (
          <div className="flex justify-center">
            <UploadForm
              onSuccess={handleAnalysisSuccess}
              onError={handleError}
            />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <ResultsDisplay result={result} onReset={handleReset} />
          </div>
        )}

        {/* Footer */}
        <div className="mt-20 text-center text-muted-foreground text-sm border-t border-border pt-8">
          <p>
            This tool uses keyword-based skill matching to identify gaps and provide learning recommendations.
          </p>
          <p className="mt-2">
            Start your career development journey today.
          </p>
        </div>
      </div>
    </main>
  );
}

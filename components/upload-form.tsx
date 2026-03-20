'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

interface UploadFormProps {
  onSuccess: (data: any) => void;
  onError: (error: string) => void;
}

export function UploadForm({ onSuccess, onError }: UploadFormProps) {
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [jdText, setJdText] = useState('');
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const jdInputRef = useRef<HTMLInputElement>(null);

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    } else {
      onError('Resume must be a PDF file');
    }
  };

  const handleJdFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setJdFile(file);
      setJdText(''); // Clear text if file is selected
    } else {
      onError('Job description file must be a PDF');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleResumeDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    } else {
      onError('Resume must be a PDF file');
    }
  };

  const handleJdDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'application/pdf') {
      setJdFile(file);
      setJdText('');
    } else {
      onError('Job description file must be a PDF');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resumeFile) {
      onError('Please upload a resume');
      return;
    }

    if (!jdFile && !jdText.trim()) {
      onError('Please provide a job description (file or text)');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);

      if (jdFile) {
        formData.append('jd', jdFile);
      } else if (jdText) {
        formData.append('jd_text', jdText);
      }

      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const result = await response.json();
      onSuccess(result);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-8 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Career Development Analysis
          </h2>
          <p className="text-muted-foreground">
            Upload your resume and job description to identify skill gaps and get personalized learning paths.
          </p>
        </div>

        {/* Resume Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-foreground">
            Resume (PDF)
          </label>
          <div
            className="border-2 border-dashed border-border rounded-lg p-8 cursor-pointer hover:border-primary transition-colors text-center"
            onClick={() => resumeInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleResumeDrop}
          >
            <input
              ref={resumeInputRef}
              type="file"
              accept=".pdf"
              onChange={handleResumeChange}
              className="hidden"
            />
            {resumeFile ? (
              <div className="space-y-2">
                <div className="text-sm font-medium text-primary">
                  ✓ {resumeFile.name}
                </div>
                <p className="text-xs text-muted-foreground">
                  Click to change
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF files only
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Job Description */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-foreground">
            Job Description
          </label>
          <div className="space-y-3">
            {/* Tab switching */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setJdFile(null);
                }}
                className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                  !jdFile
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-border'
                }`}
              >
                Paste Text
              </button>
              <button
                type="button"
                onClick={() => {
                  setJdText('');
                }}
                className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                  jdFile
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-border'
                }`}
              >
                Upload PDF
              </button>
            </div>

            {/* Text Input */}
            {!jdFile && (
              <textarea
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full h-40 p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder-muted-foreground"
              />
            )}

            {/* File Upload */}
            {jdFile && (
              <div
                className="border-2 border-dashed border-border rounded-lg p-8 cursor-pointer hover:border-primary transition-colors text-center"
                onClick={() => jdInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleJdDrop}
              >
                <input
                  ref={jdInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleJdFileChange}
                  className="hidden"
                />
                <div className="space-y-2">
                  <div className="text-sm font-medium text-primary">
                    ✓ {jdFile.name}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Click to change
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading || !resumeFile || (!jdFile && !jdText.trim())}
          className="w-full py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Spinner className="w-4 h-4" />
              Analyzing...
            </>
          ) : (
            'Analyze Resume & Job Description'
          )}
        </Button>
      </form>
    </Card>
  );
}

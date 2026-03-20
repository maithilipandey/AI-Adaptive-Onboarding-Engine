'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

interface ResultsDisplayProps {
  result: AnalysisResult;
  onReset: () => void;
}

export function ResultsDisplay({ result, onReset }: ResultsDisplayProps) {
  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            Analysis Results
          </h2>
          <p className="text-muted-foreground mt-2">
            Here's your personalized career development plan
          </p>
        </div>
        <Button
          onClick={onReset}
          variant="outline"
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          Analyze Another
        </Button>
      </div>

      {/* Section 1: Your Current Skills */}
      <Card className="p-6 shadow-md">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          Your Current Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {result.resume_skills.length > 0 ? (
            result.resume_skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/30"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-muted-foreground">No skills detected</p>
          )}
        </div>
      </Card>

      {/* Section 2: Required Skills */}
      <Card className="p-6 shadow-md">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          Required Skills for This Role
        </h3>
        <div className="flex flex-wrap gap-2">
          {result.jd_skills.length > 0 ? (
            result.jd_skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium border border-accent/30"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-muted-foreground">No skills found</p>
          )}
        </div>
      </Card>

      {/* Section 3: Skill Gaps */}
      <Card className="p-6 shadow-md border-l-4 border-l-primary">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          Skill Gaps to Address
        </h3>
        {result.skill_gaps.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {result.skill_gaps.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100 rounded-full text-sm font-medium border border-orange-300 dark:border-orange-700"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Great! You have all the required skills.
          </p>
        )}
      </Card>

      {/* Section 4: Learning Paths */}
      {result.skill_gaps.length > 0 && (
        <Card className="p-6 shadow-md">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            Your Personalized Learning Paths
          </h3>
          <div className="space-y-6">
            {result.skill_gaps.map((skill) => (
              <div key={skill} className="border-l-4 border-l-primary pl-4">
                <h4 className="text-lg font-semibold text-foreground mb-3">
                  {skill}
                </h4>
                <ol className="space-y-2">
                  {result.learning_paths[skill]?.map((step, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-sm text-foreground"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Section 5: Detailed Reasoning */}
      {result.skill_gaps.length > 0 && (
        <Card className="p-6 shadow-md">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            Why These Skills Matter
          </h3>
          <div className="space-y-4">
            {result.skill_gaps.map((skill) => {
              const reason = result.reasoning[skill];
              return (
                <div
                  key={skill}
                  className="border border-border rounded-lg p-4 bg-muted/30"
                >
                  <div className="mb-2">
                    <h4 className="font-semibold text-foreground">{skill}</h4>
                    <p className="text-xs text-muted-foreground">
                      {reason.category} • {reason.level} level
                    </p>
                  </div>
                  <p className="text-sm text-foreground mb-2">
                    {reason.description}
                  </p>
                  <p className="text-sm text-accent font-medium">
                    {reason.importance}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}

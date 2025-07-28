import { useProblemLanguageStore } from '@/store/useProblemsStore';
import { Problem } from '@/types/Problem';
import React from 'react';

type ReferenceSolutions = {
  [key: string]: string;
};

interface SolutionsProps {
  problem: Problem & { referenceSolutions: ReferenceSolutions };
}

const Solutions: React.FC<SolutionsProps> = ({ problem }) => {
  const { lang } = useProblemLanguageStore() as { lang: string };

  const currentLang = lang.toUpperCase();
  const solution = problem.referenceSolutions?.[currentLang] || 'No solution available.';

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex justify-between items-center p-4 m-1">
        <p className="font-semibold mr-2">Solutions</p>
        <p>{currentLang}</p>
      </div>
      <div>
        <pre className="whitespace-pre-wrap break-words p-4 border bg-gray-800 m-2">
          {problem.referenceSolutions?.[currentLang] || 'No solution available.'}
        </pre>
      </div>
    </div>
  );
};

export default Solutions;
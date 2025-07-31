import { useProblemLanguageStore } from '@/store/useProblemsStore';
import { Problem } from '@/types/Problem';
import { Editor } from '@monaco-editor/react';
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
        <div className="">
          <Editor
          defaultValue={problem.referenceSolutions?.[currentLang]} 
          value={problem.referenceSolutions?.[currentLang]}
          language={currentLang}
          height={"60vh"}
          theme='vs-dark'
           options={{
              minimap: { enabled: false },
              fontSize: 13,
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              automaticLayout: true,
              mouseWheelScrollSensitivity: 1,
              wordWrap: "on",
              scrollbar: {
                alwaysConsumeMouseWheel: false,
                handleMouseWheel: true,
              },
            }}
          />
        
        </div>
      </div>
    </div>
  );
};

export default Solutions;
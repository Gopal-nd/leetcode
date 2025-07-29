export type Language = "PYTHON" | "JAVASCRIPT" | "JAVA";

export type CodeSnippets = Record<Language, string>;
export type ReferenceSolutions = Record<Language, string>;

export type Example = {
  input: string;
  output: string;
  explanation?: string;
};

export type Examples = Record<Language, Example>;

export type TestCase = {
  input: string;
  output: string;
  hidden?: boolean;
};

export type Submission = {
  userId: string;
  code: string;
  language: Language;
  status: "SUCCESS" | "FAILURE" | "PENDING";
  createdAt: string;
};

export type Problem = {
  id: string;
  title: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
  constraints: string;
  codeSnippets: CodeSnippets;
  referenceSolutions: ReferenceSolutions;
  examples: Examples;
  hints: string | null;
  editorial: string | null;
  problemSolved: any[]; // You can type this if needed
  problemsInPlaylist: any[]; // You can type this if needed
  testCases: TestCase[];
  submissions: Submission[];
  userId: string;
  createdAt: string;
  updatedAt: string;
};



export type SubmissionStatus =
  | "ACCEPTED"
  | "WRONG_ANSWER"
  | "TIME_LIMIT_EXCEEDED"
  | "COMPILE_ERROR"
  | "RUNTIME_ERROR"
  | "PENDING"
  | "FAILED";

export type SubmissionDetails = {
  id: string;
  userId: string;
  problemId: string;
  sourceCode: string;
  language: Language; // Expand this if more languages are supported
  stdout: string[]; // Output of each test case
  stderr: (string | null)[];
  stdin: string; // All test case inputs in one string
  compileOutput: (string | null)[];
  time: string[]; // Execution time per test case, e.g., ["0.018 s"]
  memory: string[]; // Memory usage per test case, e.g., ["7472 KB"]
  status: SubmissionStatus;
  createdAt: string;
  updatedAt: string;
};


type submissionWithTestCases  = {
    testCases: {
        id: string;
        stdout: string | null;
        stderr: string | null;
        stdin: string | null;
        compileOutput: string | null;
        time: string | null;
        memory: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        submissionId: string;
        testCase: number;
        expected: string;
        passed: boolean;
    }[];
} & {
    id: string;
    userId: string;
    problemId: string;
    sourceCode: string;
    language: string;
    stdout: string | null;
    stderr: string | null;
    stdin: string | null;
    compileOutput: string | null;
    time: string | null;
    memory: string | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
} | null



export type TestCaseResult = {
  testCase: number;
  passed: boolean;
  stdout: string;
  expected: string;
  stderr: string | null;
  compileOutput: string | null;
  time: string;     // e.g., "0.017 s"
  memory: string;   // e.g., "7512 KB"
  status: "Accepted" | "Wrong Answer" | "Runtime Error" | "Compilation Error" | string;
};

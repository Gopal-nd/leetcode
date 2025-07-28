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

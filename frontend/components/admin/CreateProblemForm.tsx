"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Editor from "@monaco-editor/react";
import {
  Plus,
  Trash2,
  Code2,
  FileText,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  Download,
  Loader2,
} from "lucide-react";


import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


// Types
type Difficulty = "EASY" | "MEDIUM" | "HARD";
type Language = "JAVASCRIPT" | "PYTHON" | "JAVA";

interface TestCase {
  input: string;
  output: string;
}

interface Example {
  input: string;
  output: string;
  explanation?: string;
}

interface LanguageCode {
  JAVASCRIPT: string;
  PYTHON: string;
  JAVA: string;
}

interface FormData {
  title: string;
  description: string;
  difficulty: Difficulty;
  tags: string[];
  constraints: string;
  hints?: string;
  editorial?: string;
  testcases: TestCase[];
  examples: {
    JAVASCRIPT: Example;
    PYTHON: Example;
    JAVA: Example;
  };
  codeSnippets: LanguageCode;
  referenceSolutions: LanguageCode;
}

// Schema
const problemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  tags: z.array(z.string().min(1, "Tag cannot be empty")).min(1, "At least one tag is required"),
  constraints: z.string().min(1, "Constraints are required"),
  hints: z.string().optional(),
  editorial: z.string().optional(),
  testcases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Output is required"),
      })
    )
    .min(1, "At least one test case is required"),
  examples: z.object({
    JAVASCRIPT: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    PYTHON: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    JAVA: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
  }),
  codeSnippets: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript code snippet is required"),
    PYTHON: z.string().min(1, "Python code snippet is required"),
    JAVA: z.string().min(1, "Java solution is required"),
  }),
  referenceSolutions: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript solution is required"),
    PYTHON: z.string().min(1, "Python solution is required"),
    JAVA: z.string().min(1, "Java solution is required"),
  }),
});

// Sample data
const sampleDpData: FormData = {
  title: "Climbing Stairs",
  description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
  difficulty: "EASY",
  tags: ["Dynamic Programming", "Math", "Memoization"],
  constraints: "1 <= n <= 45",
  hints: "To reach the nth step, you can either come from the (n-1)th step or the (n-2)th step.",
  editorial: "This is a classic dynamic programming problem. The number of ways to reach the nth step is the sum of the number of ways to reach the (n-1)th step and the (n-2)th step, forming a Fibonacci-like sequence.",
  testcases: [
    { input: "2", output: "2" },
    { input: "3", output: "3" },
    { input: "4", output: "5" }
  ],
  examples: {
    JAVASCRIPT: {
      input: "n = 2",
      output: "2",
      explanation: "There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps"
    },
    PYTHON: {
      input: "n = 3",
      output: "3",
      explanation: "There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step"
    },
    JAVA: {
      input: "n = 4",
      output: "5",
      explanation: "There are five ways to climb to the top"
    }
  },
  codeSnippets: {
    JAVASCRIPT: `function climbStairs(n) {
  // Write your code here
  return 0;
}`,
    PYTHON: `def climbStairs(n):
    # Write your code here
    pass`,
    JAVA: `public int climbStairs(int n) {
    // Write your code here
    return 0;
}`
  },
  referenceSolutions: {
    JAVASCRIPT: `function climbStairs(n) {
  if (n <= 2) return n;
  let dp = [0, 1, 2];
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  return dp[n];
}`,
    PYTHON: `def climbStairs(n):
    if n <= 2:
        return n
    dp = [0] * (n + 1)
    dp[1], dp[2] = 1, 2
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]`,
    JAVA: `public int climbStairs(int n) {
    if (n <= 2) return n;
    int[] dp = new int[n + 1];
    dp[1] = 1; dp[2] = 2;
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}`
  }
};

const sampleStringData: FormData = {
  title: "Valid Palindrome",
  description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
  difficulty: "EASY",
  tags: ["String", "Two Pointers"],
  constraints: "1 <= s.length <= 2 * 10^5",
  hints: "Consider using two pointers, one from the start and one from the end.",
  editorial: "Use two pointers approach to check if the string is a palindrome.",
  testcases: [
    { input: "A man, a plan, a canal: Panama", output: "true" },
    { input: "race a car", output: "false" }
  ],
  examples: {
    JAVASCRIPT: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.'
    },
    PYTHON: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true", 
      explanation: '"amanaplanacanalpanama" is a palindrome.'
    },
    JAVA: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.'
    }
  },
  codeSnippets: {
    JAVASCRIPT: `function isPalindrome(s) {
  // Write your code here
  return false;
}`,
    PYTHON: `def isPalindrome(s):
    # Write your code here
    pass`,
    JAVA: `public boolean isPalindrome(String s) {
    // Write your code here
    return false;
}`
  },
  referenceSolutions: {
    JAVASCRIPT: `function isPalindrome(s) {
  s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++; right--;
  }
  return true;
}`,
    PYTHON: `def isPalindrome(s):
    filtered = [c.lower() for c in s if c.isalnum()]
    return filtered == filtered[::-1]`,
    JAVA: `public boolean isPalindrome(String s) {
    s = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    int left = 0, right = s.length() - 1;
    while (left < right) {
        if (s.charAt(left) != s.charAt(right)) return false;
        left++; right--;
    }
    return true;
}`
  }
};

const CreateProblemForm: React.FC = () => {
  const [sampleType, setSampleType] = useState<"DP" | "string">("DP");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Language>("JAVASCRIPT");

  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      title: "",
      description: "",
      hints: "",
      constraints: "",
      difficulty: "EASY",
      editorial: "",
      testcases: [{ input: "", output: "" }],
      tags: [],
      examples: {
        JAVASCRIPT: { input: "", output: "", explanation: "" },
        PYTHON: { input: "", output: "", explanation: "" },
        JAVA: { input: "", output: "", explanation: "" },
      },
      codeSnippets: {
        JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
        PYTHON: "def solution():\n    # Write your code here\n    pass",
        JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
      },
      referenceSolutions: {
        JAVASCRIPT: "// Add your reference solution here",
        PYTHON: "# Add your reference solution here",
        JAVA: "// Add your reference solution here",
      },
    },
  });

  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
    replace: replaceTestcases,
  } = useFieldArray({
    control,
    name: "testcases",
  });


  // custom FieldArray for the Tages
  
  const [tagFields, setTagFields] = useState<string[]>([""]);
  const appendTag = (tag: string) => setTagFields((prev) => [...prev, tag]);
  const removeTag = (index: number) => setTagFields((prev) => prev.length > 1 ? prev.filter((_, i) => i !== index) : prev);
  const replaceTags = (tags: string[]) => setTagFields(tags);

  useEffect(() => {
    setValue("tags", tagFields);
  }, [tagFields, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      console.log("Creating problem:", data);
      const res = await axiosInstance.post("/problems/create-problem", data);
      console.log(res.data);
      toast.success(res.data.message || "Problem Created successfully⚡");
      router.push('/dashboard')
    } catch (error) {
      console.error("Error creating problem:", error);
      alert("Error creating problem");
    } finally {
      setIsLoading(false);
    }
  };

  const loadSampleData = () => {
    const sampleData = sampleType === "DP" ? sampleDpData : sampleStringData;
    replaceTags(sampleData.tags);
    replaceTestcases(sampleData.testcases);
    reset(sampleData);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <Card className="shadow-lg">
        <div className="border-b p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold">Create Problem</h1>
            </div>
            
            <div className="flex gap-3">
              <div className="flex border rounded-md">
                <Button
                  type="button"
                  variant={sampleType === "DP" ? "default" : "outline"}
                  size="sm"
                  className="rounded-r-none border-r-0"
                  onClick={() => setSampleType("DP")}
                >
                  DP Problem
                </Button>
                <Button
                  type="button"
                  variant={sampleType === "string" ? "default" : "outline"}
                  size="sm"
                  className="rounded-l-none"
                  onClick={() => setSampleType("string")}
                >
                  String Problem
                </Button>
              </div>
              <Button type="button" variant="secondary" size="sm" onClick={loadSampleData}>
                <Download className="w-4 h-4 mr-2" />
                Load Sample
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register("title")} placeholder="Enter problem title" />
              {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} placeholder="Enter problem description" className="min-h-24" />
              {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
            </div>

            <div>
              <Label>Difficulty</Label>
              <select 
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                {...register("difficulty")}
              >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <h3 className="font-semibold">Tags</h3>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => appendTag("")}>
                <Plus className="w-4 h-4 mr-1" />
                Add Tag
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {tagFields.map((field, index) => (
                <div key={index} className="flex gap-2">
                  <Input {...register(`tags.${index}`)} placeholder="Enter tag" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTag(index)}
                    disabled={tagFields.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            {errors.tags && (
              <p className="text-sm text-red-500 mt-2">
                {typeof errors.tags === 'string' ? errors.tags : errors.tags.message}
              </p>
            )}
          </Card>

          {/* Test Cases */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <h3 className="font-semibold">Test Cases</h3>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendTestCase({ input: "", output: "" })}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Test Case
              </Button>
            </div>
            <div className="space-y-4">
              {testCaseFields.map((field, index) => (
                <Card key={field.id} className="p-4 border">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Test Case #{index + 1}</h4>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeTestCase(index)}
                      disabled={testCaseFields.length === 1}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Input</Label>
                      <Textarea {...register(`testcases.${index}.input`)} placeholder="Enter input" />
                    </div>
                    <div>
                      <Label>Expected Output</Label>
                      <Textarea {...register(`testcases.${index}.output`)} placeholder="Enter output" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Code Sections */}
     
            
            {/* Custom Tabs */}
            <Card className="p-4">
        <div className="flex items-center gap-2 mb-4"><Code2 className="w-4 h-4"/><h3 className="font-semibold">Code Templates & Solutions</h3></div>
        {/* Tabs header */}
        <div className="flex border-b">
          {(["JAVASCRIPT","PYTHON","JAVA"] as Language[]).map(lang => (
            <button
              key={lang}
              type="button"
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === lang ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(lang)}
            >{lang}</button>
          ))}
        </div>

        {(["JAVASCRIPT","PYTHON","JAVA"] as Language[]).map(lang => (
          <div key={lang} className={activeTab === lang ? '' : 'hidden'}>
            {/* Starter Code */}
            <Card className="p-4">
              <h4 className="font-medium mb-3">Starter Code Template</h4>
              <Controller
                name={`codeSnippets.${lang}` as const}
                control={control}
                render={({ field }) => (
                  <Editor
                    height="300px"
                    language={lang.toLowerCase()}
                    theme="vs-dark"
                    value={field.value}
                    onChange={field.onChange}
                    options={{ minimap:{enabled:false}, fontSize:14, lineNumbers:'on', roundedSelection:false, scrollBeyondLastLine:false, automaticLayout:true }}
                  />
                )}
              />
            </Card>

            {/* Reference Solution */}
            <Card className="p-4">
              <h4 className="font-medium mb-3">Reference Solution</h4>
              <Controller
                name={`referenceSolutions.${lang}` as const}
                control={control}
                render={({ field }) => (
                  <Editor
                    height="250px"
                    language={lang.toLowerCase()}
                    theme="vs-dark"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </Card>

            {/* Example */}
            <Card className="p-4">
              <h4 className="font-medium mb-3">Example</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Input</Label>
                  <Textarea {...register(`examples.${lang}.input` as const)} placeholder="Example input" />
                </div>
                <div>
                  <Label>Output</Label>
                  <Textarea {...register(`examples.${lang}.output` as const)} placeholder="Example output" />
                </div>
                <div className="md:col-span-2">
                  <Label>Explanation</Label>
                  <Textarea {...register(`examples.${lang}.explanation` as const)} placeholder="Explain the example" />
                </div>
              </div>
            </Card>
          </div>
        ))}

      </Card>

          {/* Additional Info */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-4 h-4" />
              <h3 className="font-semibold">Additional Information</h3>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Constraints</Label>
                <Textarea {...register("constraints")} placeholder="Enter problem constraints" />
                {errors.constraints && <p className="text-sm text-red-500 mt-1">{errors.constraints.message}</p>}
              </div>
              <div>
                <Label>Hints (Optional)</Label>
                <Textarea {...register("hints")} placeholder="Enter hints" />
              </div>
              <div>
                <Label>Editorial (Optional)</Label>
                <Textarea {...register("editorial")} placeholder="Enter editorial" />
              </div>
            </div>
          </Card>

          <div className="flex justify-end pt-4 border-t">
            <Button type="button" disabled={isLoading} size="lg" onClick={handleSubmit(onSubmit)}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Create Problem
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateProblemForm;
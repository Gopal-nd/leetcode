import { create } from "zustand";
import { TestCaseResult } from "@/types/Problem";

interface OutputResponseStore {
  testcases: TestCaseResult[];
  status: string;
  scrollTargetRef: React.RefObject<HTMLDivElement> | null;
  setScrollTargetRef: (ref: React.RefObject<HTMLDivElement>) => void;
  setTestCases: (testcases: TestCaseResult[]) => void;
  setStatus: (status: string) => void;
}

export const useOutputResponse = create<OutputResponseStore>((set) => ({
  testcases: [],
  status: "",
  scrollTargetRef: null,
  setScrollTargetRef: (ref) => set(() => ({ scrollTargetRef: ref })),
  setTestCases: (testcases) => set(() => ({ testcases })),
  setStatus: (status) => set(() => ({ status })),
}));

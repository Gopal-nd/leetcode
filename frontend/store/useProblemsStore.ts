import { axiosInstance } from "@/lib/axios";
import { Problem } from "@/types/Problem";
import { get } from "http";
import {toast} from "sonner";
import {create} from "zustand";

interface ProblemsStore {
    problems: Problem[],
    problem: Problem | null,
    solvedProblems: Problem[],
    isProblemLoading: boolean,
    isProblemsLoading: boolean,
    getAllProblems: () => Promise<void>,
    getProblemById: (id: string) => Promise<void>,
    getSolvedProblems: () => Promise<void>
}
export const useProblemsStore= create<ProblemsStore> ((set) => ({
    problems: [],
    problem:null,
    solvedProblems: [],
    isProblemLoading: false,
    isProblemsLoading: false,

    getAllProblems: async () => {
        try {
            set({isProblemsLoading: true});
            const res = await axiosInstance.get('/problems/get-all-problems');
            const data = res.data;
            set({problems: data.data});
            toast.success(data.message);
        } catch (error) {
            toast.error("Something went wrong in Fetching");
            console.error(error);
        } finally {
            set({isProblemsLoading: false});
        }
    },

    getProblemById: async (id: string) => {
        try {
            set({isProblemLoading: true});
            const res = await axiosInstance.get(`/problems/get-problem/${id}`);
            const data = res.data;
            set({problem: data.data});
            toast.success(data.message);
        } catch (error) {
            toast.error("Something went wrong in Fetching problem " + id);
            console.error(error);
        } finally {
            set({isProblemLoading: false});
        }
    },

    getSolvedProblems: async () => {
        try {
            set({isProblemsLoading: true});
            const res = await axiosInstance.get('/problems/get-solved-problems');
            const data = res.data;
            set({solvedProblems: data.data});
            toast.success(data.message);
        } catch (error) {
            toast.error("Something went wrong in Fetching");
            console.error(error);
        } finally {
            set({isProblemsLoading: false});
        }
    },
}));


interface ProblemLanguageStore {
    lang: string,
    setLang: (lang: string) => void
}
export const useProblemLanguageStore = create<ProblemLanguageStore>((set) => ({
    lang: 'JAVASCRIPT',
    setLang: (lang: string) => set({ lang }),
}));
import { axiosInstance } from "@/lib/axios";
import { get } from "http";
import {toast} from "sonner";
import {create} from "zustand";

export const useExecutionStore = create((set) => ({
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
            const res = await axiosInstance.get(`/problems/get-problem-/${id}`);
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
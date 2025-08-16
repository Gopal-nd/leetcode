import useAuthStore from "@/store/useAuthstore";

export const  useSession = () => {
    const {user} = useAuthStore();
    return { data: user, isLoading: false, isError: false, error: null };
}
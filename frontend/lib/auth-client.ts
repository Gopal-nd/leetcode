import useAuthStore from "@/store/useAuthstore";

export const  useSession = () => {
    const {user} = useAuthStore();

    return { data: {user:user!}, isLoading: false, isError: false, error: null, refetch: () => {} , isPending: false};
}
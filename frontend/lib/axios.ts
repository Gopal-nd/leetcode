import useAuthStore from '@/store/useAuthstore'
import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL!}/api/v1`,
    withCredentials: true,
})
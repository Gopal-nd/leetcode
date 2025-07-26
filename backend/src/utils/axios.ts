import axios  from "axios";


export const axiosInstance = axios.create({
    baseURL:process.env.JUDGE0_API_URL,

    headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-key': process.env.JUDGE0_API_KEY!,
         'x-rapidapi-host': process.env.JUDGE0_API_HOST!,
    }
})
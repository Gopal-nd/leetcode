import axios from "axios"
import { axiosInstance } from "../utils/axios"

export  function getJudge0LanguageId(language:string)  {

  const languageMap: { [key: string]: number } = {
        "PYTHON":71,
        "JAVA":62,
        "JAVASCRIPT":63,
    }
    language = language.toUpperCase()

    return languageMap[language]
}



const sleep  = (ms:number)=> new Promise((resolve)=> setTimeout(resolve , ms))



export async function submitBatch(submissions:any) {

    const {data} = await axiosInstance.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,{
        submissions
    })


    // console.log("Submission Results: ", data)

    return data // [{token} , {token} , {token}]
}



export const pollBatchResults = async (tokens:string[])=>{
    while(true){
        
        const {data} = await axiosInstance.get(`${process.env.JUDGE0_API_URL}/submissions/batch`,{
            params:{
                tokens:tokens.join(","),
                base64_encoded:false,
            }
        })

        const results = data.submissions;
        const isAllDone = results.every(
            (r:any)=> r.status.id !== 1 && r.status.id !== 2
        )
        
        if(isAllDone) return results
        await sleep(1000)
    }
}

export function getLanguageName(languageId: number){
    const LANGUAGE_NAMES: Record<number, string> = {
        74: "TypeScript",
        63: "JavaScript",
        71: "Python",
        62: "Java",
    }

    return LANGUAGE_NAMES[languageId] ?? "Unknown"
}
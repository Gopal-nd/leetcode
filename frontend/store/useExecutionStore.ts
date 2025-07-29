// import {create} from "zustand";
// import { axiosInstance } from "../lib/axios";
// import { toast } from "sonner";



// export const useExecutionStore = create((set)=>({
//     isExecuting:false,
//     submission:null,

//     // source_code, language_id, stdin, expected_outputs, problemId}

//        executeCode:async ( source_code:string, language_id:number, stdin:string[], expected_outputs:string[], problemId:string)=>{
//         try {
//             set({isExecuting:true});
//             console.log("Submission:",JSON.stringify({
//                 source_code,
//                 language_id,
//                 stdin,
//                 expected_outputs,
//                 problemId
//             }));
//             const res = await axiosInstance.post("/execute-code" , { source_code, language_id, stdin, expected_outputs, problemId });

//             set({submission:res.data.data});
      
//             toast.success(res.data.message);
//         } catch (error) {
//             console.log("Error executing code",error);
//             toast.error("Error executing code");
//         }
//         finally{
//             set({isExecuting:false});
//         }
//     }
// }))
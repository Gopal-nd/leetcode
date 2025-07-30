import { axiosInstance } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const SubmissionsHistory = () => {
    const {data, isLoading,error} = useQuery({
        queryKey: ['submissions'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/submissions/get-all-submissions`)
            return res.data.data
        }
    })

    console.log(data)
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error</div>

  return (
    <div className='flex flex-col p-6 rounded-lg gap-4 m-10'>
      {data.length === 0 && <p className="p-2 text-center">No submissions yet</p>}
      <h1 className='text-2xl font-bold p-2'>Your Submissions</h1>
      {
        data.map((submission: any, i:number) => {
          return(
         <Accordion
      type="single"
      collapsible
      className="w-full"

    >
      <AccordionItem value={`item-${i}`} className='border rounded-lg'>
        <AccordionTrigger className='p-4 flex justify-between items-center border '>
          <h4>Submission {i+1}</h4>
          <Button className={`${submission.status==="ACCEPTED" ? "bg-green-500" : "bg-red-500"}`}>{submission.status}</Button>
          <p>{submission.language}</p>
   
          <p>{submission.createdAt.split("T")[0]}</p>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance p-2">
         <div>
          <div>
            <h1 className='text-2xl font-bold p-2'>Source Code</h1>
             <Editor
                    height="400px"
                    language={submission.language.toLowerCase()}
                    theme="vs-dark"
                    value={submission.sourceCode}
                    className='p-2 bg-blue-300  rounded-2xl'
                    options={{ minimap:{enabled:false}, fontSize:14, lineNumbers:'on', roundedSelection:false, scrollBeyondLastLine:false, automaticLayout:true }}
                  />
          </div>
          <div className='flex w-full flex-col p-4  gap-2'>
            <div className=' flex flex-col p-4 border rounded-lg text-lg'>
              <p>Input : </p>
              {submission.stdin}
            </div>
              <div className=' flex flex-col p-4 border rounded-lg text-lg'>
              <p>Output : </p>
              {submission.stdout}
            </div>
         <div className="flex flex-col gap-4">
        {submission.testCases.map((testcase:any) => (
          <div
            key={testcase.testCase}
            className="flex flex-wrap items-center justify-between gap-4 border rounded-xl shadow-md px-6 py-4"
          >
            <div className="text-xl font-semibold ">
              Testcase #{testcase.testCase}
            </div>

            <div
              className={`text-lg font-bold ${
                testcase.passed ? "text-green-600" : "text-red-600"
              }`}
            >
              {testcase.passed ? "Accepted" : "Wrong Answer"}
            </div>

            <div className=" text-base">
              <span className="font-medium ">Your Output:</span>{" "}
              {testcase.stdout}
            </div>

            <div className=" text-base">
              <span className="font-medium ">
                Expected Output:
              </span>{" "}
              {testcase.expected}
            </div>

            <div className=" text-base">
              <span className="font-medium ">Time:</span>{" "}
              {testcase.time}
            </div>

            <div className=" text-base">
              <span className="font-medium ">Memory:</span>{" "}
              {testcase.memory}
            </div>

            {testcase.stderr && (
              <div className="text-red-500 text-base font-medium">
                Error: {testcase.stderr}
              </div>
            )}
          </div>
        ))}
      </div>
          </div>
          <div className='flex justify-evenly items-center p-4'>
          
              
                   <p className='text-2xl text-green-500 p-4 border rounded-2xl'> Time : {JSON.parse(submission.time as any)[0]}</p>
                   <p className='text-2xl text-orange-500 p-4 border rounded-2xl'> Memory : {JSON.parse(submission.memory as any)[0]}</p>

    
          </div>
         </div>
        </AccordionContent>
      </AccordionItem>
     
    </Accordion>
          )
        })
      }
    </div>
  )
}

export default SubmissionsHistory



import React from 'react'
import { CheckCircle, XCircle, Clock } from 'lucide-react'
import { Button } from '../ui/button'
import { Editor } from '@monaco-editor/react'

const SubmissionResult = ({ status = "Wrong Answer" }) => {
  const isAccepted = status === "Accepted"

  return (
    <div className="bg-[#0f0f0f] text-white p-6 rounded-lg space-y-6 font-mono">
      {/* Header */}
      <div className="flex justify-between items-center text-sm text-gray-400">
        <span className="text-red-400">✗ {status}</span>
        <span>JavaScript ● Submitted Jun 8, 2025, 3:43 PM</span>
      </div>

      {/* Code Panel */}
      <div className="bg-[#1e1e1e] rounded-md p-4 text-sm overflow-x-auto">
        <pre><code>{`class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function inorderTraversal(root) {
  // TODO: Implement your logic here
  return [];
}

function buildTree(arr) {
  // TODO: Implement build tree from level-order array
  return null;
}`}</code></pre>
      </div>

      {/* Input/Output */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <h3 className="text-gray-400 mb-1">▶ Input</h3>
          <div className="bg-[#1e1e1e] rounded p-2 whitespace-pre">
{`7
1 -1 2 3 -1 -1 -1
1
1 -1
0`}
          </div>
        </div>
        <div>
          <h3 className="text-gray-400 mb-1">◀ Output</h3>
          <div className="bg-[#1e1e1e] rounded p-2 h-full min-h-[80px]">
            {/* output would appear here */}
          </div>
        </div>
      </div>

      {/* Execution info */}
      <div className="flex justify-between text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>Execution Time: 0.05s</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Memory Used: 22760 KB</span>
        </div>
      </div>

      {/* Previous Submissions */}
      <div className="border-t border-gray-700 pt-4 text-sm space-y-2">
        <div className="text-green-400">✓ Accepted ● Python ● Jun 27, 2025, 2:13 PM</div>
        <div className="text-green-400">✓ Accepted ● JavaScript ● Jun 27, 2025, 9:07 PM</div>
        <div className="text-green-400">✓ Accepted ● JavaScript ● Jun 28, 2025, 1:43 PM</div>
      </div>
    </div>
  )
}


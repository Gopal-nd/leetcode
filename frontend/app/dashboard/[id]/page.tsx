"use client";
import { useParams } from "next/navigation";
import React, { use, useEffect } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useOutputResponse } from "@/store/useOutputResponse";
import { useProblemsStore } from "@/store/useProblemsStore";
import { Problem } from "@/types/Problem";
import Description from "@/components/user/editor/Description";
import Submissions from "@/components/user/editor/Submissions";
import Solutions from "@/components/user/editor/Solutions";
import Hints from "@/components/user/editor/Hints";
import CodeEditor from "@/components/user/CodeEditor";
import OutPut from "@/components/user/OutPut";
import TestCases from "@/components/user/TestCases";
const ProblemPage = () => {
  const params = useParams();
  const id = params.id;
  console.log(id);
    const {testcases,status}= useOutputResponse() 
  const {getProblemById, problem} = useProblemsStore() as {
    getProblemById: (id: string) => void;
    problem: Problem;
  }
  useEffect(() => {
    getProblemById(id as string);
  },[])
  console.log(problem)
  if(!problem) return <div>loading</div>

  return (
    <>
    <div className="flex flex-col h-[calc(100vh-4rem)] ">
      {/* <div className='h-10 p-1 flex items-center justify-between'>
            <div>
                <h1>Problem {id}</h1>
            </div>
            <div>
                clock component
            </div>
            <div className='flex gap-2'>
                <div>submissions</div>
                <div> share</div>
            </div>
        </div> */}
      <div className="flex-1 border-b ">
        <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-4rem)]">
          <ResizablePanel minSize={25} defaultSize={50}>
            <Tabs defaultValue="description">
        <TabsList className="w-full">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="submissions">Submission</TabsTrigger>
          <TabsTrigger value="solutions">Solutions</TabsTrigger>
          <TabsTrigger value="hints">Hints</TabsTrigger>

        </TabsList>
        <TabsContent value="description">
          <Description problem={problem} />
        </TabsContent>
        <TabsContent value="submissions">
          <Submissions problem={problem} />
        </TabsContent>
         <TabsContent value="solutions">
          <Solutions problem={problem} />
        </TabsContent>
         <TabsContent value="hints">
          <Hints problem={problem} />
        </TabsContent>
      </Tabs>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={75}>
                <CodeEditor problem={problem}/>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={25}>
               <OutPut problem={problem}/>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
    {status && testcases && (
    <TestCases />
    )}
    </>

  );
};

export default ProblemPage;




"use client";
import { useParams } from "next/navigation";
import React, { use, useEffect } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Problem } from "@/types/Problem";
import Description from "@/components/user/editor/Description";
import Submissions from "@/components/user/editor/Submissions";
import Solutions from "@/components/user/editor/Solutions";
import Hints from "@/components/user/editor/Hints";
import CodeEditor from "@/components/user/CodeEditor";
import OutPut from "@/components/user/OutPut";
import TestCases from "@/components/user/TestCases";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";
import { useOutputResponse } from "@/store/useOutputResponse";

const ProblemPage = () => {
  
  const params = useParams();
  const id = params.id;
   const {testcases,status}= useOutputResponse() 

    const { data:problem,isLoading,error} = useQuery<Problem>({
    queryKey: ["problem", id],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/problems/get-problem/${id}`);
        const data = res.data;

        toast.success(data.message);
        return data.data
      } catch (error) {
        toast.error("Something went wrong in Fetching");
        console.error(error);
      } 
      
    }})

    if(isLoading || !problem) return <Spinner />

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-4rem)] ">
        <div className="flex-1 border-b ">
          <ResizablePanelGroup
            direction="horizontal"
            className="h-[calc(100vh-4rem)]"
          >
            <ResizablePanel minSize={25} defaultSize={50}>
              <Tabs defaultValue="description">
                <TabsList className="w-full">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="submissions">Submission</TabsTrigger>
                  <TabsTrigger value="solutions">Solutions</TabsTrigger>
                  <TabsTrigger value="hints">AI Hints</TabsTrigger>
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
                  <CodeEditor problem={problem} />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={25}>
                  <OutPut problem={problem} />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
      {status&& testcases  && <TestCases />}
    </>
  );
};

export default ProblemPage;

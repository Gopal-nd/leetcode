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
const ProblemPage = () => {
  const params = useParams();
  const id = params.id;
  console.log(id);
  const {getProblemById, problem} = useProblemsStore() as {
    getProblemById: (id: string) => void;
    problem: Problem;
  }
  useEffect(() => {
    getProblemById(id as string);
  },[])
  console.log(problem)
  return (
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
                <div className="flex flex-col h-screen">
                  <p>editor</p>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={25}>
                <div className="flex flex-col h-full">
                  <p>output</p>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default ProblemPage;





import { AppWindowIcon, CodeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useProblemsStore } from "@/store/useProblemsStore";
import { Problem } from "@/types/Problem";
import Description from "@/components/user/editor/Description";
import Hints from "@/components/user/editor/Hints";
import Solutions from "@/components/user/editor/Solutions";
import { Sub } from "@radix-ui/react-dropdown-menu";
import Submissions from "@/components/user/editor/Submissions";


export function TabsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Name</Label>
                <Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Username</Label>
                <Input id="tabs-demo-username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

import { Problem } from '@/types/Problem'
import React from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Gemini from '@/components/Gemini'
const Hints = ({problem}:{problem:Problem}) => {
  return (
    <Tabs defaultValue="manual">
        <TabsList className="w-full">
          <TabsTrigger value="manual">Hint</TabsTrigger>
          <TabsTrigger value="hints">AI Help</TabsTrigger>
        </TabsList>
        <TabsContent value="manual">
          <div>
            <p>{problem.hints}</p>
          </div>
        </TabsContent>
        <TabsContent value="hints">
          <Gemini problem={problem} />
        </TabsContent>
      </Tabs>
  )
}

export default Hints
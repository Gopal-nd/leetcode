import { Problem } from "@/types/Problem";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
const OutPut = ({ problem }: { problem: Problem }) => {
  const [index, setIndex] = useState(0);
  return (
    <div className="border-t ">
      
      <div className="p-2 border-b">
        <p className="font-semibold text-xl">{">_ TestCases"}</p>
      </div>

      <div className="flex gap-1 p-4">
        {problem.testCases.map((testCase, i) => (
          <Button onClick={() => setIndex(i)} variant={i === index ? "default" : "outline"}>TestCase {i + 1}</Button>
        ))}
      </div>

      <div>
          {problem.testCases.map(
            (testCase, i) =>
              i === index && (
                <div key={index} className="p-4 gap-1">
                  <p className="">Input: {testCase.input}</p>
                  <p>Output: {testCase.output}</p>
                </div>
              )
          )}
        </div>
    </div>
  );
};

export default OutPut;

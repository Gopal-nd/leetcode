import { Badge } from "@/components/ui/badge";
import { Problem } from "@/types/Problem";
import React from "react";

const Description = ({ problem }: { problem: Problem }) => {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{problem.title}</h1>
        <Badge>{problem.difficulty}</Badge>
      </div>
      <p className="text-lg font-semibold">{problem.description}</p>
      <div className="space-y-4">
        <p className="text-xl font-bold">Examples</p>
        <div className="space-y-4">
          <div className=" p-4 rounded-md shadow-sm">
            <h2 className="text-lg font-semibold">Example 1:</h2>
            <p>
              <strong>Input:</strong> {problem.examples["JAVASCRIPT"]?.input}
            </p>
            <p>
              <strong>Output:</strong> {problem.examples["JAVASCRIPT"]?.output}
            </p>
            <p>
              <strong>Explanation:</strong>{" "}
              {problem.examples["JAVASCRIPT"]?.explanation}
            </p>
          </div>
          <div className=" p-4 rounded-md shadow-sm">
            <h2 className="text-lg font-semibold">Example 2:</h2>
            <p>
              <strong>Input:</strong> {problem.examples["JAVA"]?.input}
            </p>
            <p>
              <strong>Output:</strong> {problem.examples["JAVA"]?.output}
            </p>
            <p>
              <strong>Explanation:</strong>{" "}
              {problem.examples["JAVA"]?.explanation}
            </p>
          </div>
          <div className=" p-4 rounded-md shadow-sm">
            <h2 className="text-lg font-semibold">Example 3:</h2>
            <p>
              <strong>Input:</strong> {problem.examples["PYTHON"]?.input}
            </p>
            <p>
              <strong>Output:</strong> {problem.examples["PYTHON"]?.output}
            </p>
            <p>
              <strong>Explanation:</strong>{" "}
              {problem.examples["PYTHON"]?.explanation}
            </p>
          </div>
        </div>
      </div>
      <p className="text-lg">
        <strong>Constraints:</strong> {problem.constraints}
      </p>
    </div>
  );
};

export default Description;

import { useOutputResponse } from "@/store/useOutputResponse";
import { TestCaseResult } from "@/types/Problem";
import React, { useRef } from "react";

const TestCases = () => {
   
  const { testcases, status ,scrollTargetRef} = useOutputResponse() 


    setTimeout(() => {
      scrollTargetRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

  return (
    <div className="h-full w-full px-8 py-6" ref={scrollTargetRef}>
      <h2
        className={`text-3xl font-bold mb-6 ${
          status.toLowerCase() === "accepted"
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {status.toLowerCase() === "accepted" ? "Accepted" : "Wrong Answer"}
      </h2>

      <div className="flex flex-col gap-4">
        {testcases.map((testcase) => (
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
  );
};

export default TestCases;

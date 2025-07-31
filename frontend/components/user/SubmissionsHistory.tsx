import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { Editor } from "@monaco-editor/react";
import Spinner from "../Spinner";

const SubmissionsHistory = () => {
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["submissions"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/submissions/get-all-submissions`);
      return res.data.data;
    },
  });

  return (
    <div className="flex flex-col p-6 rounded-lg gap-4 m-10">
      <h1 className="text-2xl font-bold p-2">Your Submissions</h1>
      {data?.length === 0 && (
        <p className="p-2 text-center">No submissions yet</p>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        data?.map((submission: any, i: number) => {
          return (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={`item-${i}`} className="border rounded-lg">
                <AccordionTrigger className="p-4 flex justify-between items-center border ">
                  <h4>Submission {i + 1}</h4>
                  <Button
                    className={`${
                      submission?.status === "ACCEPTED"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {submission.status != "ACCEPTED" ? "REJECTED" : "ACCEPTED"}
                  </Button>
                  <p>{submission.language}</p>

                  <p>{submission.createdAt.split("T")[0]}</p>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance p-2">
                  <div>
                    <div>
                      <h1 className="text-2xl font-bold p-2">Source Code</h1>
                      <Editor
                        height="400px"
                        language={submission?.language}
                        theme="vs-dark"
                        value={submission.sourceCode}
                        className="p-2 bg-blue-300  rounded-2xl"
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: "on",
                          roundedSelection: false,
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                        }}
                      />
                    </div>
                    <div className="flex w-full flex-col p-4  gap-2">
                      <div className=" flex flex-col p-4 border rounded-lg text-lg">
                        <p>Input : </p>
                        {submission.stdin}
                      </div>
                      <div className=" flex flex-col p-4 border rounded-lg text-lg">
                        <p>Output : </p>
                        {submission.stdout}
                      </div>
                      <div className="flex flex-col gap-4">
                        {submission.testCases.map((testcase: any) => (
                          <div
                            key={testcase.testCase}
                            className="flex flex-wrap items-center justify-between gap-4 border rounded-xl shadow-md px-6 py-4"
                          >
                            <div className="text-xl font-semibold ">
                              Testcase #{testcase.testCase}
                            </div>

                            <div
                              className={`text-lg font-bold ${
                                testcase.passed
                                  ? "text-green-600"
                                  : "text-red-600"
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
                    <div className="flex justify-evenly items-center p-4">
                      <p className="text-2xl text-green-500 p-4 border rounded-2xl">
                        {" "}
                        Time :{" "}
                        {submission.time &&
                          JSON.parse(submission.time as any)[0]}
                      </p>
                      <p className="text-2xl text-orange-500 p-4 border rounded-2xl">
                        {" "}
                        Memory :{" "}
                        {submission.memory &&
                          JSON.parse(submission.memory as any)[0]}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })
      )}
    </div>
  );
};

export default SubmissionsHistory;

import { Problem, SubmissionDetails } from "@/types/Problem";
import React from "react";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

const Submissions = ({ problem }: { problem: Problem }) => {
  const sub = problem.submissions as unknown as SubmissionDetails[];
  return (
    <div>
 
      <div className="p-2 border-b flex flex-col gap-2 ">
        {sub.map((submission: SubmissionDetails, i) => (

                <div
                  key={submission.id}
                  className="p-2 border flex flex-col w-full gap-2"
                >
                  <div className="border-b">
                    <p className="font-semibolds"> Submission {i + 1}</p>
                  </div>
                  <div className="flex gap-2 justify-evenly">
                    <p
                      className={`${
                        submission.status === "ACCEPTED"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {submission.status}
                    </p>
                    <p>{submission.language}</p>
                    <p>{JSON.parse(submission.time as any)[0]}</p>
                    <p>{JSON.parse(submission.memory as any)[0]}</p>
                    <p>{submission.createdAt.split("T")[0]}</p>
                  </div>
                </div>
        ))}
      </div>
    </div>
  );
};

export default Submissions;

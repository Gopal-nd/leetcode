import { APIError } from "../utils/api-error";
import {
  getJudge0LanguageId,
  pollBatchResults,
  submitBatch,
} from "../lib/judge0";
import prisma from "../lib/db";
import asyncHandler from "../utils/async-handler";
import { ApiResponse } from "../utils/api-response";

export const createProblem = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases: testCases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  console.log("body", req.body);

  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);
      console.log( "languageId",languageId)
      if (!languageId) {
        throw new APIError({
          status: 400,
          message: "Invalid languageId " + languageId,
        });
      }

      const submissions = testCases.map(
        ({ input, output }: { input: string; output: string }) => ({
          source_code: solutionCode,
          language_id: languageId,
          stdin: input,
          expected_output: output,
        })
      );

      console.log( "submitions",submissions)

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((res: any) => res.token);
    //   console.log("tokens are :-", tokens)
      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log( "result of each test case",i,result)
        console.log("Result-----", result);
        console.log(
          `Testcase ${i + 1} and Language ${language} ----- result ${JSON.stringify(result.status.description)}`
        );
        if (result.status.id !== 3) {
          return res.json(new ApiResponse({
            statusCode: 400,
            data: null,
            message: `Testcase ${
              i + 1
            } and Language ${language} ----- result ${JSON.stringify(
              result.status.description
            )}`,
          }))
        }
      }
    }

    if(!req.user) throw new APIError({status: 400, message: "User not found"})

      const newProblem = await prisma.problems.create({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testCases,
        codeSnippets,
        referenceSolutions,
        userId: req.user?.id,
      },
    });

    res.json(new ApiResponse({
      statusCode: 200,
      data: newProblem,
      message: "Success",
    }))
  } catch (error) {
    console.log(error);
    res.json( new ApiResponse({
      statusCode: 400,
      data: null,
      message: `something went wrong ${error}`,
    }))
  }
});

export const getAllProblems = asyncHandler(async (req, res) => {
  const problems = await prisma.problems.findMany();

  if (!problems) {
    return res.json(new ApiResponse({
      statusCode: 400,
      data: null,
      message: "No problems found",
    }));
  }

  return res.json( new ApiResponse({
    statusCode: 200,
    data: problems,
    message: "Success",
  }))
});

export const getProblemById = asyncHandler(async (req, res) => {

  const {id} = req.params


  const problem = await prisma.problems.findUnique({
    where: {
      id: id ,
    },
  });

  if (!problem) {
    return res.json( new ApiResponse({
      statusCode: 400,
      data: null,
      message: "No problems found",
    }))
  }

   res.json(new ApiResponse({
    statusCode: 200,
    data: problem,
    message: "Success",
  }))
  })

export const updateProblemById = asyncHandler(async (req, res) => {

  const {id} = req.params
     const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testCases,
    codeSnippets,
    referenceSolutions,
  } = req.body;
  const problem = await prisma.problems.findUnique({
    where: {
      id: id ,
    },
  });

  if (!problem) {
    return res.json( new ApiResponse({
      statusCode: 400,
      data: null,
      message: "No problems found",
    }))
  }

   try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        throw new APIError({
          status: 400,
          message: "Invalid languageId " + languageId,
        });
      }

      const submissions = testCases.map(
        ({ input, output }: { input: string; output: string }) => ({
          source_code: solutionCode,
          language_id: languageId,
          stdin: input,
          expected_output: output,
        })
      );

      console.log( "submitions",submissions)

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((res: any) => res.token);
    //   console.log("tokens are :-", tokens)
      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log( "result of each test case",i,result)
        console.log("Result-----", result);
        console.log(
          `Testcase ${i + 1} and Language ${language} ----- result ${JSON.stringify(result.status.description)}`
        );
        if (result.status.id !== 3) {
          return res.json( new ApiResponse({
            statusCode: 400,
            data: null,
            message: `Testcase ${
              i + 1
            } and Language ${language} ----- result ${JSON.stringify(
              result.status.description
            )}`,
          }))
        }
      }
    }

    if(!req.user) throw new APIError({status: 400, message: "User not found"})

      const updatedProblem = await prisma.problems.update({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testCases,
        codeSnippets,
        referenceSolutions,
        userId: req.user?.id,
      },
      where:{
        id
      }
    });

    return res.json(new ApiResponse({
      statusCode: 200,
      data: updatedProblem,
      message: "Success",
    }))
  } catch (error) {
    console.log(error);
    return res.json(new ApiResponse({
      statusCode: 400,
      data: null,
      message: `something went wrong ${error}`,
    }))
  }

});
export const deleteProblemById = asyncHandler(async (req, res) => {
  const {id} = req.params;

  const problem = await prisma.problems.findUnique({
    where: {
      id: id,
    },
  });

  if (!problem) {
    return res.json(new ApiResponse({
      statusCode: 400,
      data: null,
      message: "No problems found",
    }))
  }

  await prisma.problems.delete({
    where: {
      id: id,
    },
  });

  return res.json( new ApiResponse({
    statusCode: 200,
    data: null,
    message: "Success",
  }))
  })

export const getUserSolvedProblems = asyncHandler(async (req, res) => {
  
  if(!req.user) throw new APIError({status: 400, message: "User not found"})

  const problems = await prisma.problems.findMany({
  where:{
        problemSolved: {
          some: {
            userId: req.user.id,
          },
        },
      },
      
      include:{
        problemSolved:{
          where:{
            userId:req.user.id
          }
        }
      }
  });

  return res.json( new ApiResponse({
    statusCode: 200,
    data: problems,
    message: "Success",
  }))
});

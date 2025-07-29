import prisma from "../lib/db";
import { getLanguageName, pollBatchResults, submitBatch } from "../lib/judge0";
import { APIError } from "../utils/api-error";
import { ApiResponse } from "../utils/api-response";
import asyncHandler from "../utils/async-handler";

export const executeCode = asyncHandler(async (req, res) => {

    const {source_code, language_id, stdin, expected_outputs, problemId} = req.body

    console.log(req.body)

    // validation tests
    if (!Array.isArray(stdin) || !Array.isArray(expected_outputs)||stdin.length !== expected_outputs.length || !source_code || !language_id || stdin.length ===0 || !problemId) {
        throw new APIError({
            status: 400,
            message: "Invalid request body",
        })
    }

    // prepare each test case
    const submissions = stdin.map((input, index) => ({
        source_code: source_code,
        language_id: language_id,
        stdin: input,
    }))


    // send batch of submmissions to judge0
    const submissionResults = await submitBatch(submissions)

    const tokens = submissionResults.map((res: any) => res.token)
    
    // poll for results
    const results = await pollBatchResults(tokens)

    console.log("results", results)


    // validate results
    let isAllPassed = true;
    const detailsResults = results.map((result: any, index: number) => {
        const stdout = result.stdout?.trim();
        const expected_output = expected_outputs[index].trim();
        if (stdout !== expected_output) {
            isAllPassed = false;
        }
        const passed = stdout === expected_output;
        return {
            testCase: index + 1,
            passed,
            stdout,
            expected:expected_output,
            stderr: result.stderr||null,
            compileOutput: result.compile_output ||null,
            time: result.time ? `${result.time} s`:undefined,
            memory: result.memory ?`${result.memory} KB`:undefined,
            status:result.status.description
        };
    })
    console.log(detailsResults)
    if(!req.user?.id){
        throw new APIError({
            status: 400,
            message: "User not found",
        })
    }
   const submission = await prisma.submission.create({
        data: {
            problemId,
            userId: req.user.id,
            sourceCode: source_code,
            language: getLanguageName(language_id),
            stdin: stdin.join("\n"),
            stdout:JSON.stringify(detailsResults.map((result: any) => result.stdout)),
            stderr:detailsResults.map((result: any) => result.stderr) ? JSON.stringify(detailsResults.map((result: any) => result.stderr)):null,
            compileOutput:detailsResults.map((result: any) => result.compileOutput) ? JSON.stringify(detailsResults.map((result: any) => result.compileOutput)):null,
            status : isAllPassed ? "ACCEPTED" : "REJECTED",
            memory:detailsResults.map((result: any) => result.memory) ? JSON.stringify(detailsResults.map((result: any) => result.memory)):null,
            time:detailsResults.map((result: any) => result.time) ? JSON.stringify(detailsResults.map((result: any) => result.time)):null
        }
    })

    if(isAllPassed){
        await prisma.problemSolved.upsert({
            where: {
                userId_problemId: {
                    problemId,
                    userId: req.user.id
                }
            },
            create: {
                problemId,
                userId: req.user.id,
            },
            update: {}
        })
    }

    // save details of each test case
    const testCaseDetails = detailsResults.map((result: any) => ({
        
            submissionId: submission.id,
            ...result
        
    }))

    const testCaseResults = await prisma.testCaseResult.createMany({
        data: testCaseDetails
    })

    const submissionWithTestCases = await prisma.submission.findUnique({
        where: {
            id: submission.id
        },
        include: {
            testCases:true,
        }
    })

    return res.json(new ApiResponse({
        message: "Success",
        data:submissionWithTestCases,
        statusCode:200
    }))
})



export const RunCode = asyncHandler(async (req, res) => {

    const {source_code, language_id, stdin, expected_outputs, problemId} = req.body

    console.log(req.body)

    // validation tests
    if (!Array.isArray(stdin) || !Array.isArray(expected_outputs)||stdin.length !== expected_outputs.length || !source_code || !language_id || stdin.length ===0 || !problemId) {
        throw new APIError({
            status: 400,
            message: "Invalid request body",
        })
    }

    // prepare each test case
    const submissions = stdin.map((input, index) => ({
        source_code: source_code,
        language_id: language_id,
        stdin: input,
    }))


    // send batch of submmissions to judge0
    const submissionResults = await submitBatch(submissions)

    const tokens = submissionResults.map((res: any) => res.token)
    
    // poll for results
    const results = await pollBatchResults(tokens)

    console.log("results", results)


    // validate results
    let isAllPassed = true;
    const detailsResults = results.map((result: any, index: number) => {
        const stdout = result.stdout?.trim();
        const expected_output = expected_outputs[index].trim();
        if (stdout !== expected_output) {
            isAllPassed = false;
        }
        const passed = stdout === expected_output;
        return {
            testCase: index + 1,
            passed,
            stdout,
            expected:expected_output,
            stderr: result.stderr||null,
            compileOutput: result.compile_output ||null,
            time: result.time ? `${result.time} s`:undefined,
            memory: result.memory ?`${result.memory} KB`:undefined,
            status:result.status.description
        };
    })
    console.log(detailsResults)

    return res.json(new ApiResponse({
        message: "Success",
        data:{
            testCases:detailsResults,
            status:isAllPassed?"ACCEPTED":"REJECTED"
        },
        statusCode:200
    }))
})
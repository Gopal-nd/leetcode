import express from 'express'
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cors from 'cors'
import type { Request, Response, NextFunction } from "express";

import problemsRoute from './routes/problems.router'
import executeCodeRoute from './routes/execute-code.router'

import { auth } from "../auth";
import errorHandler from './middleware/error.middleware';
import {  userAuth } from './middleware/auth.middleware';

const app = express()
const port = process.env.PORT!

app.use(
  cors({
    origin: process.env.FRONTEND_URL!, 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true, 
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth)); 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/api/me", async (req, res) => {
 	const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
	return res.json(session);
});

app.use("/api/v1/problems", problemsRoute)
app.use("/api/v1/execute-code", executeCodeRoute)



app.get("/", async (req, res) => {
  res.send(`${process.env.FRONTEND_URL}`)
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(' Error:', err.message || err);
	errorHandler(err, req, res, next);

});

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})
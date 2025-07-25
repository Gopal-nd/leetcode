import express from 'express'
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cors from 'cors'

import { auth } from "../auth";

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

app.get("/api/me", async (req, res) => {
 	const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
	return res.json(session);
});

app.get("/", async (req, res) => {
  res.send(`${process.env.FRONTEND_URL}`)
})


app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})
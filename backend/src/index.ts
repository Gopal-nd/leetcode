import express from "express";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cors from "cors";
import type { Request, Response, NextFunction } from "express";

import problemsRoute from "./routes/problems.router";
import executeCodeRoute from "./routes/execute-code.router";
import submissionsRoute from "./routes/submissions.router";
import playlistsRoute from "./routes/playlist.router";
import heatmapRoute from "./routes/heatmap.router";
import http from "http";
import * as Y from "yjs";
import { Server } from "socket.io";

import { auth } from "../auth";
import errorHandler from "./middleware/error.middleware";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL!],
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
  pingTimeout: 60000,
  pingInterval: 25000,
});

// const PORT = process.env.PORT || 8000

app.use(
  cors({
    origin: process.env.FRONTEND_URL!,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

app.use("/api/v1/problems", problemsRoute);
app.use("/api/v1/execute-code", executeCodeRoute);
app.use("/api/v1/submissions", submissionsRoute);
app.use("/api/v1/playlists", playlistsRoute);
app.use("/api/v1/heatmap", heatmapRoute);

app.get("/", async (req, res) => {
  res.send(`${process.env.FRONTEND_URL}`);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(" Error:", err.message || err);
  errorHandler(err, req, res, next);
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    activeRooms: docs.size,
    totalConnections: io.engine.clientsCount,
  });
});

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "Server running", rooms: docs.size });
});

const docs = new Map();
const roomUsers = new Map();

io.on("connection", (socket) => {
  let currentRoom: any = null;

  socket.on("join-room", (roomName) => {
    currentRoom = roomName;
    socket.join(roomName);

    if (!roomUsers.has(roomName)) {
      roomUsers.set(roomName, new Set());
    }
    roomUsers.get(roomName).add(socket.id);

    if (!docs.has(roomName)) {
      docs.set(roomName, new Y.Doc());
    }

    const doc = docs.get(roomName);

    const state = Y.encodeStateAsUpdate(doc);
    socket.emit("init-document", Array.from(state));

    const userCount = roomUsers.get(roomName).size;
    io.to(roomName).emit("user-count", userCount);
  });

  socket.on("document-update", (update) => {
    if (!currentRoom) {
      return;
    }

    const doc = docs.get(currentRoom);
    if (doc) {
      Y.applyUpdate(doc, new Uint8Array(update));

      socket.to(currentRoom).emit("document-update", Array.from(update));
    }
  });

  socket.on("disconnect", () => {
    if (currentRoom && roomUsers.has(currentRoom)) {
      roomUsers.get(currentRoom).delete(socket.id);
      const userCount = roomUsers.get(currentRoom).size;

      io.to(currentRoom).emit("user-count", userCount);

      if (userCount === 0) {
        roomUsers.delete(currentRoom);
        if (docs.has(currentRoom)) {
          docs.get(currentRoom).destroy();
          docs.delete(currentRoom);
        }
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🔌 WebSocket ready for connections`);
});

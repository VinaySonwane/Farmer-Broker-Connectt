// import express, { Application, Request, Response } from "express";
// import "dotenv/config";
// import connectDB from "./db/connect.js";
// import cors, { CorsOptions } from "cors";
// import path from "path";

// import { fileURLToPath } from "url";

// //For chatting
// import { createServer } from "http";
// import { Server } from "socket.io";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// //Routes
// import userRoutes from "./routes/userRoutes.js";
// import vegetableListingRoutes from "./routes/vegetableListingRoutes.js";
// import offerRoutes from "./routes/offerRoutes.js";

// const app: Application = express();
// connectDB();

// //for chatting
// const httpServer = createServer(app); // wrap express with HTTP server
// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:3000", // your frontend URL
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });
// //end

// app.use(express.json()); // Parses incoming JSON requests
// app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://your-frontend-domain.com",
// ]; // Replace with your actual frontend origin(s)

// const corsOptions: CorsOptions = {
//   origin: (origin, callback) => {
//     if (origin && allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else if (!origin) {
//       // Allow requests with no origin (like mobile apps or server-to-server)
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };

// app.use(cors(corsOptions));

// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/vegetable-listings", vegetableListingRoutes);
// app.use("/api/offers", offerRoutes);
// app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// //Chatting code
// // SOCKET.IO CHAT HANDLER
// io.on("connection", (socket) => {
//   console.log("🟢 New client connected:", socket.id);

//   socket.on("joinRoom", ({ roomId }) => {
//     socket.join(roomId);
//     console.log(`Socket ${socket.id} joined room ${roomId}`);
//   });

//   socket.on("sendMessage", ({ roomId, sender, message }) => {
//     io.to(roomId).emit("receiveMessage", {
//       sender,
//       message,
//       timestamp: new Date(),
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log("🔴 Client disconnected:", socket.id);
//   });
// });

// //end

// const PORT = process.env.PORT || 8080;
// // app.listen(PORT, () => {
// //   console.log(`🚀server running at port ${PORT}`);
// // });
// httpServer.listen(PORT, () => {
//   console.log(`🚀 Server running at port ${PORT}`);
// });

// server.ts
import express, { Application } from "express";
import "dotenv/config";
import connectDB from "./db/connect.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";

// Init
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app: Application = express();
const httpServer = createServer(app); // 👈 IMPORTANT
connectDB();

// Routes
import userRoutes from "./routes/userRoutes.js";
import vegetableListingRoutes from "./routes/vegetableListingRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import Message from "./models/MessageModel.js";
import messageRoutes from "./routes/messageRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import dealRoutes from "./routes/dealRoutes.js";

const allowedOrigins = [
  "http://localhost:3000", // for development
  "https://farmer-broker-connectt-j5ig.vercel.app", // your Vercel frontend domain
];

// CORS
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/vegetable-listings", vegetableListingRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/deals", dealRoutes);
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// ⚡️ Socket.IO Setup
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  //console.log("✅ Socket connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId); // Join personal room
    // console.log(`🔗 Socket ${socket.id} joined room: ${userId}`);
  });

  socket.on("sendMessage", async ({ sender, recipient, text }) => {
    // console.log("📩 Message received on server:", { sender, recipient, text });

    try {
      // Save to MongoDB
      await Message.create({
        sender,
        recipient,
        text,
        timestamp: new Date(),
      });
    } catch (err) {
      console.error("❌ Error saving message to DB:", err);
    }

    // Emit to recipient's room
    io.to(recipient).emit("receiveMessage", {
      sender,
      recipient,
      text,
      timestamp: new Date(),
    });
  });

  socket.on("disconnect", () => {
    // console.log("❌ Socket disconnected:", socket.id);
  });
});

// 🔥 Start server
const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

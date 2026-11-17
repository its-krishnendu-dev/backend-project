import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Create Express app
const app = express();

// Allow frontend to connect with backend
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Read JSON data from request body
app.use(express.json({ limit: "20kb" }));

// Read form data from request body
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

// Serve static files from public folder
app.use(express.static("public"));

// Read cookies from request
app.use(cookieParser());

// routes import
import userRouter from './routes/user.routes.js'

// routes declaration
app.use('/api/v1/users', userRouter)

// Export app for use in index.js
export { app };

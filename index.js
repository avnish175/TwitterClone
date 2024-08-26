import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import tweetRoute from "./routes/tweetRoute.js";
import cors from "cors";
import path from "path";

dotenv.config({
  path: ".env",
});
databaseConnection();
const app = express();

// middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
// };
// app.use(cors(corsOptions));

// Serve static files from the React app
const __dirname = path.resolve(); // If using ES6 modules, you need to resolve __dirname
app.use(express.static(path.join(__dirname, "build")));

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/tweet", tweetRoute);

// Catch-all route to serve the frontend build
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});

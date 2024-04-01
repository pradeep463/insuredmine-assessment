import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import { DB_URL, PORT } from "./configs/ENV";
// import { logger } from "./middleware/logger";
import cors from "cors";
import fs from "fs";
import { allRoutes } from "./routes/allRoutes";
import { checkCpuUsage } from "./utils/cpuUsage";

const app: Express = express();

const isExistUploadDirectory = (req: Request, res: Response, next: any) => {
  const uploadsDir = "./uploads";
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }
  next();
};

app.use(isExistUploadDirectory);

// const storage = multer.diskStorage({
//   destination: function (req: any, file: any, cb: any) {
//     cb(null, "uploads/");
//   },
//   filename: function (req: any, file: any, cb: any) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

allRoutes.forEach((route) => {
  if (route.method === "GET") {
    app.get(route.path, route.handler);
  } else if (route.method === "POST" && route.isFileUpload) {
    // app.post(route.path, upload.any(), route.handler);
  } else if (route.method === "POST") {
    app.post(route.path, route.handler);
  } else if (route.method === "DELETE") {
    app.delete(route.path, route.handler);
  } else if (route.method === "PUT") {
    app.put(route.path, route.handler);
  }
});

// set up Database connection

mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to Mongo"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

app.listen(PORT, () => {
  console.log(`[server]: Server is running at ${PORT}`);
});

// Task 2 : Check CPU usage every minute if its more than 70% restart the server
// setInterval(checkCpuUsage,1000 * 60)

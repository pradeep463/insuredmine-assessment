import { Request, Response } from "express";
import { Worker, workerData, isMainThread } from "worker_threads";
import path from "path";
import { processFile } from "../../configs/globalFunction";
import { TaskRunner } from "concurrent-tasks";
const runner = new TaskRunner();

const helloWO = (file: any) => {
  console.log("dsa", file);
};
export async function uploadCsv(req: any, res: Response) {
  try {
    const files: any = req.files || [];
    runner.addMultiple(helloWO('dsa'));

    if (files.length > 0) {
      return res.json({
        status: true,
        message: "Data Inserting...",
        date: new Date(),
      });

      // worker.on("message", (result) => {
      //   console.log("Worker result:", result);
      // });

      // worker.on("error", (err) => {
      //   console.error("Worker error:", err);
      // });

      // worker.on("exit", (code) => {
      //   console.log("Worker exited with code:", code);
      // });
    } else {
      return res.status(400).send({
        status: false,
        message: "No files were uploaded.",
        date: new Date(),
      });
    }
  } catch (error: any) {
    res.json({
      status: false,
      message: error.toString(),
      date: new Date(),
    });
  }
}

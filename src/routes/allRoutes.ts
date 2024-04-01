import { Request, Response } from "express";
import { scheduledInsert } from "../controllers/task-2/schedule-insert";
import { test } from "../controllers/testController";

interface Route {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  isFileUpload: boolean;
  handler: (req: Request, res: Response) => void;
}
export const allRoutes: Route[] = [
  { method: "GET", isFileUpload: false, path: "/", handler: test },
  {
    method: "POST",
    isFileUpload: false,
    path: "/api/v1/task-2/scheduled-insert",
    handler: scheduledInsert,
  },
];

import { Request, Response } from "express";
import { scheduledInsert } from "../controllers/task-2/schedule-insert";
import { test } from "../controllers/testController";
import {
  uploadCsv,
  getPolicyByUserName,
  getUsersPolicies,
} from "../controllers/task-1/insurance";

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
  {
    method: "POST",
    isFileUpload: true,
    path: "/api/v1/task-1/upload-csv",
    handler: uploadCsv,
  },
  {
    method: "GET",
    isFileUpload: false,
    path: "/api/v1/task-1/get-policy-by-username",
    handler: getPolicyByUserName,
  },
  {
    method: "GET",
    isFileUpload: false,
    path: "/api/v1/task-1/get-users-policies",
    handler: getUsersPolicies,
  },
];

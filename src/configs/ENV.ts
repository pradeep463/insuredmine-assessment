import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 8000;
export const DB_URL = process.env.DB_URL || "";
export const CPU_RESTART_PER: number = parseInt(
  process.env.CPU_RESTART_PER || "70"
);
export const MODE = process.env.MODE || "localhost";
export const FILE_BASE_URL =
  MODE === "localhost" ? `http://localhost:${PORT}/` : "";

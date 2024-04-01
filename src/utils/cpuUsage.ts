import * as osu from "node-os-utils";
import { exec } from "child_process";
import { CPU_RESTART_PER } from "../configs/ENV";

const cpu = osu.cpu;

/**
 * Function to check CPU usage and restart the server if it exceeds the 70% limit.
 */

export const checkCpuUsage = () => {
  cpu.usage().then((cpuPercentage: number) => {
    console.log(cpuPercentage);
    if (cpuPercentage > CPU_RESTART_PER) restartServer();
  });
};

/**
 * Function to restart the server.
 */

const restartServer = () => {
  exec("ls -l", (error, stdout, stderr) => {
    // Executing shell command, This is for testing change that to `pm2 restart src/index.ts` working
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
};

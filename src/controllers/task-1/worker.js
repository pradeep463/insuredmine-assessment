const { workerData, parentPort } = require('worker_threads');
const globalFunction = require('../../configs/globalFunction.ts'); // Adjust the path as needed

const { file, functionName } = workerData;

// Dynamically call the function by name
const taskResults = globalFunction[functionName](file);

// Send task results back to the main thread
parentPort.postMessage(taskResults);
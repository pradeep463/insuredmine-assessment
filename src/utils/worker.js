

const { Worker, isMainThread, workerData } = require('worker_threads');


if (!isMainThread) {
  const filePath = workerData;
console.log(filePath)
  // Parse the file, extract data, and save to MongoDB
  // Example:
  // const data = parseFile(filePath);
  // saveToMongoDB(data);
}
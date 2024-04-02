import { Request, Response } from "express";
import { Worker, workerData, isMainThread } from "worker_threads";
import path from "path";
import csvtojson from "csvtojson";

const processFile = async (file: any) => {
  const workerScriptPath = path.join(__dirname, "..", "..", "..", file.path);
  const csvData = await csvtojson().fromFile(workerScriptPath);

  for (let index = 0; index < csvData.length; index++) {
    const data = csvData[index];

    const agentData = {
      name: data.agent,
    };

    const userData = {
      firstName: data.firstname,
      dob: data.dob,
      address: data.address,
      phone: data.phone,
      state: data.state,
      zipCode: data.zip,
      email: data.email,
      gender: data.gender,
      userType: data.userType,
    };

    const userAccountData = {
      accountName: data.account_name,
    };

    const policyCategoryData = {
      categoryName: data.category_name,
    };

    const policyCarrierData = {
      companyName: data.company_name,
    };

    const policyInfoData = {
      policyNumber: data.policy_number,
      policyStartDate: data.policy_start_date,
      policyEndDate: data.policy_end_date,
      policyCategoryCollectionId: "", // You may need to fetch these values from other sources
      companyCollectionId: "", // You may need to fetch these values from other sources
      userId: "", // You may need to fetch these values from other sources
    };

    return {
      agentData,
      userData,
      userAccountData,
      policyCategoryData,
      policyCarrierData,
      policyInfoData,
    };
  }
};

export async function uploadCsv(req: any, res: Response) {
  try {
    const files: any = req.files || [];

    if (files.length > 0) {
      const workerScriptPath = path.join(
        __dirname,
        "..",
        "..",
        "/utils/worker.js"
      );
      new Worker(workerScriptPath, {
        workerData: {
          from: "INSURE-UPLOAD-CSV",
          fileData: files[0],
        },
      });

      return res.json({
        a: await processFile(files[0]),
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

import { getDayOfWeek } from "../helpers/timings";
import {
  IScheduledInsert,
  ScheduledInsertModel,
} from "../models/Schedule-insert";
import { scheduleJob } from "node-schedule";

import csvtojson from "csvtojson";
import fs from "fs";
import { AgentModel } from "../models/insurace/Agent";
import { UsersModel } from "../models/insurace/Users";
import { AccountsModel } from "../models/insurace/Accounts";
import { CategoryModel } from "../models/insurace/Category";
import { CompanyModel } from "../models/insurace/Company";
import { PolicyInfoModel } from "../models/insurace/PolicyInfo";
import mongoose from "mongoose";
import path from "path";

export const scheduledInsertFun = async (data: any) => {
  const { day, time } = data;
  const [hours, minutes] = time.split(":").map(Number);
  const dayOfWeek = getDayOfWeek(day);
  const scheduledTime = new Date();
  scheduledTime.setDate(
    scheduledTime.getDate() + ((dayOfWeek - scheduledTime.getDay() + 7) % 7)
  );
  scheduledTime.setHours(hours);
  scheduledTime.setMinutes(minutes);

  scheduleJob(scheduledTime, async function () {
    const scheduledData: IScheduledInsert = await new ScheduledInsertModel({
      message: data.message,
      day: data.day,
      time: data.time,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
    await scheduledData.save();
  });
  return true;
};

export const processFile = async (file: any) => {
  const date = new Date();
  const workerScriptPath = path.join(__dirname, "..", "..", file.path);

  try {
    console.log(fs.existsSync(workerScriptPath));
    // const csvData = await csvtojson().fromFile(workerScriptPath);
    // console.log(csvData);
  } catch (error) {
    console.error("Error reading CSV file:", error);
  }

  // console.log(workerScriptPath);
  // const csvData = await csvtojson().fromFile(workerScriptPath);

  // console.log(csvData);
  return true;

  // for (let index = 0; index < csvData.length; index++) {
  //   const data = csvData[index];
  //   console.log(data);
  //   return data;
  //   const savedAgentData = await AgentModel.findOneAndUpdate(
  //     { name: data.agent },
  //     { $setOnInsert: { status: 1, createdAt: date, updatedAt: date } },
  //     { upsert: true, new: true }
  //   );

  //   await AccountsModel.findOneAndUpdate(
  //     { name: data.account_name },
  //     { $setOnInsert: { status: 1, createdAt: date, updatedAt: date } },
  //     { upsert: true, new: true }
  //   );
  //   const categorySavedData = await CategoryModel.findOneAndUpdate(
  //     { name: data.category_name },
  //     { $setOnInsert: { status: 1, createdAt: date, updatedAt: date } },
  //     { upsert: true, new: true }
  //   );

  //   const companySavedData = await CompanyModel.findOneAndUpdate(
  //     { name: data.company_name },
  //     { $setOnInsert: { status: 1, createdAt: date, updatedAt: date } },
  //     { upsert: true, new: true }
  //   );

  //   const savedUserData = await UsersModel.findOneAndUpdate(
  //     {
  //       $or: [{ phone: data.phone }, { email: data.email }],
  //     },
  //     {
  //       $setOnInsert: {
  //         firstName: data.firstname,
  //         dob: data.dob,
  //         address: data.address,
  //         phone: data.phone,
  //         state: data.state,
  //         zipCode: data.zip,
  //         email: data.email,
  //         gender: data.gender,
  //         userType: data.userType,
  //         status: 1,
  //         createdAt: date,
  //         updatedAt: date,
  //       },
  //     },
  //     { upsert: true, new: true }
  //   );

  //   await PolicyInfoModel.findOneAndUpdate(
  //     { policyNumber: data.policy_number },
  //     {
  //       $setOnInsert: {
  //         policyNumber: data.policy_number,
  //         policyStartDate: data.policy_start_date,
  //         policyEndDate: data.policy_end_date,
  //         policyCategoryId: new mongoose.Types.ObjectId(categorySavedData?._id),
  //         companyId: new mongoose.Types.ObjectId(companySavedData?._id),
  //         userId: new mongoose.Types.ObjectId(savedUserData?._id),
  //         agentId: new mongoose.Types.ObjectId(savedAgentData?._id),
  //         status: 1,
  //         createdAt: date,
  //         updatedAt: date,
  //       },
  //     },
  //     { upsert: true, new: true }
  //   );

  //   return;
  // }
};


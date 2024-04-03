import { Request, Response } from "express";
import { TaskRunner } from "concurrent-tasks";

import { processFile } from "../../configs/globalFunction";
import { PolicyInfoModel } from "../../models/insurance/PolicyInfo";
const runner = new TaskRunner();
function generateTasks(file: any) {
  processFile(file);
  return [];
}

export async function uploadCsv(req: Request, res: Response) {
  try {
    const files: any = req.files || [];

    if (files.length > 0) {
      runner.addMultiple(generateTasks(files[0]));
      return res.json({
        status: true,
        message: "Data Inserting...",
        date: new Date(),
      });
    } else {
      return res.status(400).send({
        status: false,
        message: "No files were uploaded.",
        date: new Date(),
      });
    }
  } catch (error: any) {
    console.error("Error in uploadCsv:", error);
    res.status(500).json({
      status: false,
      message: error.toString(),
      date: new Date(),
    });
  }
}

export const getPolicyByUserName = async (req: Request, res: Response) => {
  try {
    const search = req?.query?.search || "";
    const cursor = req?.query?.cursor || "";
    const limit = req?.query?.limit || "";
    let query: any = {
      status: 1,
    };

    if (search) {
      query = {
        ...query,
        "user.firstName": {
          $regex: search,
          $options: "i",
        },
      };
    }

    const policies = await PolicyInfoModel.aggregate([
      {
        $lookup: {
          from: "agents",
          localField: "agentId",
          foreignField: "_id",
          as: "agent",
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "companyId",
          foreignField: "_id",
          as: "company",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "policyCategoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $addFields: {
          agent: { $arrayElemAt: ["$agent", 0] },
          company: { $arrayElemAt: ["$company", 0] },
          policyCategory: { $arrayElemAt: ["$category", 0] },
          user: { $arrayElemAt: ["$user", 0] },
        },
      },
      { $match: query },
      { $limit: 10 },
    ]);

    return res.json({
      status: true,
      message: "",
      pagination: {
        cursor: policies.length ? policies[policies.length - 1]["_id"] : null,
      },
      data: policies,
      date: new Date(),
    });
  } catch (error: any) {
    console.error("Error in uploadCsv:", error);
    res.status(500).json({
      status: false,
      message: error.toString(),
      date: new Date(),
    });
  }
};

export const getUsersPolicies = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search || "";

    let query: any = {};

    if (search) {
      query = {
        ...query,
        "user.firstName": {
          $regex: search,
          $options: "i",
        },
      };
    }

    const skip = (page - 1) * limit;

    const aggregationPipeline = [
      {
        $group: {
          _id: "$userId",
          totalPolicies: { $sum: 1 },
          totalPremium: { $sum: "$premium" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },

      {
        $project: {
          _id: 0,
          user: { $arrayElemAt: ["$user", 0] },
          totalPolicies: 1,
          totalPremium: 1,
          averagePremium: 1,
        },
      },
      { $match: query },
      { $skip: skip },
      { $limit: limit },
    ];

    const policies = await PolicyInfoModel.aggregate(aggregationPipeline);

    return res.json({
      status: true,
      message: "",
      data: policies,
      date: new Date(),
    });
  } catch (error: any) {
    console.error("Error in uploadCsv:", error);
    res.status(500).json({
      status: false,
      message: error.toString(),
      date: new Date(),
    });
  }
};

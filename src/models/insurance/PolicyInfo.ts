import mongoose, { Document, Schema } from "mongoose";

export interface IPolicyInfo extends Document {
  policyNumber: string;
  policyStartDate: Date;
  policyEndDate: Date;
  policyCategoryId: string;
  companyId: string;
  userId: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}

const policyInfoSchema: Schema = new Schema({
  policyNumber: {
    type: String,
    required: true,
  },
  policyStartDate: {
    type: Date,
    required: true,
  },
  policyEndDate: {
    type: Date,
    required: true,
  },
  policyCategoryId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  agentId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
    },
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

export const PolicyInfoModel = mongoose.model<IPolicyInfo>(
  "PolicyInfo",
  policyInfoSchema
);

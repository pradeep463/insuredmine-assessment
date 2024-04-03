import mongoose, { Document, Schema } from "mongoose";

export interface ICompany extends Document {
  name: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}

const companySchema: Schema = new Schema({
  name: {
    type: String,
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

export const CompanyModel = mongoose.model<ICompany>(
  "company",
  companySchema
);

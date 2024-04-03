import mongoose, { Document, Schema } from "mongoose";

export interface IAccount extends Document {
  name: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}

const accountSchema: Schema = new Schema({
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

export const AccountsModel = mongoose.model<IAccount>(
  "Account",
  accountSchema
);

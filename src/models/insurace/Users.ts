import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  dob: Date;
  address: string;
  phone: string;
  state: string;
  zipCode: string;
  email: string;
  gender: string;
  userType: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  userType: {
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

export const UsersModel = mongoose.model<IUser>("Users", userSchema);

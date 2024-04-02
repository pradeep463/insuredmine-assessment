import mongoose, { Document, Schema } from "mongoose";

export interface IScheduledInsert extends Document {
  message: string;
  day: string;
  time: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}

const scheduledInsertSchema: Schema = new Schema({
  message: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  time: {
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

export const ScheduledInsertModel = mongoose.model<IScheduledInsert>(
  "ScheduledInsert",
  scheduledInsertSchema
);

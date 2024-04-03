import mongoose, { Document, Schema } from "mongoose";

export interface IAgent extends Document {
  name: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}

const agentSchema: Schema = new Schema({
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

export const AgentModel = mongoose.model<IAgent>("Agents", agentSchema);

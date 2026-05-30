import mongoose from "mongoose";

const aiLogSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const AILog = mongoose.models.AILog || mongoose.model("AILog", aiLogSchema);

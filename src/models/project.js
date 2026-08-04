import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    code: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true },
);

export default mongoose.models.Project || mongoose.model("Project", projectSchema);

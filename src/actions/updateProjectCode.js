"use server";
import { currentUser } from "@clerk/nextjs/server";
import Project from "@/models/project";

export async function updateProjectCode(projectId, files) {
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return JSON.parse(
        JSON.stringify({ success: true, message: "Project not found" }),
      );
    }
    project.code = files;
    await project.save();
    return JSON.parse(
      JSON.stringify({ success: true, message: "Saved Changes" }),
    );
  } catch (e) {
    return JSON.parse(
      JSON.stringify({ success: false, message: "Failed to save changes" }),
    );
  }
}

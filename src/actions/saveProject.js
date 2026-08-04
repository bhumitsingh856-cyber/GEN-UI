"use server";
import { currentUser } from "@clerk/nextjs/server";
import User from "@/models/user";
import Project from "@/models/project";

export async function saveProject({ files, prompt }) {
  const clerkUser = await currentUser();
  if (!clerkUser) return { success: false, message: "Not authenticated" };

  const user = await User.findOne({ clerkID: clerkUser.id });
  if (!user)
    return JSON.parse(
      JSON.stringify({ success: false, message: "User not found" }),
    );

  const newProject = new Project({
    prompt: prompt || "Generated project",
    user: user._id,
    code: files || {},
  });
  await newProject.save();
  user.projects.push(newProject._id);
  await user.save();
  return JSON.parse(JSON.stringify({ success: true, project: newProject }));
}

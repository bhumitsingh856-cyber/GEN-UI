"use server";
import { currentUser } from "@clerk/nextjs/server";
import user from "@/models/user";
import { auth } from '@clerk/nextjs/server'
export async function getProjects() {
    const { userId } = await auth.protect()
  const clerkUser = await currentUser();
  const userData = await user
    .findOne({ clerkID: clerkUser.id })
    .populate("projects");
  return JSON.parse(
    JSON.stringify({ success: true, projects: userData.projects }),
  );
}

"use server";
import connectDB from "@/db/db";
import user from "@/models/user";

export async function createUser(clerkID, email, name) {
  try {
    await connectDB();
    const existingUser = await user.findOne({ clerkID });
    if (existingUser) {
      return;
    }
    const newUser = new user({ clerkID, email, name, projects: [] });
    await newUser.save();
    return { success: true, message: "User created successfully" };
  } catch (e) {
    return { success: false, message: "Error creating user" };
  }
}

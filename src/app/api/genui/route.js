import { NextResponse } from "next/server";
import Gen from "@/services/Gen";
export async function POST(Request) {
  const { prompt } = await Request.json();
  console.log("prompt : ", prompt);
  try {
    const res = await Gen(prompt);
    return NextResponse.json({ success: true, res });
  } catch (e) {
    return NextResponse.json({ success: false });
  }
}

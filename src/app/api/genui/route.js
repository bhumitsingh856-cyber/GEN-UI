import { NextResponse } from "next/server";
import Gen from "@/services/Gen";
import { enhance } from "@/services/enhance";

export async function POST(Request) {
  const { prompt } = await Request.json(); 
  try {
    const enhanced = await enhance(prompt);
    const res = await Gen(enhanced);
    return NextResponse.json({ success: true, res });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ success: false });
  }
}

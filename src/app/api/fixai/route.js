import { NextResponse } from "next/server";
import { Fix } from "@/services/Fix";
export async function POST(Request) {
  const err = await Request.json();
  try {
    const res = await Fix(err);
    return NextResponse.json(res);
  } catch (e) {
    return NextResponse.json({ success: false });
  }
}

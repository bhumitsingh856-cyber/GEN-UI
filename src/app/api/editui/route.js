import { NextResponse } from "next/server";
import { UpdateFile } from "@/services/Update";

export async function POST(Request) {
  try {
    const { filePath, currentCode, instruction, mentionedFiles } =
      await Request.json();

    if (!filePath || !currentCode || !instruction) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }
    // console.log({ filePath, currentCode, instruction, mentionedFiles });

    const result = await UpdateFile({
      filePath,
      currentCode,
      instruction,
      mentionedFiles,
    });
    return NextResponse.json({ success: true, code: result.code });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import Gen from "@/services/Gen";
import { promptEnhancer } from "@/services/LLM";
import { enhancedPrompt } from "@/services/SystemPrompt";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
export async function POST(Request) {
  const { prompt } = await Request.json();
  try {
    let data = "";
    const prompt2 = await promptEnhancer.invoke([
      new SystemMessage(enhancedPrompt),
      new HumanMessage(prompt),
    ]);

    data = prompt2.content;
    if (!data) {
      data = prompt;
    }
    const res = await Gen(data);
    return NextResponse.json({ success: true, res });
  } catch (e) {
    return NextResponse.json({ success: false });
  }
}

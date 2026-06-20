import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import SystemPrompt from "./SystemPrompt";
import { JsonOutputParser } from "@langchain/core/output_parsers";

export default async function test(prompt) {
  console.log("Gemini called")
  try {
    const parser = new JsonOutputParser();

    const llm = new ChatGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
      model: "gemini-2.5-flash",
    });
    const res = await llm.invoke([
      {
        role: "system",
        content: SystemPrompt,
      },
      {
        role: "user",
        content: prompt,
      },
    ]);
    console.log(res);
    const parsed = await parser.parse(res.content);
    return parsed;
  } catch (err) {
    console.log(err);
  }
}

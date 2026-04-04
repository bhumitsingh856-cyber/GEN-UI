import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { SystemPrompt } from "./SystemPrompt";
import { JsonOutputParser } from "@langchain/core/output_parsers";

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
      content: "mini calculator",
    },
  ]);
  console.log(res);
  const parsed = await parser.parse(res.content);
  console.log(parsed);
} catch (err) {
  console.log(err);
}

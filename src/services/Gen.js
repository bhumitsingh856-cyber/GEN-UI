import OpenAI from "openai";
import SystemPrompt from "./SystemPrompt.js";
import { JsonOutputParser } from "@langchain/core/output_parsers";

const parser = new JsonOutputParser();
const client = new OpenAI({
  apiKey: process.env.FIREWORKS_API_KEY,
  baseURL: "https://api.fireworks.ai/inference/v1",
});

export default async function Gen(prompt) {
  try {
    const stream = await client.chat.completions.create({
      max_completion_tokens: 32768,
      temperature: 1,
      model: "accounts/fireworks/models/deepseek-v4-flash",
      messages: [
        { role: "system", content: SystemPrompt },
        { role: "user", content: prompt },
      ],
    });
    return await parser.parse(stream.choices[0].message.content);
  } catch (e) {
    console.error("Error during streaming:", e);
    return null;
  }
}    
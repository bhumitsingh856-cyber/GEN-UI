import OpenAI from "openai";
import SystemPrompt from "./SystemPrompt.js";
import { JsonOutputParser } from "@langchain/core/output_parsers";

const parser = new JsonOutputParser();
const client = new OpenAI({
  apiKey: process.env.FIREWORKS_API_KEY,
  baseURL: "https://api.fireworks.ai/inference/v1",
});

export default async function Gen(prompt) {
  console.log("Generation started...\n");
  try {
    const stream = await client.chat.completions.create({
      max_completion_tokens: 32768,
      temperature: 1,
      model: "accounts/fireworks/models/kimi-k2p5",
      messages: [
        { role: "system", content: SystemPrompt },
        { role: "user", content: prompt },
      ],
      stream: true, // 1. Enable streaming
    });

    let fullContent = "";

    // 2. Iterate over the stream chunks
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      fullContent += content;
      
      // 3. Write to console without a newline to simulate real-time typing
      process.stdout.write(content); 
    }

    console.log("\n\n--- Generation Finished ---");
    
    // 4. Parse the full accumulated string at the end
    return await parser.parse(fullContent);
    
  } catch (e) {
    console.error("\nError during streaming:", e);
    return null;
  }
} 
import { SystemPrompt } from "./SystemPrompt.js";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { CodeGenerationLLM } from "./LLM.js";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
const parser = new JsonOutputParser();

export default async function Gen(prompt) {
  try {
    const res = await CodeGenerationLLM.invoke([
      new SystemMessage(SystemPrompt),
      new HumanMessage(prompt),
    ]);
    return await parser.parse(res.content);
  } catch (e) {
    console.error("Error during streaming:", e);
    return null;
  }
}

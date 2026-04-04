import FixerLLM from "./LLM.js";
import { FixSystemPrompt } from "./FixSystemPrompt.js";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
export async function Fix(component) {
  const res = await FixerLLM.invoke([
    new SystemMessage(FixSystemPrompt),
    new HumanMessage(JSON.stringify(component)),
  ]);
  return JSON.parse(res.content);
}

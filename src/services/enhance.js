import { promptEnhancer } from "./LLM";
import { enhancedPrompt } from "./SystemPrompt";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export async function enhance(prompt) {
  try {
    const prompt2 = await promptEnhancer.invoke([
      new SystemMessage(enhancedPrompt),
      new HumanMessage(prompt),
    ]);
    if (!prompt2.content) {
      return prompt;
    }
    return prompt2.content;
  } catch (e) {
    return prompt;
  }
}

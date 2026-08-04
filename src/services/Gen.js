import { SystemPrompt } from "./SystemPrompt.js";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { CodeGenerationLLM } from "./LLM.js";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
const parser = new JsonOutputParser();

export default async function Gen(prompt) {
  let ui = {};
  try {
    console.log(prompt);
    const res = await CodeGenerationLLM.invoke([
      new SystemMessage(SystemPrompt),
      new HumanMessage(prompt),
    ]);
    ui = res.content;
    return await parser.parse(ui);
  } catch (e) {
    console.log("error in gen", e);
    return ui;
  }
}

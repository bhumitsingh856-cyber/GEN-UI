import { CodeUpdateLLM } from "./LLM.js";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { JsonOutputParser } from "@langchain/core/output_parsers";
const parser = new JsonOutputParser();
const UpdateSystemPrompt = `
You are a senior React developer. Edit a specific file based on the user's instruction.

## INPUT
- filePath: path of the file to edit
- currentCode: current code of that file  
- instruction: what the user wants to change
- mentionedFiles: (optional) additional files for context

## OUTPUT
Return ONLY a raw JSON object:
{ "code": "the full updated file code" }

- NO markdown, NO explanations, NO prose
- Return the COMPLETE updated file
- Must pass JSON.parse()

## RULES
- Preserve all existing imports unless instructed
- Keep code functional and correct
- Do not stub or truncate any code
`;

export async function UpdateFile({
  filePath,
  currentCode,
  instruction,
  mentionedFiles,
}) {
  const res = await CodeUpdateLLM.invoke([
    new SystemMessage(UpdateSystemPrompt),
    new HumanMessage(
      JSON.stringify({
        filePath,
        currentCode,
        instruction,
        mentionedFiles: mentionedFiles || {},
      }),
    ),
  ]);

  return parser.parse(res.content);
}

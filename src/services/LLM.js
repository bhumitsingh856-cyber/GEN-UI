import { ChatGroq } from "@langchain/groq";
import { ChatFireworks } from "@langchain/fireworks";

const FixerLLM = new ChatGroq({
  apiKey: process.env.GROQ_API,
  model: "llama-3.3-70b-versatile",
});
const promptEnhancer = new ChatGroq({
  apiKey: process.env.GROQ_API,
  model: "openai/gpt-oss-20b", 
});

const CodeGenerationLLM = new ChatFireworks({
  apiKey: process.env.FIREWORKS_API_KEY,
  max_tokens: 131072,
  model: "accounts/fireworks/models/deepseek-v4-flash",
});

const CodeUpdateLLM = new ChatGroq({
  apiKey: process.env.GROQ_API,
  model: "openai/gpt-oss-120b",
});



export { FixerLLM, promptEnhancer, CodeGenerationLLM, CodeUpdateLLM };

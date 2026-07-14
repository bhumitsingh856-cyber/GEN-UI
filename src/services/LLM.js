import { ChatGroq } from "@langchain/groq";
import { ChatFireworks } from "@langchain/fireworks";

const FixerLLM = new ChatGroq({
  apiKey: process.env.GROQ_API,
  model: "llama-3.3-70b-versatile",
});
const promptEnhancer = new ChatGroq({
  apiKey: process.env.GROQ_API,
  model: "llama-3.3-70b-versatile",
});

const CodeGenerationLLM = new ChatFireworks({
  apiKey: process.env.FIREWORKS_API_KEY,
  model: "accounts/fireworks/models/deepseek-v4-flash",
}); 
export { FixerLLM, promptEnhancer, CodeGenerationLLM };

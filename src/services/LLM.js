import { ChatGroq } from "@langchain/groq";

const FixerLLM = new ChatGroq({
  apiKey: process.env.GROQ_API,
  model: "moonshotai/kimi-k2-instruct",
});

export default FixerLLM;

// const OPENAI_API_KEY = "sk-xDO0y7ctk5PZGuAIFb417058E37f4b05BeF1E00538E091Bc";
import "dotenv/config";
import { PromptTemplate } from "@langchain/core/prompts";

const greetingPrompt = new PromptTemplate({
  inputVariables: [],
  template: "hello world",
});

try {
  const formattedGreetingPrompt = await greetingPrompt.format();

  console.log(formattedGreetingPrompt, '---formattedGreetingPrompt');
} catch (e) {
  console.log(e, "---e");
}

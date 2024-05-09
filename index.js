const OPENAI_API_KEY = "sk-xDO0y7ctk5PZGuAIFb417058E37f4b05BeF1E00538E091Bc";

import { ChatOpenAI } from "@langchain/openai";

const chatModel = new ChatOpenAI({
  apiKey: OPENAI_API_KEY,
  timeout: 10000,
  configuration: {
    baseURL: "https://gitaigc.com/v1",
    
  },
});

try {
  const result = await chatModel.invoke("what is LangSmith?");
  console.log(result, "---result");
} catch (e) {
  console.log(e, "---e");
}

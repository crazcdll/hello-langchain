// const OPENAI_API_KEY = "sk-xDO0y7ctk5PZGuAIFb417058E37f4b05BeF1E00538E091Bc";
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { HumanMessage } from "@langchain/core/messages";

const chatModel = new ChatOpenAI({
  timeout: 10000,
  configuration: {
    // baseURL: "https://gitaigc.com/v1",
    baseURL: "https://api.deepseek.com/v1",
  },
  model: "deepseek-chat",
});

try {
  const outputPrase = new StringOutputParser();

  const simpleChain = chatModel.pipe(outputPrase);

  const stream = await simpleChain.stream([new HumanMessage("Tell me a joke")]);

  for await (const chunk of stream) {
    console.log(chunk);
  }
} catch (e) {
  console.log(e, "---e");
}

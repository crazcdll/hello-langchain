// const OPENAI_API_KEY = "sk-xDO0y7ctk5PZGuAIFb417058E37f4b05BeF1E00538E091Bc";
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
// import OpenAI from "openai";


const chatModel = new ChatOpenAI({
  timeout: 10000,
  configuration: {
    // baseURL: "https://gitaigc.com/v1",
    baseURL: "https://api.deepseek.com/v1",
  },
  model: 'deepseek-chat'
});

try {
  const result = await chatModel.invoke("what is LangSmith?");
  console.log(result, "---result");
  // const completion = await ChatOpenAI.completions.create({
  //   messages: [{ role: "system", content: "You are a helpful assistant." }],
  //   model: "deepseek-chat",
  // });
  // console.log(completion, '---completion');
} catch (e) {
  console.log(e, "---e");
}

import { load } from "dotenv";
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";

const env = await load();

const process = { env }; // deno 写法需要这么显示使用 env

try {
  const chatModel = new ChatOpenAI({
    timeout: 10000,
    // apiKey: OPENAI_API_KEY, // 或者这么直接传入 apiKey
    configuration: {
      baseURL: "https://gitaigc.com/v1",
      // baseURL: "https://api.deepseek.com/v1",
    },
    // model: "deepseek-chat", // deepseek 需要显示指定模型
  });

  const result = await chatModel.invoke("what is LangSmith?");
  console.log(result, "---result");
} catch (e) {
  console.log(e, "---e");
}

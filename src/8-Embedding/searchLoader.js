import "dotenv/config"; // 加了这行就会加载 .env 文件
import { ChatOpenAI } from "@langchain/openai";
import { SerpAPILoader } from "@langchain/community/document_loaders/web/serpapi";

try {
  const chatModel = new ChatOpenAI({
    timeout: 10000,
    // apiKey: OPENAI_API_KEY, // 或者这么直接传入 apiKey
    configuration: {
      // baseURL: "https://gitaigc.com/v1",
      baseURL: "https://api.deepseek.com/v1",
    },
    model: "deepseek-chat", // deepseek 需要显示指定模型
  });

  // const apiKey = env("SERP_KEY")
  const question = "What is LangChain?";
  const loader = new SerpAPILoader({
    apiKey: process.env.SERP_KEY,
    engine: "google",
    hl: "zh-CN",
    gl: "us",
    q: question,
  });

  const docs = await loader.load();

  console.log(docs, "---docs");

  // const result = await chatModel.invoke("what is LangSmith?");
  // console.log(result, "---result");
} catch (e) {
  console.log(e, "---e");
}

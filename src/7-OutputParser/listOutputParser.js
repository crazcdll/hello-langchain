// const OPENAI_API_KEY = "sk-xDO0y7ctk5PZGuAIFb417058E37f4b05BeF1E00538E091Bc";
import "dotenv/config"; // 加了这行就会加载 .env 文件
import { ChatOpenAI } from "@langchain/openai";
import { CommaSeparatedListOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";

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

  const parser = new CommaSeparatedListOutputParser();

  const prompt = PromptTemplate.fromTemplate("列出 10 个{country} 的著名互联网公司：{instructions}");

  const chain = prompt.pipe(chatModel).pipe(parser);

  const result = await chain.invoke({
    country: "中国",
    instructions: parser.getFormatInstructions(),
  });
  console.log(result, "---result");
} catch (e) {
  console.log(e, "---e");
}

import "dotenv/config"; // 加了这行就会加载 .env 文件
import { ChatOpenAI } from "@langchain/openai";
import { TokenTextSplitter } from "langchain/text_splitter";

try {
  // const chatModel = new ChatOpenAI({
  //   timeout: 10000,
  //   // apiKey: OPENAI_API_KEY, // 或者这么直接传入 apiKey
  //   configuration: {
  //     // baseURL: "https://gitaigc.com/v1",
  //     baseURL: "https://api.deepseek.com/v1",
  //   },
  //   model: "deepseek-chat", // deepseek 需要显示指定模型
  // });

  // const result = await chatModel.invoke("what is LangSmith?");
  // console.log(result, "---result");

  const text = "I stand before you today the representative of a family in grief, in a country in mourning before a world in shock.";

  const splitter = new TokenTextSplitter({
    chunkSize: 20,
    chunkOverlap: 0,
  });

  const textDocs = await splitter.createDocuments([text]);

  console.log(textDocs, '---textDocs');
} catch (e) {
  console.log(e, "---e");
}

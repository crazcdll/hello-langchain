import "dotenv/config"; // 加了这行就会加载 .env 文件
import { ChatOpenAI } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { TextLoader } from "langchain/document_loaders/fs/text";

// const path = require("path");
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

  const loader = new TextLoader(path.resolve(__dirname, "./git.txt"));
  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 64,
    chunkOverlap: 16,
  });

  const splitDocs = await splitter.splitDocuments(docs);

  console.log(splitDocs, '---splitDocs');

  // const result = await chatModel.invoke("what is LangSmith?");
  // console.log(result, "---result");
} catch (e) {
  console.log(e, "---e");
}

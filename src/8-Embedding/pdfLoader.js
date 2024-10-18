import "dotenv/config"; // 加了这行就会加载 .env 文件
import { ChatOpenAI } from "@langchain/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

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

  const loader = new PDFLoader("./src/8-Embedding/example.pdf", {
    splitPages: false,
  });

  console.log(loader, "---loader");

  const pdf = await loader.load();

  console.log(JSON.stringify(pdf[0]?.metadata), "---pdf");

  // const result = await chatModel.invoke("what is LangSmith?");
  // console.log(result, "---result");
} catch (e) {
  console.log(e, "---e");
}

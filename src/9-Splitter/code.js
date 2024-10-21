import "dotenv/config"; // 加了这行就会加载 .env 文件
import { ChatOpenAI } from "@langchain/openai";
import { RecursiveCharacterTextSplitter, SupportedTextSplitterLanguages } from "langchain/text_splitter";

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

  // console.log(SupportedTextSplitterLanguages, '---SupportedTextSplitterLanguages');

  const js = `
    function myFunction(name,job){
      console.log("Welcome " + name + ", the " + job);
    }

    myFunction('Harry Potter','Wizard')

    function forFunction(){
      for (let i=0; i<5; i++){
            console.log("这个数字是" + i)
      }
    }

    forFunction()
  `;

  const splitter = RecursiveCharacterTextSplitter.fromLanguage("js", {
    chunkSize: 64,
    chunkOverlap: 0,
  })

  const jsInput = await splitter.createDocuments([js]);

  console.log(jsInput, '---jsInput');
} catch (e) {
  console.log(e, "---e");
}

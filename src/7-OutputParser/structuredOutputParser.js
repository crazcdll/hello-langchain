// const OPENAI_API_KEY = "sk-xDO0y7ctk5PZGuAIFb417058E37f4b05BeF1E00538E091Bc";
import "dotenv/config"; // 加了这行就会加载 .env 文件
import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
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

  const parser = StructuredOutputParser.fromNamesAndDescriptions({
    answer: "用户问题的答案",
    evidence: "你回答用户问题所依据的答案",
    confidence: "问题答案的可信度评分，格式是百分数",
    relatedQuestions: "用户问题相关的其他问题",
  });

  const prompt = PromptTemplate.fromTemplate(
    `尽可能的回答用户的问题 \n{instructions} \n{questions}`
  );

  const chain = prompt.pipe(chatModel).pipe(parser);


  const result = await chain.invoke({
    questions: "蒙娜丽莎的作者是谁？是什么时候绘制的？他是哪国人？他还有哪些作品？",
    instructions: parser.getFormatInstructions(),
  });
  console.log(result, "---result");
} catch (e) {
  console.log(e, "---e");
}

// const OPENAI_API_KEY = "sk-xDO0y7ctk5PZGuAIFb417058E37f4b05BeF1E00538E091Bc";
import "dotenv/config"; // 加了这行就会加载 .env 文件
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { OutputFixingParser } from "langchain/output_parsers";

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

  const schema = z.object({
    answer: z.string().describe("用户问题的答案"),
    confidence: z.number().describe("问题答案的可信度评分，满分 100"),
  });

  const parser = StructuredOutputParser.fromZodSchema(schema);

  const prompt = PromptTemplate.fromTemplate(
    "尽可能的回答用户的问题 \n{instructions} \n{questions}"
  );

  const chain = prompt.pipe(chatModel).pipe(parser);

  const result = await chain.invoke({
    questions: "What is LangSmith?",
    instructions: parser.getFormatInstructions(),
  });
  console.log(result, "---result");

  const fixParser = OutputFixingParser.fromLLM(chatModel, parser);

  const wrongOutput = {
    "answer": "LangSmith is a tool for building and managing LLM applications.",
    "sources": '100%'
  }

  const output = await fixParser.parse(JSON.stringify(wrongOutput));

  console.log(output, '---output');
} catch (e) {
  console.log(e, "---e");
}

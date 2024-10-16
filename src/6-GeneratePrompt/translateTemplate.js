import "dotenv/config"; // 加了这行就会加载 .env 文件
import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
} from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";

try {
  const translateInstructionPrompt = SystemMessagePromptTemplate.fromTemplate(
    `You are a helpful assistant that translates {input_language} to {output_language}.`
  );
  const userQuestionPrompt =
    HumanMessagePromptTemplate.fromTemplate("请翻译这段话：{text}");

  const chatPrompt = ChatPromptTemplate.fromMessages([
    translateInstructionPrompt,
    userQuestionPrompt,
  ]);

  const formattedChatPrompt = await chatPrompt.formatMessages({
    input_language: "中文",
    output_language: "English",
    text: "你好",
  });

  // console.log(formattedChatPrompt, "---formattedChatPrompt");

  const chatModel = new ChatOpenAI({
    timeout: 10000,
    configuration: {
      // baseURL: "https://gitaigc.com/v1",
      baseURL: "https://api.deepseek.com/v1",
    },
    model: "deepseek-chat",
  });

  const outputParser = new StringOutputParser();

  const chain = chatPrompt.pipe(chatModel).pipe(outputParser);

  const result = await chain.invoke({
    input_language: "中文",
    output_language: "English",
    text: "你好，世界",
  });
  console.log(result, "---result");
} catch (e) {
  console.log(e, "---e");
}

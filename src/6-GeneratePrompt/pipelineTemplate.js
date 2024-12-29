// const OPENAI_API_KEY = "sk-xDO0y7ctk5PZGuAIFb417058E37f4b05BeF1E00538E091Bc";
import "dotenv/config"; // 加了这行就会加载 .env 文件
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PipelinePromptTemplate, PromptTemplate } from "@langchain/core/prompts";

try {
  const getCurrentDateStr = () => {
    return new Date().toLocaleDateString();
  };

  // const fullPrompt = PromptTemplate.fromTemplate(`
  //   你是一个智能管家，今天是 {date}，你的主人的信息是{info},
  //   根据上下文，完成主人的需求
  //   {task}`);
  const fullPrompt = PromptTemplate.fromTemplate(`
    你是一个智能管家，今天是 {date}, 你的主任的信息是 {info}
    根据上下文，完成主人的需求
    {task}`);

  const datePrompt = PromptTemplate.fromTemplate("{date}，现在是 {period}");

  const periodPrompt = await datePrompt.partial({
    date: getCurrentDateStr,
  });

  const infoPrompt = PromptTemplate.fromTemplate(
    "姓名是 {name}，年龄是 {age}，性别是 {gender}"
  );

  const taskPrompt = PromptTemplate.fromTemplate(`
    我想吃 {period} 的 {food}
    再重复一遍我的信息{info}`);

  const composedPrompt = new PipelinePromptTemplate({
    pipelinePrompts: [
      {
        name: "date",
        prompt: periodPrompt,
      },
      {
        name: "info",
        prompt: infoPrompt,
      },
      {
        name: "task",
        prompt: taskPrompt,
      },
    ],
    finalPrompt: fullPrompt,
  });

  const formattedChatPrompt = await composedPrompt.format({
    period: "晚上",
    name: "zhangwuji",
    age: 24,
    gender: "男",
    food: "火锅",
  });

  console.log(formattedChatPrompt, '---formattedChatPrompt');

  // const chatModel = new ChatOpenAI({
  //   timeout: 10000,
  //   // apiKey: OPENAI_API_KEY, // 或者这么直接传入 apiKey
  //   configuration: {
  //     baseURL: "https://gitaigc.com/v1",
  //     // baseURL: "https://api.deepseek.com/v1",
  //   },
  //   // model: "deepseek-chat", // deepseek 需要显示指定模型
  // });

  // const result = await chatModel.invoke("what is LangSmith?");
  // console.log(result, "---result");
} catch (e) {
  console.log(e, "---e");
}

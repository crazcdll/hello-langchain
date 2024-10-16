import { load } from "dotenv";
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";

const env = await load();

const process = { env };

const chatModel = new ChatOpenAI({
  timeout: 10000,
  configuration: {
    // baseURL: "https://gitaigc.com/v1",
    baseURL: "https://api.deepseek.com/v1",
  },
  model: "deepseek-chat",
});

const outputParser = new StringOutputParser();

try {
  const simpleChain = chatModel.pipe(outputParser);
  const result = await simpleChain.invoke([new HumanMessage("tell me a joke")]);
  console.log(result, "---result");
  // const completion = await ChatOpenAI.completions.create({
  //   messages: [{ role: "system", content: "You are a helpful assistant." }],
  //   model: "deepseek-chat",
  // });
  // console.log(completion, '---completion');
} catch (e) {
  console.log(e, "---e");
}

// const OPENAI_API_KEY = "sk-xDO0y7ctk5PZGuAIFb417058E37f4b05BeF1E00538E091Bc";
import "dotenv/config";
import { PromptTemplate } from "@langchain/core/prompts";

const personalizedGreetingPrompt = new PromptTemplate({
  inputVariables: ["timeOfDay", "name"],
  template: "good {timeOfDay} {name} {{test}}", // {} 如何转译
});

const autoInferTemplate = PromptTemplate.fromTemplate(
  "good {timeOfDay} {name}"
);

const initialPrompt = PromptTemplate.fromTemplate("这是一个{type}，它是{item}");

const partialPrompt = await initialPrompt.partial({
  type: "工具",
});

const formattedPrompt = await partialPrompt.format({
  item: "锤子",
});

const formattedPrompt2 = await partialPrompt.format({
  item: "螺丝刀",
});

const getCurrentDateStr = () => {
  return new Date().toLocaleDateString();
};

function generateGreeting(timeOfDay) {
  return () => {
    const date = getCurrentDateStr();

    switch (timeOfDay) {
      case "morning":
        return date + " 早上好";
      case "afternoon":
        return date + " 下午好";
      case "evening":
        return date + " 晚上好";
      default:
        return date + " 早上好";
    }
  };
}

const greetingPrompt = PromptTemplate.fromTemplate("{greeting}");

try {
  const personalizedFormattedGreetingPrompt = await autoInferTemplate.format({
    timeOfDay: "evening",
    name: "zhangwuji",
  });

  // 这里只能是用 partial 来生成，直接用 format 生成不行
  const partialGreetingPrompt = await greetingPrompt.partial({
    greeting: generateGreeting("evening"),
  });

  const formattedGreetingPrompt = await partialGreetingPrompt.format();

  console.log(
    personalizedFormattedGreetingPrompt,
    "---personalizedFormattedGreetingPrompt"
  );

  console.log(formattedPrompt, "---formattedPrompt");
  console.log(formattedPrompt2, "---formattedPrompt2");
  console.log(formattedGreetingPrompt, '---formattedGreetingPrompt');
} catch (e) {
  console.log(e, "---e");
}

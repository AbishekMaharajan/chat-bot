import { ChatOpenAI } from "langchain/chat_models/openai";

const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo", temperature: 0 });

export default model;

// import OpenAI from "openai";
// import dotenv from "dotenv";

// dotenv.config();

// const openAi = new OpenAI({ apiKey: process.env.OPENAI_SECRET_KEY });

// export default openAi;

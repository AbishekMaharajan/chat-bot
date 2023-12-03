import path from "path";
import dotenv from "dotenv";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { setVector } from "../vectorStore/index.js";

dotenv.config();
const __dirname = path.resolve();

const embeddings = new OpenAIEmbeddings();
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 0,
});

export const createVectorStore = async (file) => {
  console.log("file: ", file);
  try {
    const pdfFile = path.join(__dirname, "pdf", file.filename);

    const loader = new PDFLoader(pdfFile, {
      splitPages: false,
      parsedItemSeparator: "",
    });

    const docs = await loader.load();
    const splitDocs = await textSplitter.splitDocuments(docs);

    const vectorStore = await MemoryVectorStore.fromDocuments(
      splitDocs,
      embeddings
    );

    let split = file.originalname.split(".");
    split.pop();
    let finalName = split.join(".");

    const result = setVector({ name: finalName, value: vectorStore });

    if (!result) throw new Error("Something went wrong");
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

import { RetrievalQAChain } from "langchain/chains";
import { createVectorStore } from "../../utils/createVectorStore.js";
import { getVector } from "../../vectorStore/index.js";
import model from "../../config/openAi.config.js";

export const generateMessage = async (req, res, next) => {
  const { prompt: query, vectorIndex } = req?.query;

  try {
    if (!query || !vectorIndex) throw Error("Invalid Prompt");

    const vectorStore = getVector(vectorIndex);
    if (!vectorStore)
      throw Error(
        "Invalid VectorStore Please upload the document and try again"
      );

    const chain = RetrievalQAChain.fromLLM(model, vectorStore?.asRetriever());

    const response = await chain.call({
      query,
    });

    // const resultOne = await vectorStore.similaritySearch("hello world", 1);
    const result = {
      data: response,
      success: true,
      status: 1,
      message: "Success",
    };

    res.send(result);
  } catch (error) {
    next(error);
  }
};

export const uploadPdf = async (req, res, next) => {
  try {
    const file = req.file;

    let split = file.originalname.split(".");
    split.pop();
    let finalName = split.join(".");

    let result = null;

    const vectorStore = getVector(finalName);
    console.log("vectorStore: ", vectorStore);

    if (!vectorStore) result = await createVectorStore(file);
    else result = vectorStore;
    console.log("result: ", result);

    if (!result) throw new Error("Could not create");

    res.send({
      success: true,
      status: 1,
      message: "Document uploaded successfully",
    });
  } catch (error) {
    next(error);
  }
};

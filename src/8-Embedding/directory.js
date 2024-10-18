import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";

const loader = new DirectoryLoader("./src/8-Embedding", {
  ".pdf": (path) => new PDFLoader(path),
  ".txt": (path) => new TextLoader(path),
});

const docs = await loader.load();

console.log(docs, '---docs');
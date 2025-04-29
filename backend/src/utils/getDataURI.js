import DataURIParser from "datauri/parser.js";
import path from "path";

function getDataURI(file) {
  const parser = new DataURIParser();
  return parser.format(path.extname(file.originalname), file.buffer).content;
}

export default getDataURI;

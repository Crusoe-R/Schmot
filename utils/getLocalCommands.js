import path from "path";
import getAllFiles from "../utils/getAllFiles.js";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const getLocalCommands = async () => {
  let localCommands = [];
  const commands = getAllFiles(path.join(__dirname, "..", "commands"), false);
  for (let command of commands) {
    const { default: commandObj } = await import(command);
    localCommands.push(commandObj);
  }

  return localCommands;
};

export default getLocalCommands;

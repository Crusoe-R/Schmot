import path from "path";
import getAllFiles from "../utils/getAllFiles.js";
import updateDB from "../utils/updateDB.js";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const update = false;

const eventHandler = (client) => {
  const eventDirs = getAllFiles(path.join(__dirname, "..", "events"), true);

  if (update) {
    updateDB();
  }
  

  for (let eventCat of eventDirs) {
    const events = getAllFiles(eventCat, false);
    const eventName = eventCat.split("/").pop();

    client.on(eventName, async (args) => {
      for (let eventFile of events) {
        const { default: eventFunction } = await import(eventFile);
        await eventFunction(client, args);
      }
    });
  }
};

export default eventHandler;

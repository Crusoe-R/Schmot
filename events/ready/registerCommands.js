import getLocalCommands from "../../utils/getLocalCommands.js";
import getGuildCommands from "../../utils/getGuildCommands.js";

const registerCommands = async (client) => {
  try {
    const localCommands = await getLocalCommands();
    //map so key , command
    const guildCommands = await getGuildCommands(client, process.env.Guild_ID);

    for (let localCommand of localCommands) {
      const { name, description, options, localUpdate } = localCommand;
      const existingCommand = guildCommands.find(
        (command) => command.name === localCommand.name,
      );
      if (!existingCommand) {
        let newCommand = await client.guilds.cache
          .get(process.env.Guild_ID)
          ?.commands.create({
            name: name,
            description: description,
            options: options,
          });
      } else {
        if (localUpdate) {
          await client.guilds.cache
            .get(process.env.Guild_ID)
            ?.commands.edit(existingCommand.id, {
              description: description,
              options: options,
            });
          localCommand.localUpdate = false;
          console.log("Updated command:", name);
        }
      }
    }

    for (const [commandId, guildCommand] of guildCommands) {
      const matchingLocalCommand = localCommands.find(
        (localCommand) => localCommand.name === guildCommand.name,
      );
      if (!matchingLocalCommand) {
        console.log(`Deleting command ${guildCommand.name}`);
        await guildCommand.delete();
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default registerCommands;

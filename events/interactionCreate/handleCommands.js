import getLocalCommands from "../../utils/getLocalCommands.js";

const handleCommands = async (client, interaction) => {
  const localCommands = await getLocalCommands();

  if (!interaction.isChatInputCommand()) return;

  try {
    const commandObject = localCommands.find(
      (cmd) => cmd.name === interaction.commandName,
    );
    if (!commandObject) return;

    await commandObject.callback(client, interaction);
  } catch (error) {
    console.log(`There was an error run this command: ${error}`);
  }
};

export default handleCommands;

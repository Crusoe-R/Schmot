const getGuildCommands = async (client, guildId) => {
  let guildCommands = [];

  if (guildId) {
    const guild = await client.guilds.fetch(guildId);
    guildCommands = await guild.commands.fetch();
  } else {
    guildCommands = await client.application.commands.fetch();
  }
  return guildCommands;
};

export default getGuildCommands;

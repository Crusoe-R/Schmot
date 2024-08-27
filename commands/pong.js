const pong = {
  name: "pong",
  description: "Replies with Ping!",

  callback: (client, interaction) => {
    interaction.reply("Ping!");
  },
};

export default pong;

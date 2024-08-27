import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import eventHandler from "./utils/eventHandler.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

eventHandler(client);

// client.on("ready", () => {
//   console.log(`Logged in as ${client.user.tag}!`);
// });

// let marketData = [];

// fetch("https://api.arsha.io/v2/eu/market")
//   .then((res) => {
//     if (!res.ok) {
//       console.log("No Success");
//     }
//     return res.json();
//   })
//   .then((data) => {
//     marketData = data;
//   })
//   .catch((error) => {
//     console.error("Error fetching data:", error);
//   });

// client.on("messageCreate", async (msg) => {
//   if (msg.channel.name === "online-wüste-schwarz") {
//     if (!msg.author.bot) {
//       console.log(msg.content);
//       const embed = new EmbedBuilder()
//         .setColor("#0099ff")
//         .setTitle(marketData[0].name)
//         .setDescription(msg.content)
//         .setImage(
//           "https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg",
//         )
//         .setTimestamp();

//       msg.channel.send({ embeds: [embed] });
//     }
//   }
// });

// client.on("interactionCreate", (interaction) => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === "psding") {
//     interaction.reply("Pong!");
//   }
// });

// client.on("interactionCreate", (interaction) => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === "search") {
//     const item = interaction.options.getString("item");
//     console.log(item);
//     interaction.reply("Pong!");
//   }
// });

client.login(process.env.Bot_Token);

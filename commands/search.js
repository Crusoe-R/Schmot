import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";

const search = {
  name: "search",
  localUpdate: false,
  description: "Search for an item on the Market",
  options: [
    {
      name: "item",
      description: "The item to search for",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "enhancment",
      description: "The enhancment value to search for",
      choices: [
        {
          name: "+0 - +7",
          value: 0,
        },
        {
          name: "+8 - +10",
          value: 8,
        },
        {
          name: "+11 - +12",
          value: 11,
        },
        {
          name: "+13",
          value: 13,
        },
        {
          name: "+14",
          value: 14,
        },
        {
          name: "+15",
          value: 15,
        },
        {
          name: "PRI",
          value: 16,
        },
        {
          name: "DUO",
          value: 17,
        },
        {
          name: "TRI",
          value: 18,
        },
        {
          name: "TET",
          value: 19,
        },
        {
          name: "PEN",
          value: 20,
        },
      ],
      type: ApplicationCommandOptionType.Integer,
      required: false,
    },
  ],

  callback: (client, interaction) => {
    const itemName = interaction.options.getString("item");
    const enhancementMap = {
      0: "+0 - +7",
      8: "+8 - +10",
      11: "+11 - +12",
      13: "+13",
      14: "+14",
      15: "+15",
      16: "PRI",
      17: "DUO",
      18: "TRI",
      19: "TET",
      20: "PEN",
    };

    const enhancementValue = interaction.options.getInteger("enhancment");
    const enhancementName = enhancementMap[enhancementValue];

    interaction.reply("Searching...").then(() => {
      fetch("https://api.arsha.io/v2/eu/market")
        .then((res) => {
          if (!res.ok) {
            console.log("No Success");
          }
          return res.json();
        })
        .then((data) => {
          let itemFound = false;
          data.forEach((item) => {
            if (item.name === itemName) {
              console.log("Item found");
              fetch(`https://api.arsha.io/v2/eu/item?id=${item.id}&lang=en`)
                .then((res) => {
                  if (!res.ok) {
                    console.log("No Success");
                  }
                  return res.json();
                })
                .then((data) => {
                  const embed = new EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle(item.name)

                    .setTimestamp();
                  if (!Array.isArray(data)) {
                    const item = data;
                    const formattedPrice = item.basePrice.toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      },
                    );
                    const formattedLastPrice =
                      item.lastSoldPrice.toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      });

                    embed.setDescription(
                      `ID: ${item.id} \n Stock: ${item.currentStock} \n Base Price: ${formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Silver \n Last Sold: ${formattedLastPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Silver`,
                    );
                  } else {
                    data.forEach((item) => {
                      const formattedPrice = item.basePrice.toLocaleString(
                        "en-US",
                        {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        },
                      );
                      const formattedLastPrice =
                        item.lastSoldPrice.toLocaleString("en-US", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        });
                      if (!enhancementValue) {
                        embed.addFields({
                          name: enhancementMap[item.sid],
                          value: `Stock: ${item.currentStock} \n Base Price: ${formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Silver \n Last Sold: ${formattedLastPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Silver`,
                          inline: true,
                        });
                      }
                      if (enhancementValue == item.sid) {
                        embed.setTitle(enhancementName + " " + item.name);
                        embed.setThumbnail(
                          `https://raw.githubusercontent.com/Crusoe-R/schmot-icons/main/icons/${item.id}.png`,
                        );
                        embed.setDescription(
                          `ID: ${item.id} \n Stock: ${item.currentStock} \n Base Price: ${formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Silver \n Last Sold: ${formattedLastPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Silver`,
                        );
                      }
                    });
                  }
                  interaction.editReply({
                    content: "Item found:",
                    embeds: [embed],
                  });
                })
                .catch((error) => {
                  console.error("Error fetching data:", error);
                  interaction.editReply(
                    "An error occurred while reciving the item.",
                  );
                });

              itemFound = true;
            }
          });

          if (!itemFound) {
            interaction.editReply("Item not found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          interaction.editReply(
            "An error occurred while searching for the item.",
          );
        });
    });
  },
};

export default search;

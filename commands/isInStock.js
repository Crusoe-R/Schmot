import { ApplicationCommandOptionType } from "discord.js";

const isInStock = {
  name: "isinstock",
  localUpdate: true,
  description:
    "checks every half hour till an item is in stock and mentions the user who asked",
  options: [
    {
      name: "id",
      description: "The item to search for",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "enhancement",
      description: "The enhancement value to search for",
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
    const itemId = interaction.options.getString("id");
    const enhancement = interaction.options.getInteger("enhancement");

    setInterval(
      () => {
          console.log("intervall start");
          fetch(`https://api.arsha.io/v2/eu/item?id=${itemId}&lang=en`)
            .then((res) => {
              if (!res.ok) {
                console.log("No Success");
              }
              return res.json();
            })
            .then((data) => {
              console.log(data);
              if (enhancement) {
                data.forEach((item) => {
                  if (item.sid === enhancement) {
                    if (item.currentStock > 0) {
                      interaction.channel.send(
                        `<@${interaction.user.id}> ur item is now in stock:  ${item.name}`,
                      );
                    }
                  }
                });
              } else {
                if (data.currentStock > 0) {
                  interaction.channel.send(
                    `<@${interaction.user.id}> ur item is now in stock:  ${item.name}`,
                  );
                }
              }
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
              interaction.editReply(
                "An error occurred while receiving the item.",
              );
            });
      },
      30 * 60 * 1000, // 30 minutes in milliseconds
    );
  },
};

export default isInStock;

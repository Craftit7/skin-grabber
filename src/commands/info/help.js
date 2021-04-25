const { MessageEmbed } = require("discord.js");
const { default_prefix } = require("../../../botconfig");

module.exports = {
    name: "help",
    category: "info",
    description: "Information for all available commands",
    nsfwOnly: false,
    ownerOnly: false,

    run: async (client, message, args) => {
        // console.log(client.commands.get(args[0]));
        if(args[0]) {
            let command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]))
            if (!command) {
                return message.channel.send(
                    "No command was found with that name/alias"
                );
            }

            let embed = new MessageEmbed();
            embed.setAuthor(`Command: ${command.name}`);
            embed.setDescription([
                `**Aliases:** ${
                    command.aliases
                        ? command.aliases
                              .map((alias) => `\`${alias}\``)
                              .join(", ")
                        : "No Aliases"
                }`,
                `**Description:** ${
                    command.description ? command.description : "No description"
                }`,
                `**Category:** ${
                    command.category ? command.category : "No category"
                }`,
                `**Usage:** ${command.usage ? command.usage : "No usage"}`,
                // `**Owner only:** ${command.ownerOnly ? "Yes" : "No"}`,
                // `**NSFW Only:** ${command.nsfwOnly ? "Yes" : "No"}`,
            ]);
            embed.setColor("RANDOM");
            embed.setFooter(
                `Requested by ${message.author.username}`,
                message.author.displayAvatarURL({
                    dynamic: true,
                    format: "png",
                })
            );
            message.channel.send(embed)
        } else {
            const prefix = default_prefix;

            let emx = new MessageEmbed()
                .setAuthor(`${client.user.username} Help`)
                .setDescription(
                    `Available commands for ${client.user.username}\nThe bot prefix is: ${prefix}`
                )
                .setColor("GREEN")
                .setFooter(
                    `Requested by ${message.author.username}`,
                    message.author.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                    })
                )
                .setThumbnail(client.user.displayAvatarURL());

            let categories;

            if (!message.channel.nsfw) {
                categories = client.utils.removeDuplicates(
                    client.commands
                        .filter((cmd) => cmd.category !== "nsfw")
                        .map((cmd) => cmd.category)
                );
            } else {
                categories = client.utils.removeDuplicates(
                    client.commands.map((cmd) => cmd.category)
                );
            }
            for (const category of categories) {
                emx.addField(
                    `${client.utils.capitalise(category)}`,
                    client.commands
                        .filter((cmd) => cmd.category === category)
                        .map((cmd) => `\`${cmd.name}\``)
                        .join(", ")
                );
            }
            return message.channel.send(emx);
        }
    },
};

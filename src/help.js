const { MessageEmbed } = require("discord.js");
const { default_prefix } = require("../../config.json");
const fs = require("fs");
module.exports = {
    name: "help",
    description: "Get help of all commands",
    usage: "help <cmd>",
    category: "information",
    run: async (client, message, args) => {
        if (args[0]) {
            const command =
                (await client.commands.get(args[0])) ||
                (await client.commands.get(client.aliases.get(args[0])));
            if (!command) {
                return message.channel.send(
                    "No command was found with that name/alias"
                );
            }

            let embed = new MessageEmbed();
            embed.setAuthor(`Command: ${command.name}`);
            embed.setDescription([
                `**❯ Aliases:** ${
                    command.aliases
                        ? command.aliases
                              .map((alias) => `\`${alias}\``)
                              .join(", ")
                        : "No Aliases"
                }`,
                `**❯ Description:** ${
                    command.description ? command.description : "No description"
                }`,
                `**❯ Category:** ${
                    command.category ? command.category : "No category"
                }`,
                `**❯ Usage:** ${command.usage ? command.usage : "No usage"}`,
                `**❯ ownerOnly:** ${command.ownerOnly ? "Yes" : "No"}`,
                `**❯ nsfwOnly:** ${command.nsfwOnly ? "Yes" : "No"}`,
            ]);
            embed.setColor("BLACK");
            embed.setFooter(
                `Requested by ${message.author.username}`,
                message.author.displayAvatarURL({
                    dynamic: true,
                    format: "png",
                })
            );
            return message.channel.send(embed);
        } else {
            const commands = await client.commands;
            let prefix = await client.db.fetch(`prefix_${message.guild.id}`);
            if (prefix === null) prefix = default_prefix;

            let emx = new MessageEmbed()
                .setAuthor(`${client.user.username} Help`)
                .setDescription(
                    `Available commands for ${client.user.username}\nThe bot prefix is: ${prefix}`
                )
                .setColor("BLACK")
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

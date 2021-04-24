const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    category: "info",
    description: "Get the ping of the bot",
    nsfwOnly: false,
    ownerOnly: false,

    run: async (client, msg, args) => {
        let m = await msg.channel.send("Pinging...");

            let ping = m.createdTimestamp - msg.createdTimestamp;
            const embed = new MessageEmbed()
                .addField(`🏓 Bot Latency`, `\`${ping}\`ms`)
                .addField(`🌐 API Latency`, `\`${client.ws.ping}\`ms`)
                .setColor("RANDOM")
                .setFooter(msg.author.username, msg.author.avatarURL({ format: "png" }))
                .setTimestamp()
            m.edit("", embed);
    }
}
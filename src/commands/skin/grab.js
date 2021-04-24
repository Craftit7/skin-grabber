const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "grab",
    category: "skin",
    description: "Grab a minecraft sking",
    nsfwOnly: false,
    ownerOnly: false,
    aliases: ["skin"],

    run: (client, msg, args) => {
        const username = args
        if (!username.length)
            return msg.channel.send(`Please provide a username.`);

        const url = `https://minotar.net/body/${username}/650.png`;

        const skinEmbed = new MessageEmbed()
            .setTitle(`__${username}__'s Skin:`)
            .setImage(url)
            .setColor("RANDOM")
            .setDescription(`Possible using [Minotar API](https://www.minotar.net)`)
            .setFooter(
                msg.author.username,
                msg.author.avatarURL({ format: "png" })
            )
            .setTimestamp();

        return msg.channel.send(skinEmbed);
    },
};

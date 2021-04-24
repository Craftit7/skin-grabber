const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "bust",
    category: "skin",
    description: "Get a bust for a skin",
    nsfwOnly: false,
    ownerOnly: false,

    run: (client, msg, args) => {
        const username = args
        
        if (!username.length)
            return msg.channel.send(`Please provide a username.`);

        const url = `https://minotar.net/bust/${username}/200.png`;

        const skinEmbed = new MessageEmbed()
            .setTitle(`__${username}__'s Bust:`)
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

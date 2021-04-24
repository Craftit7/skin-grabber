const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "download",
    category: "skin",
    description: "Get download links for a skin",
    nsfwOnly: false,
    ownerOnly: false,
    aliases: ['link', 'dl'],

    run: (client, msg, args) => {
        const username = args

        if(!username.length) 
            return msg.channel.send(`Please provide a username.`)

        const skinEmbed = new MessageEmbed()
            .setTitle(`Downloads for ${username}'s skin:`)
            .setDescription(
                `**Usable skin**: [Download](https://minotar.net/download/${username})
                 **PNG Full**: [Download](https://minotar.net/body/${username}/250.png)
                 **Bust:** [Download](https://minotar.net/bust/${username}/150.png)
                 **Avatar Format:** [Download](https://minotar.net/helm/${username}/100.png)
            `
            )
            .setFooter(
                `Possible using Minotar API (minotar.net)`,
                msg.author.avatarURL({ format: "png" })
            )
            .setTimestamp();

        return msg.channel.send(skinEmbed);
    },
};

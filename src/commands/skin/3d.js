const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "3d",
    category: "skin",
    description: "3D Render for a skin",
    nsfwOnly: false,
    ownerOnly: false,
    aliases: ['3drender', "3dskin"],

    run: async (client, msg, args) => {
        const username = args
        if (!username.length)
            return msg.channel.send(`Please provide a username.`);
        
        const uuid = await client.utils.convertNameToUUID(username);
        const renderUrl = `https://crafatar.com/renders/body/${uuid}`;
        
        const renderEmbed = new MessageEmbed()
            .setTitle(`3D Render for ${username}'s skin:`)
            .setColor("RANDOM")
            .setImage(renderUrl)
            .setDescription(`Possible using [Crafatar API](https://www.crafatar.com)`, msg.author.avatarURL({ format: 'png' }))
            .setTimestamp();

        msg.channel.send(renderEmbed)
    },
};

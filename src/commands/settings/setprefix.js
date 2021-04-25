const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "setprefix",
    category: "settings",
    description: "Set a new prefix for bot",
    nsfwOnly: false,
    ownerOnly: false,
    aliases: ["sp", "newprefix"],

    run: (client, msg, args) => {
        if(!args[0].toString()) return msg.channel.send('Enter a new prefix.')
        client.firestore.set('prefixes', 'guild-prefix', msg.guild.id, args[0].toString())

        const prefixEmbed = new MessageEmbed()
            .setTitle(`New prefix succesfully set.`)
            .setDescription(`Succesfully set prefix \`${args[0].toString()}\` for **${msg.guild.name}**`)
            .setTimestamp()
            .setColor('RANDOM')
        return msg.channel.send(prefixEmbed)
    },
};

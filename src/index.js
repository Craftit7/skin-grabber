const { Client, Collection } = require("discord.js");
const client = new Client();
const { readdirSync } = require("fs");
const Util = require("./Structures/util.js");
const { owner } = require("../botconfig");
const db = require("quick.db");
const { join } = require("path");
const { keepAlive } = require("./keepalive");
require("dotenv").config();

client.categories = readdirSync(join(__dirname, "./commands"));
client.commands = new Collection();
client.aliases = new Collection();
client.utils = new Util(this);
client.owner = owner;
client.db = db;
client.firestore = require("./Structures/FirestoreDB");

require(`./handlers/command.js`)(client);

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag} (${client.user.id})`);
});

client.on("error", console.error); // pog error handling

client.on("message", async (message) => {
    let prefix;
    let fetchPrefix = await client.firestore.get(message.guild.id, "prefixes");
    if (fetchPrefix) prefix = fetchPrefix;
    else {
        prefix = "sg$";
        client.firestore.set("prefixes", "guild-prefix", msg.guild.id, 'sg$')
    }

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    if (!message.member)
        message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);

    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) command.run(client, message, args);
});

keepAlive();

client.login(process.env.TOKEN);
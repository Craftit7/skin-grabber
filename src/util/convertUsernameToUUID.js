const fetch = require('node-fetch');

module.exports.convertNameToUUID = async function (username) {
        const res = await fetch('https://api.mojang.com/users/profiles/minecraft/' + username)
        const json = await res.json();
        return json.id
}
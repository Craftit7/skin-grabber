const path = require("path");
const { promisify } = require("util");
const glob = promisify(require("glob"));
const axios = require('axios')

module.exports = class Util {
    constructor(client) {
        this.client = client;
    }

    isClass(input) {
        return (
            typeof input === "function" &&
            typeof input.prototype === "object" &&
            input.toString().substring(0, 5) === "class"
        );
    }

    get directory() {
        return `${path.dirname(require.main.filename)}${path.sep}`;
    }

    trimArray(arr, maxLen = 10) {
        if (arr.length > maxLen) {
            const len = arr.length - maxLen;
            arr = arr.slice(0, maxLen);
            arr.push(`${len} more...`);
        }
        return arr;
    }

    formatBytes(bytes) {
        if (bytes === 0) return "0 Bytes";
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${
            sizes[i]
        }`;
    }

    removeDuplicates(arr) {
        return [...new Set(arr)];
    }

    capitalise(string) {
        return string
            .split(" ")
            .map((str) => str.slice(0, 1).toUpperCase() + str.slice(1))
            .join(" ");
    }

    checkOwner(target) {
        return this.client.owners.includes(target);
    }

    comparePerms(member, target) {
        return member.roles.highest.position < target.roles.highest.position;
    }

    formatPerms(perm) {
        return perm
            .toLowerCase()
            .replace(/(^|"|_)(\S)/g, (s) => s.toUpperCase())
            .replace(/_/g, " ")
            .replace(/Guild/g, "Server")
            .replace(/Use Vad/g, "Use Voice Acitvity");
    }

    formatArray(array, type = "conjunction") {
        return new Intl.ListFormat("en-GB", {
            style: "short",
            type: type,
        }).format(array);
    }
    
    async convertNameToUUID(username) {
        const res = await axios.get('https://api.mojang.com/users/profiles/minecraft/' + username)
        const json = await res.data
        return json.id
    }
};

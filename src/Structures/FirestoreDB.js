const { Collection } = require("discord.js");
const {db} = require("../firestore");

module.exports = new class Firestore {
    constructor(client) {
        this.client = client;
    }

    async collection(collection) {
        const data = new Collection();
        // const snapshot = await db.collection("users").get();
        // snapshot.forEach((doc) => {
        //     data.set(doc.id, doc.data());
        // });

        const snapshot = await db.collection(collection).get();
        snapshot.forEach((doc) => {
            data.set(doc.id, doc.data());
            });
        
        const dataArr = data.array()
        return dataArr
    }

    async get(key, collection) {
        const data = await this.collection(collection)
        const arrayData = Array.from(data)[0];

        return arrayData[key]
    }

    async set(collection, document, key, value) {
        const docRef = db.collection(collection).doc(document);
        const dataObj = JSON.parse(`{ "${key}": "${value}" }`)
        await docRef.set(dataObj, { merge: true });

        return docRef;
    }
}
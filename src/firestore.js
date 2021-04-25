const admin = require("firebase-admin");
require('dotenv').config()

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_AUTH);

const firebaseConfig = {
    credential: admin.credential.cert(serviceAccount),
};
// Initialize Firebase
admin.initializeApp(firebaseConfig);

module.exports.db = admin.firestore();
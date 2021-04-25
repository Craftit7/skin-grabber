const admin = require("firebase-admin");
require('dotenv').config()

const serviceAccount = require('../skin-grabber-firebase-adminsdk-o5pcv-6bc4d0cb3e.json')

const firebaseConfig = {
    credential: admin.credential.cert(serviceAccount),
};
// Initialize Firebase
admin.initializeApp(firebaseConfig);

module.exports.db = admin.firestore();
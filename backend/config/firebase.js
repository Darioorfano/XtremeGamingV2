


const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

const serviceAccount = require('../config/xtremegamingv2-fd143-firebase-adminsdk-sneqb-8e7df6a50f.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = {
    db
}
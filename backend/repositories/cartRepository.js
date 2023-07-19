const {db} = require('../config/firebase');
const { collection,getDocs} = require("firebase/firestore"); 


const buys = async () => {
    const querySnapshot = await getDocs(collection(db, "buys"));
    const listBuys = []

    querySnapshot.forEach(doc => {
      let buy = { id: doc.id, ...doc.data()}
      listBuys.push(buy);
    });
    
    return listBuys;
}
module.exports = {
    buys
}
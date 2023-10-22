const {db} = require('../config/firebase');
const { setDoc, doc, getDocs, where } = require("firebase/firestore"); 

const guardarUsuario = async (id, name, rol) => {
    try {
        await  setDoc( doc(db, 'users', id), {  name, rol })
        return { code: 201, mensaje: `El usuario fue agregado correctamente`}
    } catch (error){
        return { code: 500, mensaje: error}
    }
}

module.exports = {
    guardarUsuario
}

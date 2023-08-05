const {db} = require('../config/firebase');
const { collection, doc, getDocs, getDoc,query,where,orderBy,limit,onSnapshot } = require("firebase/firestore"); 


const listProduct = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const listProduct = []

    querySnapshot.forEach(doc => {
      let product = { id: doc.id, ...doc.data()}
      listProduct.push(product);
    });
    
    return listProduct;
}


const getProductById = async (productId) => {
    const docRef = doc(db, "products", productId);
    const product = await getDoc(docRef);
    return product.exists ? {id: productId, ...product.data()} : null;
    
}

const getProductsByName = async (name) => {
  const nameLower = name.toLowerCase();

  const collectionRef = collection(db, "products");
  
  const productos  = await getDocs(collectionRef);
  const listProduct = []

  const filter = productos.docs.filter((doc) => {
    return doc.data().nombreProducto.toLowerCase().includes(nameLower) 
  })
  filter.forEach(doc => {
    console.log(doc)
    let product = { id: doc.id, ...doc.data()}
    listProduct.push(product);
  });

  return listProduct;
};





module.exports = {
  getProductById,
  listProduct,
  getProductsByName
};
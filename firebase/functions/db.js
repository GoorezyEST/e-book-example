import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export async function getAllProducts() {
  const snapshot = await getDocs(collection(db, "productos"));

  let products = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    products.push({
      id: doc.id,
      ...data,
    });
  });
  return products;
}

export async function getProductsByCategory(category) {
  const snapshot = await getDocs(collection(db, "productos"));

  let products = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.category === category) {
      products.push({
        id: doc.id,
        ...data,
      });
    }
  });
  return products;
}

export async function getCategories() {
  const snapshot = await getDocs(collection(db, "categorias"));

  let categories = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    categories.push({
      id: doc.id,
      ...data,
    });
  });

  return categories;
}

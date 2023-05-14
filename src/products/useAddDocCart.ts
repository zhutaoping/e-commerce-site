import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { ProductTypes } from "../types/myTypes";

const addDocCart = async (item: ProductTypes) => {
  const uid = auth.currentUser ? auth.currentUser.uid : "";
  const userRef = doc(db, "users", uid);

  await updateDoc(userRef, {
    items: arrayUnion(item),
  });
};
export default addDocCart;

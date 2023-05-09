import { useState, useEffect, ReactNode } from "react";
import { ProductTypes, UserTypes } from "../types/myTypes";

import { db, auth } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useCollectionUser = (c: string, _q?: string) => {
  const [documents, setDocuments] = useState<ProductTypes[] | null>(null);

  const [error, setError] = useState<ReactNode>();

  useEffect(() => {
    const getData = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, `users/${_q}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const results = docSnap.data() as UserTypes;
          setDocuments(results.items);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }
    };
    getData();
  }, [c, _q]);

  return { documents, error };
};

import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Alert } from "react-native";

export const data = async () => {
  const [data, setData] = useState([]);

  const querySnapshot = await getDocs(collection(db, "timelogs"));
  querySnapshot.forEach((doc) => {
    setData([
      ...data,
      {
        id: doc.id,
        breakEnd: doc.data().breakEnd,
      },
    ]);
    console.log(doc.id, " => ", doc.data());
  });
  return data;
};

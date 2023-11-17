"use client";
import React, { ReactNode, useEffect, useState } from "react";
import MyContext from "../context/createContext";
import { useUser } from "@clerk/nextjs";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/components/firebaseConfig";

interface MyProviderProps {
  children: ReactNode;
}

const MyProvider = ({ children }: MyProviderProps) => {
  const { user } = useUser();
  const fullName = user?.fullName;
  const imageUrl = user?.imageUrl;
  const email = user?.primaryEmailAddress?.emailAddress;
  const [userLogId, setUserLogId] = useState("");
  const [postData, setPostData] = useState();
  const [userPostData, setUserPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const allPostRef = collection(db, "allPosts");

  console.log(postData, "postData");

  const usersRef = collection(db, "users");

  useEffect(() => {
    storeUser();
    getSingleData();
    getAllPosts();
  }, [fullName, imageUrl, email]);
  const storeUser = async () => {
    if (fullName && imageUrl && email) {
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        const res = await addDoc(usersRef, {
          name: fullName,
          imageUrl: imageUrl,
          email: email,
        });
      } else {
        console.log("User data already exists");
      }
    }
  };
  const getSingleData = async () => {
    if (email) {
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      setUserLogId(querySnapshot.docs[0].id);
    }
  };
  const getAllPosts = async () => {
    const querySnapshot = await getDocs(allPostRef);
    const postsData: any = [];
    querySnapshot.forEach((doc) => {
      postsData.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    setUserPostData(postsData);
    setLoading(false);
  };
  return (
    <MyContext.Provider
      value={{ user, userLogId, postData, setPostData, userPostData, loading }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;

import { db } from "../../firebase/firebase";
import { getAuth } from "firebase/auth";
import { collection, 
         query, 
         where, 
         getDoc,
         getDocs, 
         setDoc, 
         doc, 
         updateDoc, 
         serverTimestamp,
         Timestamp,
        arrayUnion } from 'firebase/firestore';

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { nanoid } from "@reduxjs/toolkit";

const useChat = () => {

    const createUserChats = async (uid) => {
      await setDoc(doc(db, "userChats", uid), {});
    }

    const searchUser = async (username) => {

        const q = query(
          collection(db, "users"), 
          where("displayName", "==", username));
    
        try {
            const querySnapshot = await getDocs(q);
            const usersList = [];
            querySnapshot.forEach((doc) => {
                usersList.push(doc.data());
            });
            return usersList;
        } catch (err) {
          return Error("No users found");
        }
    }

    const createChat = async (user) => {
      // check whether the group(chats in firestore) exist, if not - create
      const auth = getAuth();
      const combinedId =
        auth.currentUser.uid > user.uid
          ? auth.currentUser.uid + user.uid
          : user.uid + auth.currentUser.uid;
      try {
        const res = await getDoc(doc(db, "chats", combinedId));
        
        if (!res.exists()) {
          //create a chat in chats collection
          await setDoc(doc(db, "chats", combinedId), { messages: [] });

          //create user chat
          await updateDoc(doc(db, "userChats", auth.currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL.downloadURL
            },
            [combinedId+".date"]: serverTimestamp()
          });

          await updateDoc(doc(db, "userChats", user.uid), {
            [combinedId + ".userInfo"]: {
              uid: auth.currentUser.uid,
              displayName: auth.currentUser.displayName,
              photoURL: auth.currentUser.photoURL
            },
            [combinedId+".date"]: serverTimestamp()
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    const sendMessage = async (img, text, currentUser, data) => {
      if (img) {
        const storage = getStorage();
        const storageRef = ref(storage, nanoid());
  
        await uploadBytes(storageRef, img)
              .then(snapshot => getDownloadURL(snapshot.ref))
              .then(downloadURL => {
                updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: nanoid(),
                    text,
                    senderId: currentUser.id,
                    data: Timestamp.now(),
                    img: downloadURL
                  })
                })
              });
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: nanoid(),
            text,
            senderId: currentUser.id,
            data: Timestamp.now()
          })
        });
      }
  
      await updateDoc(doc(db, "userChats", currentUser.id), {
        [data.chatId + ".lastMessage"]: {
          text
        },
        [data.chatId + ".date"]: serverTimestamp() 
      })
  
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text
        },
        [data.chatId + ".date"]: serverTimestamp() 
      })
    }


    return {searchUser, createUserChats, createChat, sendMessage}
}

export default useChat;
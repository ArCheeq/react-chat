import React, { useState } from 'react'
import './input.scss';

import Img from '../../resources/images/img.png';
import Attach from '../../resources/images/attach.png';

import { useSelector } from 'react-redux';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL } from 'firebase/storage';
import { uploadBytes } from 'firebase/storage';
import { db } from '../../../firebase/firebase';
import { nanoid } from '@reduxjs/toolkit';
import { getStorage, ref } from 'firebase/storage';

const Input = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const currentUser = useSelector(state => state.user);
  const data = useSelector(state => state.userChat);

  const handleSend = async () => {
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

    setText("")
    setImg(null);
  }

  return (
    <div className='input'>
      <input 
        type="text" 
        placeholder='Type something...'
        value={text} 
        onChange={e => setText(e.target.value)} />
      <div className="send">
        <img src={Attach} alt="" />
        <input 
          style={{display: 'none'}} 
          type="file" 
          id='file' 
          onChange={e => setImg(e.target.files[0])} />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input
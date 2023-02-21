import { nanoid } from '@reduxjs/toolkit';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../../firebase/firebase';

import './chats.scss';

const Chats = () => {

  const [chats, setChats] = useState([]);

  const currentUser = useSelector(state => state.user);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.id), (doc) => {
        setChats(Object.entries(doc.data()));
      });
      return () => {
        unsub();
      }
    }

    currentUser.id && getChats();
  }, [currentUser.id]);

  const renderUsers = (chats) => {
    return chats.map((chat => (
      <div className="userChat" key={chat[0]}>
        <img src={chat[1].userInfo.photoURL} alt="avatar" />
        <div className="userChatInfo">
          <span>{chat[1].userInfo.displayName}</span>
          <p className="lastMessage">{chat[1].userInfo.lastMessage}</p>
        </div>
      </div>
    )))
  }

  const elements = renderUsers(chats);
  return (
    <div className='chats'>
      {elements}
    </div>
  )
}

export default Chats;
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../../firebase/firebase';

import { useDispatch } from 'react-redux';
import { changeUser } from '../../store/slices/chatSlice';

import './chats.scss';

const Chats = () => {

  const [chats, setChats] = useState([]);

  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();

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

  const handleSelect = (user) => {
    dispatch(changeUser({user, currentUser}));
  }

  const renderUsers = (chats) => {
    console.log(chats)
    return chats.sort((a, b) => b[1].date - a[1].date).map((chat => (
      <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
        <img src={chat[1].userInfo.photoURL} alt="avatar" />
        <div className="userChatInfo">
          <span>{chat[1].userInfo.displayName}</span>
          <p className="lastMessage">{chat[1].lastMessage ? chat[1].lastMessage.text : null}</p>
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
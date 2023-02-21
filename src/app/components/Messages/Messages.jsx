import React, { useState, useEffect } from 'react'

import Message from '../Message/Message';
import { useSelector } from 'react-redux';

import './messages.scss';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { nanoid } from '@reduxjs/toolkit';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const chatId = useSelector(state => state.userChat.chatId);

  useEffect(() => {
    const getMessages = () => {
      const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages)
      })
  
      return () => {
        unSub()
      }
    }

    chatId && getMessages();
  }, [chatId]);

  const renderMessages = (arr) => {
    return arr.map((m) => (
      <Message message={m} key={nanoid()} />
    )); 
  };

  const elements = renderMessages(messages);

  return (
    <div className='messages'>
        {elements}
    </div>
  )
}

export default Messages
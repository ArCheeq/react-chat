import { nanoid } from '@reduxjs/toolkit';
import React from 'react'
import './chats.scss';

const Chats = ({users}) => {

  const renderUsers = (users) => {
    return users.map((user => (
      <div className="userChat" key={nanoid()}>
        <img src={user.photoURL.downloadURL} alt="avatar" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
          <p className="lastMessage">Hello</p>
        </div>
      </div>
    )))
  }

  const elements = renderUsers(users);
  return (
    <div className='chats'>
      {elements}
    </div>
  )
}

export default Chats
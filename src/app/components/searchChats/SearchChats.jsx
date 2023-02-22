import { nanoid } from '@reduxjs/toolkit';
import React from 'react';

import '../Chats/chats.scss';

const SearchChats = ({users, handleSelect}) => {

  const renderUsers = (users) => {
    return users.map((user => (
      <div className="userChat" key={nanoid()} onClick={() => handleSelect(user)}>
        <img src={user.photoURL.downloadURL} alt="avatar" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
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

export default SearchChats;
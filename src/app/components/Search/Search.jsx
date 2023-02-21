import React, { useState, useCallback } from 'react';

import Chats from '../Chats/Chats';
import SearchChats from '../searchChats/SearchChats';

import useChat from '../../hooks/useChat';

import './search.scss';

const Search = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false)

  const { searchUser, createChat } = useChat();

  const handleKey = (e) => {
    if (e.code === "Enter") {
      searchUser(username).then(data => {
        if (data.length === 0) {
          setError(true);
        } else {
          setError(false);
          setUsers(data);
        }
      })
    }
  }

  const handleSelect = async (user) => {
    await createChat(user);
    setUsername("");
    setUsers([]);
  }

  const cachedHandleSelect = useCallback(handleSelect, []);

  return (
    <div className='search'>
      <div className="searchForm">
        <label htmlFor="user">
          <div className="magnifier">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path fill="#ddddf7" d="M15.5 14h-.79l-.28-.27c1.2-1.39 1.92-3.18 1.92-5.23c0-4.42-3.58-8-8-8s-8 3.58-8 8s3.58 8 8 8c2.05 0 3.94-.72 5.43-1.92l.27.28v.79l5 4.99l1.49-1.48l-4.99-5zm-7 0c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5z"/>
            </svg>
          </div>
          <input 
            type="text"
            id='user' 
            placeholder='Find a user...' 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKey}/>
        </label>
          {error ? <p className='noUsers'>No users found with this name...</p> : <SearchChats users={users} handleSelect={cachedHandleSelect}/>}
      </div>
      <Chats />
    </div>
  )
}

export default Search;
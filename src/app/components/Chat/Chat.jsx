import React from 'react'
import './chat.scss';

import Add from '../../resources/images/add.png';
import Cam from '../../resources/images/cam.png';
import More from '../../resources/images/more.png';

import Messages from '../Messages/Messages';
import Input from '../Input/Input';
import { useSelector } from 'react-redux';

const Chat = () => {
  const user = useSelector(state => state.userChat.user);

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>
          {user.displayName}
          {user.displayName 
            ? <div className='online'>
                <svg width="12" height="12">
                  <circle cx="6" cy="6" r="5" fill="#4CAF50" />
                </svg>
              </div> 
            : null}
        </span>
        <div className="chatIcons">
          <img src={Cam} alt="Camera" />
          <img src={Add} alt="add" />
          <img src={More} alt="More" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat
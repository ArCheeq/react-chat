import React from 'react'
import './chat.scss';

import Add from '../../resources/images/add.png';
import Cam from '../../resources/images/cam.png';
import More from '../../resources/images/more.png';

import Messages from '../Messages/Messages';
import Input from '../Input/Input';

const Chat = () => {
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>
          Jane
          <div className='online'>
            <svg width="12" height="12">
              <circle cx="6" cy="6" r="5" fill="#4CAF50" />
            </svg>
          </div>
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
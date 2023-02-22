import React, { useState } from 'react'
import './input.scss';

import Img from '../../resources/images/img.png';

import { useSelector } from 'react-redux';
import useChat from '../../hooks/useChat';

const Input = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const currentUser = useSelector(state => state.user);
  const data = useSelector(state => state.userChat);

  const { sendMessage } = useChat();

  const handleSend = async () => {
    
    await sendMessage(img, text, currentUser, data);

    setText("")
    setImg(null);
  }

  return (
    <div className='input'>
      <input 
        type="text" 
        placeholder='Type something...'
        value={text} 
        onChange={e => setText(e.target.value)}
        onKeyDown={e => {e.code === "Enter" && handleSend()}} />
      <div className="send">
        <input 
          style={{display: 'none'}} 
          type="file" 
          id='file' 
          onChange={e => setImg(e.target.files[0])}/>
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input
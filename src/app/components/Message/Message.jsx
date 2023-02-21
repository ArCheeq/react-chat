import React, {useEffect, useRef} from 'react';
import { useSelector } from 'react-redux';
import './message.scss';

const Message = ({message}) => {
  const currentUser = useSelector(state => state.user);
  const user = useSelector(state => state.userChat.user);

  const ref = useRef();

  useEffect(() => {
    ref.current.scrollIntoView({behavior: "smooth"});
  }, [message]);


  return (
    <div
      ref={ref} 
      className={`message ${message.senderId === currentUser.id && "owner" }`}>
      <div className="messageInfo">
        <img 
          src={message.senderId === currentUser.id ? currentUser.photoURL : user.photoURL} 
          alt="avatar" />
        <span>Just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.hasOwnProperty("img") 
        ? <img src={message.img} alt="avatar" />
        : null}
      </div>
    </div>
  )
}

export default Message
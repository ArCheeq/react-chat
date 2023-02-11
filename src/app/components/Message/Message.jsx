import React from 'react'
import './message.scss';

const Message = () => {
  return (
    <div className='message owner'>
      <div className="messageInfo">
        <img src="https://images.pexels.com/photos/10352348/pexels-photo-10352348.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="avatar" />
        <span>Just now</span>
      </div>
      <div className="messageContent">
        <p>Hello</p>
        <img src="https://images.pexels.com/photos/10352348/pexels-photo-10352348.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="avatar" />
      </div>
    </div>
  )
}

export default Message
import React from 'react'
import './chats.scss';

const Chats = () => {
  return (
    <div className='chats'>
      <div className="userChat">
        <img src="https://images.pexels.com/photos/10352348/pexels-photo-10352348.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="avatar" />
        <div className="userChatInfo">
          <span>Jane</span>
          <p className="lastMessage">Hello</p>
        </div>
      </div>
      <div className="userChat">
        <img src="https://images.pexels.com/photos/10352348/pexels-photo-10352348.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="avatar" />
        <div className="userChatInfo">
          <span>Jane</span>
          <p className="lastMessage">Hello</p>
        </div>
      </div>
      <div className="userChat">
        <img src="https://images.pexels.com/photos/10352348/pexels-photo-10352348.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="avatar" />
        <div className="userChatInfo">
          <span>Jane</span>
          <p className="lastMessage">Hello</p>
        </div>
      </div>
      <div className="userChat">
        <img src="https://images.pexels.com/photos/10352348/pexels-photo-10352348.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="avatar" />
        <div className="userChatInfo">
          <span>Jane</span>
          <p className="lastMessage">Hello</p>
        </div>
      </div>
    </div>
  )
}

export default Chats
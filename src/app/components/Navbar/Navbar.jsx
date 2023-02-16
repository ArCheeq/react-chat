import React from 'react'
import './navbar.scss';

import { useDispatch } from 'react-redux';
import { removeUser } from '../../store/slices/userSlice';

const Navbar = () => {

  const dispatch = useDispatch();

  return (
    <div className='navbar'>
      <span className="logo">React Chat</span>
      <div className="user">
        <img src="https://images.pexels.com/photos/10352348/pexels-photo-10352348.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="avatar" />
        <span>John</span>
        <button onClick={() => dispatch(removeUser())}>logout</button>
      </div>
    </div>
  )
}

export default Navbar
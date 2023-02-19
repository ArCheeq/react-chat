import React from 'react'
import './navbar.scss';

import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../../store/slices/userSlice';

import { signOut, getAuth } from 'firebase/auth';

const Navbar = () => {
  const displayName = useSelector(state => state.user.displayName);
  const photoURL = useSelector(state => state.user.photoURL);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(removeUser());

    const auth = getAuth();
    signOut(auth);
  }

  return (
    <div className='navbar'>
      <span className="logo">React Chat</span>
      <div className="user">
        <img src={photoURL} alt="avatar" />
        <span>{displayName}</span>
        <button onClick={logout}>logout</button>
      </div>
    </div>
  )
}

export default Navbar
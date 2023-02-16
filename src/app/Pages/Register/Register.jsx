import React, { useState } from 'react'

import img from '../../resources/images/addAvatar.png';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/userSlice';

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then(({user}) => {
      dispatch(setUser({
        email: user.email,
        token: user.accessToken,
        id: user.uid
      }));
      navigate("/home");
    })
    .catch(() => setError(true));
  }

  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <h1 className='logo'>React Chat</h1>
            <p className='title'>Register</p>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Display name'/>
                <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                <input style={{display: 'none'}} type="file" id='file'/>
                <label htmlFor="file">
                    <img src={img} alt="addAvatar" />
                    <span>Add an avatar</span>
                </label>
                {error ? <p className='error'>Email already in use, sign in</p> : null}
                <button>Sign up</button>
            </form>
            <p>You do have an account? <Link to="/sign-in">Login</Link></p>
        </div>
    </div>
  )
}

export default Register
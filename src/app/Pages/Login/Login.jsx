import React, { useState } from 'react';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/userSlice';

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        dispatch(setUser({
          email: user.email,
          token: user.accessToken,
          id: user.uid
        }));
        navigate("/home");
      })
      .catch(() => setError(true))
  }

  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <h1 className='logo'>React Chat</h1>
            <p className='title'>Login</p>
            <form onSubmit={handleSubmit}>
                <input 
                  type="email" 
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}/>
                <input 
                  type="password" 
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
                  {error ? <p className='error'>The username or password you entered is incorrect</p> : null}
                <button>Sign up</button>
            </form>
            <p>You don't have an account? <Link to="/sign-up">Register</Link></p>
        </div>
    </div>
  )
}

export default Login
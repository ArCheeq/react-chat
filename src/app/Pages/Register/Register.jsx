import React, { useState } from 'react'
import img from '../../resources/images/addAvatar.png';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Register = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState('');

  const [error, setError] = useState(false);
  const [fileError, setFileError] = useState(false);

  const {uploadUser, updateUserProfile} = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    uploadUser(email, password, setError)
      .then(() => {
        if (!!file & !error) {
          return updateUserProfile(file, displayName, setFileError);
        }
      })
      .then(() => {
        if (!error && !fileError) {
          e.target.reset();
          navigate("/home") 
        } 
      });
  }

  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <h1 className='logo'>React Chat</h1>
            <p className='title'>Register</p>
            <form onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  placeholder='Display name'
                  value={displayName} 
                  onChange={(e) => setDisplayName(e.target.value)}/>
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
                <input 
                  style={{display: 'none'}} 
                  type="file" 
                  id='file'
                  onChange={(e) => setFile(e.target.files[0])}/>
                <label htmlFor="file">
                    <img src={img} alt="addAvatar" />
                    <span>Add an avatar</span>
                </label>
                {fileError ? <p className='error'>Failed to load image</p> : null}
                {error ? <p className='error'>Email already in use, sign in</p> : null}
                <button>Sign up</button>
            </form>
            <p>You do have an account? <Link to="/sign-in">Login</Link></p>
        </div>
    </div>
  )
}

export default Register
import React, { useState } from 'react'
import img from '../../resources/images/addAvatar.png';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Register = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [fileError, setFileError] = useState(false);

  const {uploadUser, 
        updateUserProfile, 
        addUserToDatabase, 
        removeUserProfile} = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Creating user
      const user = await uploadUser(email, password);
      // Updating user profile (image and display name)
      const downloadURL = await updateUserProfile(file, displayName, user);
      // Adding user to database
      await addUserToDatabase(user, downloadURL, displayName);

      navigate("/home"); 
    } catch (error) {
      if (error.message === "auth/email-already-in-use") {
        setEmailError(true);
      } else {
        setFileError(true);
      }
      removeUserProfile();
    }
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
                {emailError ? <p className='error'>Email already in use, sign in</p> : null}
                <button>Sign up</button>
            </form>
            <p>You do have an account? <Link to="/sign-in">Login</Link></p>
        </div>
    </div>
  )
}

export default Register
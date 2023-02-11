import React from 'react'

import img from '../../resources/images/addAvatar.png';

const Register = () => {
  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <h1 className='logo'>React Chat</h1>
            <p className='title'>Register</p>
            <form>
                <input type="text" placeholder='Display name'/>
                <input type="email" placeholder='Email'/>
                <input type="password" placeholder='Password'/>
                <input style={{display: 'none'}} type="file" id='file'/>
                <label htmlFor="file">
                    <img src={img} alt="addAvatar" />
                    <span>Add an avatar</span>
                </label>
                <button>Sign up</button>
            </form>
            <p>You do have an account? Login</p>
        </div>
    </div>
  )
}

export default Register
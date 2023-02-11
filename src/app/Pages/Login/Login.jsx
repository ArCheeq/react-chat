import React from 'react'

const Login = () => {
  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <h1 className='logo'>React Chat</h1>
            <p className='title'>Login</p>
            <form>
                <input type="email" placeholder='Email'/>
                <input type="password" placeholder='Password'/>
                <button>Sign up</button>
            </form>
            <p>You don't have an account? Register</p>
        </div>
    </div>
  )
}

export default Login
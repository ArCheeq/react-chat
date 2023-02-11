import React from 'react'
import './input.scss';

import Img from '../../resources/images/img.png';
import Attach from '../../resources/images/attach.png';

const Input = () => {
  return (
    <div className='input'>
      <input type="text" placeholder='Type something...' />
      <div className="send">
        <img src={Attach} alt="" />
        <input style={{display: 'none'}} type="file" id='file' />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button>Send</button>
      </div>
    </div>
  )
}

export default Input
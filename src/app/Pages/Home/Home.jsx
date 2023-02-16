import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar';
import Chat from '../../components/Chat/Chat';

import { Navigate } from 'react-router-dom';

import userSelector from '../../store/selectors/userSelector';
import { useSelector } from 'react-redux';

import './home.scss';

const Home = () => {
  const {isAuth} = useSelector(userSelector);

  return isAuth ? (
    <div className="home">
        <div className="container">
            <Sidebar />
            <Chat />
        </div>
    </div>
  ) :
  (
    <Navigate to={"/sign-in"} replace/>
  )
}

export default Home
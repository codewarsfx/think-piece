import React,{useContext} from 'react';

import CurrentUser from './CurrentUser';
import SignInAndSignUp from './SignInAndSignUp';
import {userContext} from './context/userContext'

const Authentication = () => {
  
  const user = useContext(userContext)

  return <div>{user ? <CurrentUser {...user} /> : <SignInAndSignUp />}</div>;
};

export default Authentication;

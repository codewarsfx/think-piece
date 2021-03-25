import React from 'react';
import { render } from 'react-dom';
import PostProvider from './components/context/postContext'
import UserProvider from './components/context/userContext'
import { BrowserRouter as Router} from 'react-router-dom'
import './index.scss';
import Application from './components/Application';

render(<Router><UserProvider>
         <PostProvider><Application /></PostProvider></UserProvider></Router>, document.getElementById('root'));

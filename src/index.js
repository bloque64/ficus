import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import Cookie from 'js-cookie';




ReactDOM.render(
  <BrowserRouter><App className="App" /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();

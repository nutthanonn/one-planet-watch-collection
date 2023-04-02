import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import './styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { MyProfileStore } from '@store/MyProfileStore';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <App MyProfileStore={MyProfileStore} />
  </BrowserRouter>,
);

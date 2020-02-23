import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './config/routes'
import axios from 'axios'

function App() {

  const token = localStorage.getItem('Authorization');
  if(token!==null){
      axios.defaults.headers.common['Authorization'] = token;
  }
  axios.defaults.headers.common['Authentication'] = '123OKE';

  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  );
}

export default App;

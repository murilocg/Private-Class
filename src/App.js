import React from 'react';
import Router from './Router';
import {BrowserRouter} from 'react-router-dom'; 
import './App.css';

const App = ({}) => {
  return (
    <BrowserRouter>
      <Router/>
    </BrowserRouter>
  );
}

export default App;

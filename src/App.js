import React, { Component } from 'react';
import MainLayout from './features/layout';
import Classroom from './features/classroom';
import './App.css';

class App extends Component {
  render() {
    return <MainLayout main={<Classroom/>}/>
  }
}

export default App;

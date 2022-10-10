import logo from './logo.svg';
// import './App.css';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie, measureTextWidth } from '@ant-design/plots';
import { Line,Column,Radar } from '@ant-design/plots';
import Dashboard from './Dashboard.js'
import LeaderBoard  from './Leaderboard';
import Login  from './Login';
import Optin from './Optin';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from "react-router-dom";
// import { Routes ,Route } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  // console.log()
  return (
    // <Dashboard/>
    <Router>
      <Routes>

    <Route path='/' element={<Dashboard/>} />
    <Route path='/lb' element={<LeaderBoard/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/optin' element={<Optin/>} />
    </Routes>
    </Router>
  )
}

export default App;

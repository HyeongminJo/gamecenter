import './App.css';
import React, { useState, useEffect, useRef} from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Game() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth - 100;
  canvas.height = window.innerHeight - 100;

  var boy = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
      ctx.fillStyle = 'green';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  boy.draw()
  return (
    boy.draw()
  )
}

function Home() {

  return (
    <div className="bodyDiv">
      <Helmet>
        <title>GameCenter</title>
      </Helmet>
      <nav className="nav">
        <div className="navButton home">
          <NavLink to="/">GameCenter</NavLink>
        </div>
        
      </nav>
      <div className="mainDiv">

      </div>
      <div>
        <canvas id="canvas"><Game /></canvas>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={'Not Found'} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

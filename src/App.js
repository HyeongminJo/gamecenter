import './App.css';
import React, { useState, useEffect, useRef} from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Game() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth - 50;
    canvas.height = window.innerHeight - 100;

    var img2 = new Image();
    img2.src = 'boy.png';

    const boy = {
      x: 10,
      y: 200,
      width: 50,
      height: 50,
      draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        //ctx.drawImage(img2, this.x, this.y)
      }
    };

    var img1 = new Image();
    img1.src = 'cactus.png';

    class Cactus {
      constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
      }
      draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        //ctx.drawImage(img1, this.x, this.y)
      }
    }

    var timer = 0;
    var cactus여러개 = [];
    var 점프timer = 0;
    var animation;

    function 프레임마다실행할거(){
      animation = requestAnimationFrame(프레임마다실행할거);
      timer++;

      ctx.clearRect(0,0, canvas.width, canvas.height);

      if(timer % 300 === 0){
        var cactus = new Cactus();
        cactus여러개.push(cactus);
      }

      cactus여러개.forEach((a, i, o)=>{
        //x좌표가 0미만이면 제거
        if(a.x < 0){
          o.splice(i, 1)
        }
        a.x--;
        충돌(boy, a);

        a.draw();
      })

      //점프기능
      
      if(점프중 == true){
        boy.y--;
        점프timer++;
      }
      if(점프중 == false){
        if(boy.y < 200) {
          boy.y++;
        }
      }
      if(점프timer > 100){
        점프중 = false;
        점프timer = 0;
      }

      boy.draw()
    }

    프레임마다실행할거();

    //충돌확인
    function 충돌(boy, cactus){
      var x축차이 = cactus.x - (boy.x + boy.width);
      var y축차이 = cactus.y- (boy.y + boy.height);
      if(x축차이 < 0 && y축차이 < 0){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation)
      }
    }

    var 점프중 = false;
    document.addEventListener('keydown', function(e){
      if(e.code === 'Space'){
        점프중 = true;
      }
    })
  }, []); // Ensure this effect runs only once after the initial render

  return <canvas ref={canvasRef} />;
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
      <div className="mainDiv"></div>
      <div>
        <Game />
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

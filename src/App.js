import logo from './logo.svg';
import React, { useState, useEffect, useContext } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import Login from './login/Login';
import Movie from './Movie';
import 'bootstrap/dist/css/bootstrap.min.css';
import myCtx from "./store/authCtx";


function App() {
  const autchCtx = useContext(myCtx);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const loginHandler = () => {
  //   setIsLoggedIn(true);
  //   localStorage.setItem("token", "1");
  // };

  // const logoutHandler = () => {
  //   setIsLoggedIn(false);
  //   localStorage.removeItem("token");
  // };

  return (
    <div className="App">

      <Navbar />
      <Routes>
        <Route path="/movie/:id" element={autchCtx.isLoggedIn && <Movie />} />
        <Route path="/home" element={autchCtx.isLoggedIn && <Home onLogout={autchCtx.logoutHandler} />} />
        <Route path="/" element={!autchCtx.isLoggedIn && <Login onLogin={autchCtx.loginHandler} />} />
      </Routes>

      {/* <Router>
        <Routes>
          <Route path="/movie/:id" element={autchCtx.isLoggedIn && <Movie />} />
          <Route path="/home" element={autchCtx.isLoggedIn && <Home onLogout={autchCtx.logoutHandler} />} />
          <Route path="/" element={!autchCtx.isLoggedIn && <Login onLogin={autchCtx.loginHandler} />} />
        </Routes>
      </Router> */}

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;

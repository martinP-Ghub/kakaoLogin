import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import KakaoLoginComplete from "./Components/Login/KakaoLoginComplete"
import KakaoLogin from "./Components/Login/KakaoLogin"

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/kakaoLoginComplete" element={<KakaoLoginComplete />} />
              <Route path="/" element={<KakaoLogin />} />
          </Routes>
      </Router>
  );
}

export default App;

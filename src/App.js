import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import KakaoLoginComplete from "./Components/Login/KakaoLoginComplete"
import KakaoLogin from "./Components/Login/KakaoLogin"

function App() {
  // useEffect(() => {
  //   if (window.Kakao) {
  //     window.Kakao.init(REST_API_KEY); // 발급받은 키를 넣습니다.
  //   }
  // }, []);
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

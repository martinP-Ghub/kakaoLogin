import React, { useEffect, useState } from "react";
import {REST_API_KEY, REDIRECT_URI} from "../AppKey";
import axios from "axios";

function KakaoLogin() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 로그인 버튼 클릭 시, 카카오 로그인 페이지로 이동합니다.
    const loginWithKakao = () => {
        const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
        window.location.href = KAKAO_URL;
    };
    // http://localhost:3002/kakaologinComplete?code=-UOPbx7BtaPK7x6QT29l1SoXHh1dWnWnS7WFyMEWklLT90u8OBFShkIC3mV8nhNr3bAXywoqJVMAAAGIQkzCrg
    // http://localhost:3002/kakaologinComplete?code=1kwTT8Q9BHg_8iUewatrp4P9kOruI4jwVV5vBUj0en2FJ7Gi3klnXbI7J-ms4D_ceixp-wopyNoAAAGIQlGoeg


    // 카카오 로그인 후 리다이렉트된 경우에 실행되는 함수
    const handleToken = async () => {
        const url = new URL(window.location.href);
        const authorizationCode = url.searchParams.get("code");

        if (authorizationCode) {
            try {
                const response = await axios.post(
                    "https://kauth.kakao.com/oauth/token",
                    {
                        grant_type: "authorization_code",
                        client_id: REST_API_KEY,
                        redirect_uri: REDIRECT_URI,
                        code: authorizationCode,
                    }
                );

                const { access_token } = response.data;

                if (access_token) {
                    // access_token을 저장하거나 사용자 정보를 가져오는 등의 작업을 수행합니다.
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        handleToken();
    }, []);

    return (
        <div>
            {isLoggedIn ? (
                <div>You are already logged in.</div>
            ) : (
                <button onClick={loginWithKakao}>Login with Kakao</button>
            )}
        </div>
    );
}

export default KakaoLogin;

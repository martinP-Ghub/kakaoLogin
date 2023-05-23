import React, { useEffect , useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {REST_API_KEY, REDIRECT_URI} from "../AppKey";
import axios from 'axios';
import qs from 'qs';
import KakaoLogin from "./KakaoLogin";  // 추가

const KakaoRedirect = () => {
    const url = new URL(window.location.href);
    const [authorizationCode, setAuthorizationCode] = useState(url.searchParams.get('code'));
    const [isValue, setIsValue] = useState({});

    useEffect(() => {
        if (authorizationCode) {
            // 토큰 요청 API에 보낼 데이터
            const data = {
                grant_type: 'authorization_code',
                client_id: REST_API_KEY,
                redirect_uri: REDIRECT_URI,
                code: authorizationCode,
            };

            const options = {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' }, // 수정
                data: qs.stringify(data), // 수정
                url: 'https://kauth.kakao.com/oauth/token',
            };

            axios(options) // 수정
                .then((response) => {
                    setIsValue(response.data);
                    localStorage.setItem('token', response.data.access_token);
                    console.log(response.data)
                })
                .catch((error) => {
                    setIsValue('토큰 요청 실패')
                    console.error('토큰 요청 실패', error);
                });
        }
    }, [authorizationCode]);

    return (
        <div>
            {isValue == '토큰 요청 실패' ? (
                <div>로그인 중...</div>
            ) : (
                <>
                    <div>access_token : {JSON.stringify(isValue.access_token)}</div>
                    <div>token_type : {JSON.stringify(isValue.token_type)}</div>
                    <div>refresh_token : {JSON.stringify(isValue.refresh_token)}</div>
                    <div>id_token : {JSON.stringify(isValue.id_token)}</div>
                    <div>expires_in : {JSON.stringify(isValue.expires_in)}</div>
                    <div>scope : {JSON.stringify(isValue.scope)}</div>
                    <div>refresh_token_expires_in : {JSON.stringify(isValue.refresh_token_expires_in)}</div>
                </>
            )}
        </div>
    );
};

export default KakaoRedirect;




// import React, { useEffect } from 'react';
// import {REST_API_KEY, REDIRECT_URI} from "../AppKey";
// import axios from 'axios';
//
// const KakaoRedirect = () => {
//     useEffect(() => {
//         const url = new URL(window.location.href);
//         const authorizationCode = url.searchParams.get('code');
//
//         if (authorizationCode) {
//             // 토큰 요청 API에 보낼 데이터
//             const data = {
//                 grant_type: 'authorization_code',
//                 client_id: REST_API_KEY,
//                 redirect_uri: REDIRECT_URI,
//                 code: authorizationCode,
//             };
// console.log(data)
//             axios
//                 .post('https://kauth.kakao.com/oauth/token', data)
//                 .then((response) => {
//                     console.log(response.data);
//                     console.log('11')
//                 })
//                 .catch((error) => {
//                     console.error('토큰 요청 실패', error);
//                 });
//         }
//     }, [window.location.href]);
//
//     return <div>로그인 중...</div>;
// };
//
// export default KakaoRedirect;

import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {REST_API_KEY, REDIRECT_URI} from "../AppKey";
import {BACKEND_SERVER_AD} from "../Properties";
import axios from 'axios';
import qs from 'qs';

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
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(data), // 수정
                url: 'https://kauth.kakao.com/oauth/token',
            };

            axios(options) // 수정
                .then((response) => {
                    setIsValue(response.data);
                    userInfo(response.data.access_token);
                    localStorage.setItem('token', response.data.access_token);
                    console.log(response.data)
                })
                .catch((error) => {
                    setIsValue('토큰 요청 실패')
                    console.error('토큰 요청 실패', error);
                });
        }


    }, [authorizationCode]);

    const userInfo = (accessToken) => {
        const userData = {
            method: 'GET',
            headers: {'Authorization' : `Bearer ${accessToken}`},
            url : 'https://kapi.kakao.com/v2/user/me',
        }

        axios(userData)
            .then((response) => {
                console.log(response.data)
                // document.querySelector('.info').textContent = JSON.stringify(response.data);

                sendDataToBackend({
                    eMail: response.data.kakao_account.email,
                    gender: response.data.kakao_account.gender,
                    name : response.data.kakao_account.profile.nickname,
                });
            })
            .catch((error) => {
                console.error('토큰 실패', error)
            })
    }


    const sendDataToBackend = async (data) => {
        try {
            console.log('123')
            const response = await axios.post(BACKEND_SERVER_AD + '/api/loginInfo', data);

            console.log(response.data);
        } catch (error) {
            console.error(error);

        }
    }

    return (
        <div>
            {isValue === '토큰 요청 실패' ? (
                <div>로그인 중...</div>
            ) : (
                <div className={'info'} style={{wordBreak: 'break-all'}}>
                    <div>access_token : {JSON.stringify(isValue.access_token)}</div>
                    <div>token_type : {JSON.stringify(isValue.token_type)}</div>
                    <div>refresh_token : {JSON.stringify(isValue.refresh_token)}</div>
                    <div>id_token : {JSON.stringify(isValue.id_token)}</div>
                    <div>expires_in : {JSON.stringify(isValue.expires_in)}</div>
                    <div>scope : {JSON.stringify(isValue.scope)}</div>
                    <div>refresh_token_expires_in : {JSON.stringify(isValue.refresh_token_expires_in)}</div>
                </div>
            )}
        </div>
    );
};

export default KakaoRedirect;
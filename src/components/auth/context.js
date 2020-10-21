import React, { useState, useEffect, useCallback } from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const API = "https://api-js401.herokuapp.com";

export const LoginContext = React.createContext();


function LoginProvider (props) {

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({})
    const [token, setToken] = useState();


    const can = (capability) => {
        return state.user?.capabilities?.includes(capability);
    }

    const login = (username, password) => {
        const auth = {username, password};

        console.log(auth);
        axios.post(`${API}/signin`, {}, {auth})
        .then(response => {
            console.log(response.data)
            validateToken(response?.data?.token);
        })
        .catch(console.error);
    }

    const signup = (body) => {
        // const data = JSON.stringify(body);
        axios({
            method: 'post',
            url: `${API}/signup`,
            data: body
        })
        .then(response => {
            console.log(response.data)
            validateToken(response?.data?.token);
        })
        .catch(console.error);
    }

    const validateToken = useCallback( token => {
        try {
        const user = jwt.verify(token, "supersecret");
        console.log(user);
        setLoginState(true, token, user);
        }
        catch (e) {
        console.log('in validate token');
        setLoginState(false, null, {});
        console.log('Token Validation Error', e);
        }

    },[]);

    const logout = () => {
        setLoginState(false, null, {});
    };

    const setLoginState = async (loggedIn, token, user) => {
        console.log()
        cookie.save('auth', token);
        console.log('in set Login state')
        console.log(user)
        await setToken(token);
        await setLoggedIn(loggedIn);
        await setUser(user)
    };

    useEffect(() => {
        const qs = new URLSearchParams(window.location.search);
        const cookieToken = cookie.load('auth');
        const token = qs.get('token') || cookieToken || null;
        validateToken(token);
    },[validateToken]);

    const state = {
        loggedIn,
        login,
        signup,
        logout,
        can: can,
        user,
        token,
    };


        return (
        <LoginContext.Provider value={state}>
            {props.children}
        </LoginContext.Provider>
    );

}

export default LoginProvider;
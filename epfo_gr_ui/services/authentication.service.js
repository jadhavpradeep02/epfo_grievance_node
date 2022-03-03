import { loginUrl } from './../configs/api.config';
import { isOnline } from './../configs/api.config';

let loginData = {
    authenticated: false,
    loggedIn: false,
    token: ''
};

let loginDataDemo = {
    authenticated: true,
    loggedIn: true,
    token: 'sdfsdfsdfsd'
};

const clearLogin = () => {
    loginData = {
        authenticated: false,
        loggedIn: false,
        token: ''
    };
}

const addBearerAuth = () => `bearer ${loginData?.token}`;

const getUserRole = () => loginData.userData?.role;


const login = async (loginDetails, successFn, failFn) => {
    // await fetch()
    const checkResp = await fetch( loginUrl() , {
        method: 'POST',
        body: JSON.stringify(loginDetails),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        'Access-Control-Allow-Origin': '*'
    }).then((response) => response.json())
    .then((jsonResp) => {
        if(jsonResp){
            console.log(jsonResp);
            // console.log('Token : ', jsonResp, jsonResp.response.token)
            loginData = {
                authenticated: true,
                loggedIn: true,
                userData:  isOnline() ? jsonResp : jsonResp.response.user,
                token: isOnline() ? jsonResp.token : jsonResp.response.token
            };
            successFn(jsonResp);
        } else {
            failFn();
            clearLogin()
        }
    })
    .catch(function() {
        failFn();
        clearLogin();
    });
}

const logout = () => {
    loginData = {};
    window.location.href = '';
}

const checkAuth = () => loginData.authenticated || loginData.loggedIn;

export const AuthService = {
    checkAuth,
    login,
    logout,
    addBearerAuth,
    getUserRole
}
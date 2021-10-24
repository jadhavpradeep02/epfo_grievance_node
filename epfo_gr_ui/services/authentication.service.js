import { loginUrl } from './../configs/api.config';
let loginData = {
    authenticated: false,
    loggedIn: false,
    token: ''
};

const clearLogin = () => {
    loginData = {
        authenticated: false,
        loggedIn: false,
        token: ''
    };
}

const addBearerAuth = () => `bearer ${loginData?.token}`;


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
        if(jsonResp.token){
            console.log(jsonResp);
            console.log('Token : ', jsonResp, jsonResp.token)
            loginData = {
                authenticated: true,
                loggedIn: true,
                token: jsonResp.token
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
    addBearerAuth
}
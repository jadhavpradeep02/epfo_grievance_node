let loginData = {};

const login = () => {
    loginData = {
        authenticated: true,
        loggedIn: true,
        token: ''
    };
}

const logout = () => {
    loginData = {};
    window.location.href = '';
}

const checkAuth = () => loginData.authenticated || loginData.loggedIn;

export const AuthService = {
    checkAuth,
    login,
    logout
}
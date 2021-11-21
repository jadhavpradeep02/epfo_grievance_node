
const BaseURL= 'http://localhost';
const onlineURLBase = 'https://61707f6123781c0017289a77.mockapi.io/api';
const BasePort= "3000";
let onlineMode = false;
import { AuthService } from "../services/authentication.service";

const localURLBase = () => BaseURL + ":" + BasePort + '/api';

export const setLocal = () => {
    onlineMode = false;
}

export const isOnline = () => {
    return onlineMode === true;
}

export const toggleMode = () => {
    if(onlineMode){
        onlineMode = false;
    } else {
        onlineMode = true;
    }
    console.log('Current mode :'+onlineMode);
}

export const getMode = () => {
    if(onlineMode){
        return 'online'
    } else {
        return 'local'
    }
}

export const commonAPIConfig = {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
}

export const addVisitorURL = () => {
    return onlineMode ? `${onlineURLBase}/visitor` : `${localURLBase()}/visitor/add`;
}

export const loginUrl = () => {
    return onlineMode ? `${onlineURLBase}/login` : `${localURLBase()}/user/login`;
}

export const getAllVisitorsUrl = () => {
    return onlineMode ? `${onlineURLBase}/visitor` : `${localURLBase()}/visitor`;
}

export const updateVisitorUrl = () => {
    return onlineMode ? `${onlineURLBase}/visitor/` : `${localURLBase()}/visitor/update`;
}

export const deleteUserUrl = (visitorId) => {
    return onlineMode ? `${onlineURLBase}/visitor/${visitorId}` : `${localURLBase()}/visitor/delete?visitor_id=${visitorId}`;
}

export const searchUrl = () => {
    return onlineMode ? `${onlineURLBase}/search` : `${localURLBase()}/visitor/search`;
}

export const reportsURL = () => {
    return onlineMode ? `${onlineURLBase}/search` : `${localURLBase()}/visitor/report`;
}

export const dashboardURL = () => {
    return onlineMode ? `${onlineURLBase}/status` : `${localURLBase()}/visitor/status`; // Pradeep change "status" to any word you want for dashboard API
}

export const setServer = (strServer) => {
    if(strServer === "local"){
        onlineMode = false;
    } else {
        onlineMode = true;
    }
}
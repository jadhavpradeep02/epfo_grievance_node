
const BaseURL= 'http://localhost';
const OnlineBaseUR = 'https://61707f6123781c0017289a77.mockapi.io/api/';
const BasePort= "3000";
const onlineMode = false;

const formUrlBase = () => BaseURL + ":" + BasePort;
    
/* export const APIConfigLocal = {
    addVisitor: () => formUrlBase() + '/api/visitor/add',
    getAllVisitors: () => formUrlBase() + '/api/visitor',
    updateVisitor: () => formUrlBase() + '/api/visitor/update',
    deleteVisitor: (visitorId) => formUrlBase() + '/api/visitor/delete?visitor_id='+visitorId
}

export const APIConfigOnline = {
    addVisitor: () => OnlineBaseUR + '/visitor',
    getAllVisitors: () => OnlineBaseUR + '/visitor',
    updateVisitor: (visitorId) => OnlineBaseUR + '/visitor/'+visitorId,
    deleteVisitor: (visitorId) => OnlineBaseUR + '/api/visitor/delete?visitor_id='+visitorId
} */

export const addVisitorURL = () => {
    return onlineMode ? OnlineBaseUR + '/visitor' : formUrlBase() + '/api/visitor/add';
}

export const loginUrl = () => {
    return onlineMode ? `${OnlineBaseUR}login` : `${formUrlBase()}/api/user/login`;
}

export const getAllVisitorsUrl = () => {
    return onlineMode ? `${OnlineBaseUR}visitor` : `${formUrlBase()}/api/visitor`;
}

export const updateVisitorUrl = (visitorId) => {
    return onlineMode ? `${OnlineBaseUR}visitor/'${visitorId}` : `${formUrlBase()}/api/visitor/update${visitorId}`;
}

export const deleteUserUrl = (visitorId) => {
    return onlineMode ? `${OnlineBaseUR}visitor/'${visitorId}` : `${formUrlBase()}/api/visitor/delete?visitor_id=${visitorId}`;
}

export const searchUrl = () => {
    return onlineMode ? `${OnlineBaseUR}visitor` : `${formUrlBase()}/api/search`;
}

export const setServer = (strServer) => {
    if(strServer === "local"){
        onlineMode = false;
    } else {
        onlineMode = true;
    }
}
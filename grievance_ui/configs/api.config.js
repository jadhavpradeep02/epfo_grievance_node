
const BaseURL= 'http://localhost';
const OnlineBaseUR = 'https://61707f6123781c0017289a77.mockapi.io/api/';
const BasePort= "3000";
const onlineMode = true;

const formUrlBase= () => BaseURL + ":" + BasePort;
    
export const APIConfigLocal = {
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
}
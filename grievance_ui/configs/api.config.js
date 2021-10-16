
const BaseURL= 'http://localhost';
const BasePort= "3000";

const formUrlBase= () => BaseURL + ":" + BasePort;
    
export const APIConfig = {
    addVisitor: () => formUrlBase() + '/api/visitor/add',
    getVisitors: () => formUrlBase() + '/api/visitor',
    updateVisitor: () => formUrlBase() + '/api/visitor/update',
    deleteVisitor: (visitorId) => formUrlBase() + '/api/visitor/delete?visitor_id='+visitorId
}
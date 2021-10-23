import { addVisitorURL, deleteUserUrl, updateVisitorUrl, getAllVisitorsUrl } from "../configs/api.config";
import { AuthService } from './authentication.service.js';

let currentEditVisitor = null;

const addNewVisitor = async (visitorData, callbackFn) => {
    /* axios.post(
        APIConfig.addVisitor(),
        visitorData
    ).then( response => console.log(response.data)); */

    const resp = await fetch( addVisitorURL(), {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': AuthService.addBearerAuth()
        },
        redirect: 'follow',
        body: JSON.stringify(visitorData)
    }).then((respose) => respose.json())
    .then((respjson) => {
        if(respjson){
            if(callbackFn){
                callbackFn();
            }
        }
    })
    return resp.json(); // parses JSON response into native JavaScript objects
    
}

const fetchVisitors = async () => {
    const userData = await fetch(getAllVisitorsUrl(),{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': AuthService.addBearerAuth()
        }
    });
    return userData.json();
}

const deleteVisitor = async (visitor_id) => {
    const userData = await fetch(deleteUserUrl(),{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': AuthService.addBearerAuth()
        }
    });
}

const updateVisitor = async (visitor_id) => {
    const userData = await fetch(updateVisitorUrl(),{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': AuthService.addBearerAuth()
        }
    });
}

const setForEdit = (visitor) => {
    currentEditVisitor = {...visitor};
}

const getEditData = () => {
    return currentEditVisitor;
}

const visitorUpdated = () => {
    currentEditVisitor = null;
}

export const VisitorService = {
    fetchVisitors,
    addNewVisitor,
    deleteVisitor,
    updateVisitor,
    setForEdit,
    visitorUpdated,
    getEditData
}
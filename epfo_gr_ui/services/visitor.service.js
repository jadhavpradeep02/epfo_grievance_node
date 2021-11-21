import { addVisitorURL, deleteUserUrl, updateVisitorUrl, getAllVisitorsUrl, commonAPIConfig } from "../configs/api.config";
import { AuthService } from './authentication.service.js';

let currentEditVisitor = null;

const getCommonHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Authorization': AuthService.addBearerAuth()
    };
}

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
    })
    .then((respose) => respose.json())
    .then((respjson) => {
        if(respjson){
            if(callbackFn){
                callbackFn();
            }
        }
    })
}

const fetchVisitors = async () => {
    const userData = await fetch(getAllVisitorsUrl(),{
        headers: getCommonHeaders(),
    });
    return userData.json();
}

const deleteVisitor = async (visitor_id) => {
    const userData = await fetch(deleteUserUrl(),{
        headers: getCommonHeaders()
    });
}

const updateVisitor = async (visitorData, successFn) => {
    const resp = await fetch( updateVisitorUrl(), {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: getCommonHeaders(),
        redirect: 'follow',
        body: JSON.stringify(visitorData)
    })
    .then((respose) => respose.json())
    .then((respjson) => {
        if(respjson){
            if(successFn){
                successFn();
            }
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
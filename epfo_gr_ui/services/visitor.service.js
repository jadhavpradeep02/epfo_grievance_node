import { addVisitorURL, deleteUserUrl, getUsersURL, addUserURL, updateVisitorUrl, getAllVisitorsUrl, getVisitorDataURL, getMemberDataURL, commonAPIConfig, closeGrievanceUrl } from "../configs/api.config";
import { AuthService } from './authentication.service.js';

let currentEditVisitor = null;
let currentEstblishment = null;

const getCommonHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Authorization': AuthService.addBearerAuth()
    };
}

const addNewUser = async (userData, successCallbackFn, errCallabackFn) => {
    try {
        const resp = await fetch( addUserURL(), {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthService.addBearerAuth()
            },
            redirect: 'follow',
            body: JSON.stringify(userData)
        })
        .then((respose) => {
            if(successCallbackFn){
                successCallbackFn(userData);
            }
        })
    } catch (error) {
        if(errCallabackFn){
            errCallabackFn(userData, error);
        }
    }
    
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

const closeGriavance = async (visitorData, callbackFn) => {
    const resp = await fetch( closeGrievanceUrl(), {
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

const fetchUsersData = async (uan) => {
    const userData = await fetch(getUsersURL(),{
        headers: getCommonHeaders(),
    });
    return userData.json();
}

const fetchMemberData = async (grievance_id) => {
    const userData = await fetch(getMemberDataURL()+'?grievance_id='+grievance_id,{
        headers: getCommonHeaders(),
    });
    return userData.json();
}

const fetchVisitors = async () => {
    const userData = await fetch(getAllVisitorsUrl(),{
        headers: getCommonHeaders(),
    });
    return userData.json();
}

const fetchVisitorData = async (visitor_id) => {
    const userData = await fetch(getVisitorDataURL()+'?visitor_id='+visitor_id,{
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

const setEstBlishment = ( EstData ) => {
    currentEstblishment = {...EstData};
}

const getEstBlishment = () => {
    return currentEstblishment;
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
    getEditData,
    getEstBlishment,
    setEstBlishment,
    closeGriavance,
    fetchMemberData,
    fetchVisitorData,
    addNewUser,
    fetchUsersData
}
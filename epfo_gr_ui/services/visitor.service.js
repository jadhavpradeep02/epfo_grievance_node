import { addVisitorURL, deleteUserUrl, updateVisitorUrl, getAllVisitorsUrl } from "../configs/api.config";

const addNewVisitor = async (visitorData) => {
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
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByYWRlZXAiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImphZGhhdnByYWRlZXAwMkBnbWFpbC5jb20iLCJpYXQiOjE2MzM4NTI2ODQsImV4cCI6MTYzMzg1NjI4NH0.qWWquy66Yf6N9jagGVMnr6kI3cU4O2LgZP1efbywaho'
        },
        redirect: 'follow',
        body: JSON.stringify(visitorData)
    });
    return resp.json(); // parses JSON response into native JavaScript objects
}

const fetchVisitors = async () => {
    const userData = await fetch(getAllVisitorsUrl());
    return userData.json();
}

const deleteVisitor = async (visitor_id) => {
    const userData = await fetch(deleteUserUrl());
}

const updateVisitor = async (visitor_id) => {
    const userData = await fetch(updateVisitorUrl());
}

export const VisitorService = {
    fetchVisitors,
    addNewVisitor,
    deleteVisitor,
    updateVisitor
}
import { reportsURL, deleteUserUrl, updateVisitorUrl, getAllVisitorsUrl, commonAPIConfig } from "../configs/api.config";
import { AuthService } from './authentication.service.js';

const getCommonHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Authorization': AuthService.addBearerAuth()
    };
}

const getReports = async (reportParams, callbackFn) => {
    /* axios.post(
        APIConfig.addVisitor(),
        visitorData
    ).then( response => console.log(response.data)); */

    const resp = await fetch( reportsURL(), {
        method: 'POST',
        headers: getCommonHeaders(),
        ...commonAPIConfig,
        body: JSON.stringify(reportParams)
    })
    .then((respose) => respose.json())
    .then((respjson) => {
        if(respjson){
            if(callbackFn){
                callbackFn(respjson);
            }
        }
    })
    return resp.json(); // parses JSON response into native JavaScript objects
}

export const ReportsService = {
    getReports
}
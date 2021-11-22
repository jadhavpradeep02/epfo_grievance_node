import { dashboardURL, commonAPIConfig } from "../configs/api.config";
import { AuthService } from './authentication.service.js';

const getCommonHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Authorization': AuthService.addBearerAuth()
    };
}

const getDashboardData = async (callbackFn) => {
    const resp = await fetch( dashboardURL(), {
        method: 'GET',
        headers: getCommonHeaders(),
        ...commonAPIConfig
    })
    .then((respose) => respose.json())
    .then((respjson) => {
        if(respjson){
            if(callbackFn){
                callbackFn(respjson);
            }
        }
    });
}

export const DashboardService = {
    getDashboardData
}
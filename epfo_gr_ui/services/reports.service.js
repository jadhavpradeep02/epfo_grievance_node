import {
  reportsURL,
  topEntitiesURL,
  commonAPIConfig,
} from "../configs/api.config";
import { AuthService } from "./authentication.service.js";

const getCommonHeaders = () => {
  return {
    "Content-Type": "application/json",
    Authorization: AuthService.addBearerAuth(),
  };
};

const getReports = async (reportParams, callbackFn) => {
  const resp = await fetch(reportsURL(), {
    method: "POST",
    headers: getCommonHeaders(),
    ...commonAPIConfig,
    body: JSON.stringify(reportParams),
  })
    .then((respose) => respose.json())
    .then((respjson) => {
      if (respjson) {
        if (callbackFn) {
          callbackFn(respjson);
        }
      }
    });
  // return resp.json(); // parses JSON response into native JavaScript objects
};

const getTopEntities = async (callbackFn) => {
  const resp = await fetch(topEntitiesURL(),{
    headers: getCommonHeaders()
  }).then((respose) => respose.json()).then((respjson) => {
    if (respjson) {
      if (callbackFn) {
        callbackFn(respjson);
      }
    }
  });
}

export const ReportsService = {
  getReports,
  getTopEntities
};

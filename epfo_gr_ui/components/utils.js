import { html } from "lit";

const grvnc_category_map = {
    "Death_case": "Death Case",
    "Withdraw_F19": "Withdrawal Form 19",
    "Transfer_F13":"Transfer Form13",
    "Advance_F31": "Advanced Form31",
    "Pension": "Pension",
    "KYC_Update": "Modify KYC",
    "Non_Enrollment": "Non enrollment",
    "Other": "Misc",
}

export const getStatus = function (grvncObj){
    if(grvncObj.status){
        if(String(grvncObj.status).toLowerCase() === "in_progress"){
            if(grvncObj.visit_at){
                var last_visit = new Date(grvncObj.visit_at);
                var todayDate = new Date();
                const diffTime = Math.abs(todayDate - last_visit);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return 'Pending since '+diffDays+' days';
            }
            return 'Pending since [No date]';
        } else if(String(grvncObj.status).toLowerCase() === "resolved") { //resolved
            return 'Resolved on '+new Date(grvncObj.visit_at).toLocaleDateString();
        }  else {
            return 'Unkown status: '+grvncObj.status;
        }
    }
    return '';
}

export const renderCell = function (col, row){
    if(col.path === 'visitor_name'){
        return html `<a href=${`#visitor?id=${row.visitor_id}`}>${row[col.path]}</a>`
    }
    if(col.path === 'member_name'){
        return html `<a href=${`#member?uan=${row.uan}`}>${row[col.path]}</a>`
    }
    if(col.path === 'status'){
        return getStatus(row)
    }
    if(col.path === "grievance_category"){
        return row[col.path] ? row[col.path] : 'Invalid category'
    }
    if(col.type && col.type === "datetime"){
        return html `${renderDate(row[col.path])}`
    }
    return  html `${row[col.path]}`
}

export const renderDate = function (dateStr){
    return dateStr ? new Date(dateStr).toLocaleDateString() : 'Invalid date';
}
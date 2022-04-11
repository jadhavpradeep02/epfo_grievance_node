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

export const getStatus = function (grvncObj, col){
    if(grvncObj.status){
        if(String(grvncObj.status).toLowerCase() === "in_progress"){
            if(grvncObj.created_at){
                var last_visit = new Date(grvncObj.created_at);
                var todayDate = new Date();
                const diffTime = Math.abs(todayDate - last_visit);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return 'Pending since '+diffDays+' days';
            }
            return 'Pending since [No date]';
        } else if(String(grvncObj.status).toLowerCase() === "resolved") {
            let calculator = col.calculateAttrib ? col.calculateAttrib : 'visit_at'
            return 'Resolved on '+ renderDate(grvncObj[calculator]);
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
    if(col.path === 'member_name'){ // Add grievance id here as Member can have no UAN
        return html `<a href=${`#member?grievance_id=${row.grievance_id}`}>${row[col.path]}</a>`
    }
    if(col.path === 'status'){
        return getStatus(row, col)
    }
    if(col.path === "grievance_category"){
        return grvnc_category_map[row[col.path]] ? grvnc_category_map[row[col.path]] : 'Invalid category'
    }
    if(col.type && col.type === "datetime"){
        return html `${renderDate(row[col.path])}`
    }
    return  html `${row[col.path]}`
}

export const renderDate = function (dateStr){
    if(!dateStr){
        return 'Invalid date';
    }
    let date = new Date(dateStr);
    let dateNum = date.toLocaleDateString('en-us',{day: 'numeric'});
    let month = date.toLocaleDateString('en-us',{month: 'numeric'});
    let year = date.toLocaleDateString('en-us',{year: 'numeric'});
    const FormattedDate = `${dateNum}-${month}-${year}`
    // console.log(FormattedDate) // 26-03-2022
    return FormattedDate;
    // return dateStr ? new Date(dateStr).toLocaleDateString() : 'Invalid date';
}

export const getTodayDateSelectorValue = function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 

    today = yyyy+'-'+mm+'-'+dd;                
    return today;
}
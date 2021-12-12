const connection = require('../config/dbConnect');
var Q = require('q');
const config = require('../config/config.json');

service = {};

service.getAllVisitors = getAllVisitors;
service.addVisitor = addVisitor;
service.updateVisitor = updateVisitor;
service.deleteVisitor = deleteVisitor;
service.searchVisitor = searchVisitor;
service.getReport = getReport;
service.getDashboardData = getDashboardData;
service.closeGrievance = closeGrievance;
service.getTopVisits = getTopVisits;
module.exports = service;

function getAllVisitors(req) {
    var deferred = Q.defer();
    let LIMIT = 100; //default limit set as 100
    let visitor_id = "";

    select_query = 'select v.visitor_id, visitor_name, visitor_mobile, visitor_email, uan, pf_account_no, establishment_name, created_at, section, grievance_category, no_of_visit, attended_at_level, grievance_details, status from visitors as v INNER JOIN grievance as g ON v.visitor_id = g.visitor_id';

    if(req.visitor_id) {
        select_query += ' where v.visitor_id = ' + req.visitor_id;
    }

    if(req.body.limit) {
        select_query += ' LIMIT ' + req.limit;
    }
    connection.query(select_query, (err, rows) => {
        if(err) throw deferred.reject(err);
        deferred.resolve(rows);
    });
    return deferred.promise;
}

function addVisitor(req) {
    var deferred = Q.defer();
    let response = {};
    let visitor_name = req.body.visitor_name;
    let visitor_mobile = req.body.visitor_mobile;
    let visitor_email =   req.body.visitor_email;

    let member_name = req.body.member_name;
    let member_phone = req.body.member_phone;
    let uan = req.body.uan;
    let pf_account_no = req.body.pf_account_no;
    let ppo_number = req.body.ppo_number;
    let establishment_name = req.body.establishment_name;
    let establishment_id = req.body.establishment_id;
    let task_id = req.body.estb_account_task_id;
    let grievance_category = req.body.grievance_category;
    let section = req.body.section;
    let no_of_visit = req.body.no_of_visit;
    let attended_at_level = req.body.attended_at_level;
    let grievance_details = req.body.grievance_details;
    let status = req.body.status;
 
    //before add new search for existing
    var select_query = `SELECT * FROM visitors WHERE visitor_mobile= '${visitor_mobile}'`;
    connection.query(select_query, function(err, data) {
        if(data.length > 0) {
            let visitor_id = data[0].visitor_id;

            var insert_grievance = `INSERT INTO grievance (grievance_id, visitor_id, member_name, member_mobile, uan, pf_account_no, ppo_number, establishment_name, establishment_id, task_id, section, grievance_category, status, visited_at) VALUES (NULL, '${visitor_id}', '${member_name}', '${member_phone}', '${uan}', '${pf_account_no}', '${ppo_number}', '${establishment_name}', '${establishment_id}', '${task_id}', '${section}', '${grievance_category}', '${status}', now())`;

            console.log("insert query-", insert_grievance)
            connection.query(insert_grievance, function(err, result) {
                if (err) throw err;
                console.log("Successfully inserted grievance: ")
                let grievance_id = result.insertId;
                var insert_visit = `INSERT INTO visits (visit_id, grievance_id, no_of_visit, attended_at_level, grievance_details, visit_at) VALUES (NULL, '${grievance_id}', '${no_of_visit}', '${attended_at_level}', '${grievance_details}', now())`;

                connection.query(insert_visit, function(err, result) {
                    response.status = "200";
                    response.message = "Grievance and Visitor Added successfully";
                    deferred.resolve(response);
                });
            })
        } else {
            var insert_sql = `INSERT INTO visitors (visitor_id, visitor_name, visitor_mobile, visitor_email, created_at) VALUES (NULL, '${visitor_name}', '${visitor_mobile}', '${visitor_email}', now())`;
            console.log("insert query 1 -", insert_sql)
            connection.query(insert_sql, function (err, result) {
                if (err) throw err;
                console.log('The data is inserted successfully into visitor table');
                let visitor_id = result.insertId;

                var insert_grievance = `INSERT INTO grievance (grievance_id, visitor_id, member_name, member_mobile, uan, pf_account_no, ppo_number, establishment_name, establishment_id, task_id, section, grievance_category, status, visited_at) VALUES (NULL, '${visitor_id}', '${member_name}', '${member_phone}', '${uan}', '${pf_account_no}', '${ppo_number}', '${establishment_name}', '${establishment_id}', '${task_id}', '${section}', '${grievance_category}', '${status}', now())`;
                console.log("insert query-", insert_grievance)
                connection.query(insert_grievance, function(err, result) {
                    if (err) throw err;
                    console.log("Successfully inserted grievance: ");
                    let grievance_id = result.insertId;

                    var insert_visit = `INSERT INTO visits (visit_id, grievance_id, no_of_visit, attended_at_level, grievance_details, visit_at) VALUES (NULL, '${grievance_id}', '${no_of_visit}', '${attended_at_level}', '${grievance_details}', now())`;

                    connection.query(insert_visit, function(err, result) {
                        response.status = "200";
                        response.message = "Grievance and Visitor Added successfully";
                        deferred.resolve(response);
                    });
                })
            });
            return deferred.promise;
        }
    });
    return deferred.promise;
    
}

function updateVisitor(req) {
    var deferred = Q.defer();
    let response = {};

    let visitor_name = req.body.visitor_name;
    let visitor_mobile = req.body.visitor_mobile;
    let visitor_email =   req.body.visitor_email;

    let grievance_id = req.body.grievance_id;
    let member_name = req.body.member_name;
    let member_phone = req.body.member_phone;
    let uan = req.body.uan;
    let pf_account_no = req.body.pf_account_no;
    let ppo_number = req.body.ppo_number;
    let establishment_name = req.body.establishment_name;
    let establishment_id = req.body.establishment_id;
    let task_id = req.body.estb_account_task_id;
    let grievance_category = req.body.grievance_category;
    let section = req.body.section;
    let no_of_visit = req.body.no_of_visit;
    let attended_at_level = req.body.attended_at_level;
    let grievance_details = req.body.grievance_details;
    let status = req.body.status;

    var update_grievance = `UPDATE grievance SET member_name='${member_name}', member_mobile='${member_phone}', uan='${uan}', pf_account_no='${pf_account_no}', ppo_number='${ppo_number}', establishment_name='${establishment_name}', establishment_id='${establishment_id}', task_id='${task_id}', section='${section}', grievance_category='${grievance_category}', status='${status}' WHERE grievance_id='${grievance_id}'`;

    console.log("update query-", update_grievance)
    connection.query(update_grievance, function(err, result) {
        if (err) throw err;
        console.log("Successfully updated grievance: ")
        var insert_visit = `INSERT INTO visits (visit_id, grievance_id, no_of_visit, attended_at_level, grievance_details, visit_at) VALUES (NULL, '${grievance_id}', '${no_of_visit}', '${attended_at_level}', '${grievance_details}', now())`;

        connection.query(insert_visit, function(err, result) {
            response.status = "200";
            response.message = "Grievance and Visitor Added successfully";
            deferred.resolve(response);
        });
    })
    return deferred.promise;
}

function deleteVisitor(req) {
    var deferred = Q.defer();
    let visitor_id = req.query.visitor_id;
    let response = {};

    delete_query = `DELETE from visitors WHERE visitor_id = ${visitor_id}`;

    connection.query(delete_query, (err, result) => {

        if(err) throw deferred.reject(err);
        console.log('The data from visitor table deleted: \n');
        response.status = "200";
        response.message = "Record deleted successfully";
        deferred.resolve(response);
    });
    return deferred.promise;
}

function closeGrievance(req) {
    var deferred = Q.defer();
    let response = {};

    let grievance_id = req.body.grievance_id;
    let status = req.body.status;

    let attended_at_level = req.body.attended_at_level;
    let no_of_visit = req.body.no_of_visit;
    let grievance_details = req.body.grievance_details;

    var update_grievance = `UPDATE grievance SET status='${status}' WHERE grievance_id='${grievance_id}'`;

    console.log("update query-", update_grievance)
    connection.query(update_grievance, function(err, result) {
        if (err) throw err;
        console.log("Successfully updated grievance: ")
        var insert_visit = `INSERT INTO visits (visit_id, grievance_id, no_of_visit, attended_at_level, grievance_details, visit_at) VALUES (NULL, '${grievance_id}', '${no_of_visit}', '${attended_at_level}', '${grievance_details}', now())`;

        connection.query(insert_visit, function(err, result) {
            response.status = "200";
            response.message = "Grievance and Visitor Status closed successfully";
            deferred.resolve(response);
        });
    })
    return deferred.promise;
}

function searchVisitor(req) {
    var deferred = Q.defer();
    let LIMIT = 100; //default limit set as 100
    let column = setSearchColumn(req.body);
    let value = req.body.value;
    let select_query = "";

    if (req.body.by == "establishment_name") {
        select_query = 'SELECT * FROM establishment WHERE establishment_name like "%' + value + '%"';
    } else if(req.body.by == "establishment_id") {
        select_query = 'SELECT * FROM establishment WHERE establishment_id like "%' + value + '%"';
    } else {
        select_query = 'SELECT v.visitor_id, visitor_name, visitor_mobile, visitor_email, member_name, member_mobile as member_phone, g.grievance_id, uan, pf_account_no, ppo_number, establishment_name, task_id as estb_account_task_id, establishment_id, created_at, grievance_category, section, max(no_of_visit), attended_at_level, grievance_details, status, visit_at FROM visitors as v INNER JOIN grievance as g ON v.visitor_id = g.visitor_id INNER JOIN visits as vs ON vs.grievance_id = g.grievance_id WHERE ' + column + ' like "%' + value + '%"  group by grievance_id';
    }

    if(req.body.limit) {
        select_query += ' LIMIT ' + req.limit;
    }
    console.log(select_query);
    connection.query(select_query, (err, rows) => {

        if(err) throw deferred.reject(err);
        console.log('The data from users table are: \n');
        deferred.resolve(rows);
    });
    return deferred.promise;
}

function getTopVisits(req) {
    var deferred = Q.defer();
    let LIMIT = 50; //default limit set as 50    
    let select_query = 'SELECT v.visitor_id, visitor_name, visitor_mobile, visitor_email, member_name, member_mobile as member_phone, g.grievance_id, uan, pf_account_no, ppo_number, establishment_name, task_id as estb_account_task_id, establishment_id, created_at, grievance_category, section, max(no_of_visit) as no_of_visit, attended_at_level, grievance_details, status, visit_at FROM visitors as v INNER JOIN grievance as g ON v.visitor_id = g.visitor_id INNER JOIN visits as vs ON vs.grievance_id = g.grievance_id group by vs.grievance_id order by no_of_visit desc limit 50';

    connection.query(select_query, (err, rows) => {
        if(err) throw deferred.reject(err);
        deferred.resolve(rows);
    });
    return deferred.promise;
}

function getReport(req) {
    var deferred = Q.defer();
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;
    let type = req.body.type;
    let value = req.body.value;

    let select_query = 'SELECT v.visitor_id, visitor_name, visitor_mobile, visitor_email, member_name, member_mobile as member_phone, g.grievance_id, uan, pf_account_no, ppo_number, establishment_name, task_id as estb_account_task_id, establishment_id, created_at, grievance_category, section, status, visited_at FROM visitors as v INNER JOIN grievance as g ON v.visitor_id = g.visitor_id where created_at >= "' + start_date + '" and created_at <= "' + end_date + '" and ' + type + ' = "' + value + '"';
    console.log(select_query);
    connection.query(select_query, (err, rows) => {
        if(err) throw deferred.reject(err);
        console.log('The data from visitors table are: \n');
        deferred.resolve(rows);
    });
    return deferred.promise;  
}

function setSearchColumn(req) {
    let column = "";
    if(req.by == "visitor_mobile") {
        column = "visitor_mobile";
    } else if (req.by == "visitor_email") {
        column = "visitor_email";
    } else if (req.by == "uan") {
        column = "uan";
    } else if (req.by == "pf_account_no") {
        column = "pf_account_no";
    } else if (req.by == "establishment_name") {
        column = "establishment_name";
    }
    return column;
}

function getDashboardData(req) {
    var deferred = Q.defer();
    let LIMIT = 100; //default limit set as 100
    let response = { 
                    "daily" : { "total" : 0, "pending": 0, "resolved": 0}, 
                    "weekly": { "total" : 0, "pending": 0, "resolved": 0},
                    "monthly": { "total" : 0, "pending": 0, "resolved": 0},
                    "total": { "total" : 0, "pending": 0, "resolved": 0}
                };
    var currentdate = new Date();

    let today = currentdate.getFullYear() + '-' + (currentdate.getMonth()+1) + "-" + (currentdate.getDate() < 10 ? '0' + currentdate.getDate() : currentdate.getDate());
    var first = currentdate.getDate() - currentdate.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    var firstday = new Date(currentdate.setDate(first)).toUTCString();
    var lastday = new Date(currentdate.setDate(last)).toUTCString();
    let week_start = new Date(firstday).toISOString().split('T')[0] + " 00:00:00";
    let week_end = new Date(lastday).toISOString().split('T')[0] + " 23:59:59";

    var month_start = new Date(currentdate.getFullYear(), currentdate.getMonth(), 1).toISOString().split('T')[0] + " 00:00:00";
    var month_end = new Date(currentdate.getFullYear(), currentdate.getMonth() + 1, 0).toISOString().split('T')[0] + " 23:59:59";

    select_day_query = 'select count(*) as total,(select count(*) from grievance where status = "in_progress" and visited_at like "%' + today + '%") as pending,(select count(*) from grievance where status = "resolved" and visited_at like "%' + today + '%") as resolved from grievance where visited_at like "%' + today + '%"';

    select_week_query = 'select count(*) as total,(select count(*) from grievance where status = "in_progress" and visited_at between "' + week_start + '" and "' + week_end + '") as pending, (select count(*) from grievance where status = "resolved" and visited_at between "' + week_start + '" and "' + week_end + '") as resolved from grievance where visited_at between "' + week_start + '" and "' + week_end + '"';

    select_month_query = 'select count(*) as total,(select count(*) from grievance where status = "in_progress" and visited_at between "' + month_start + '" and "' + month_end + '") as pending, (select count(*) from grievance where status = "resolved" and visited_at between "' + month_start + '" and "' + month_end + '") as resolved from grievance where visited_at between "' + month_start + '" and "' + month_end + '"';

    select_total_query = 'select count(*) as total,(select count(*) from grievance where status = "in_progress") as pending, (select count(*) from grievance where status = "resolved") as resolved from grievance';

    if(req.body.limit) {
        select_query += ' LIMIT ' + req.limit;
    }
    connection.query(select_day_query, (err, rows) => {
        if(err) throw deferred.reject(err);
        response.daily.total = rows[0].total;
        response.daily.pending = rows[0].pending;
        response.daily.resolved = rows[0].resolved;

        connection.query(select_week_query, (err, rows) => {
            if(err) throw deferred.reject(err);
            response.weekly.total = rows[0].total;
            response.weekly.pending = rows[0].pending;
            response.weekly.resolved = rows[0].resolved;
            
            connection.query(select_month_query, (err, rows) => {
                if(err) throw deferred.reject(err);
                response.monthly.total = rows[0].total;
                response.monthly.pending = rows[0].pending;
                response.monthly.resolved = rows[0].resolved;
 
                connection.query(select_total_query, (err, rows) => {
                    if(err) throw deferred.reject(err);
                    response.total.total = rows[0].total;
                    response.total.pending = rows[0].pending;
                    response.total.resolved = rows[0].resolved;
     
                    deferred.resolve(response);
                });
            });
        });
    });
    return deferred.promise;
}

function getCurrentDateTime() {
    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    return datetime;
}
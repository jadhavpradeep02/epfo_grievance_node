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
    console.log(select_query);
    connection.query(select_query, (err, rows) => {

        if(err) throw deferred.reject(err);
        console.log('The data from users table are: \n', rows);
        deferred.resolve(rows);
    });
    return deferred.promise;
}

function addVisitor(req) {
    var deferred = Q.defer();
    let response = {};
    console.log(req.body)
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
    let task_id = req.body.task_id;
    let grievance_category = req.body.grievance_category;
    let section = req.body.section;
    let no_of_visit = req.body.no_of_visit;
    let attended_at_level = req.body.attended_at_level;
    let grievance_details = req.body.grievance_details;
    let status = req.body.status;
 
    //before add new search for existing
    var select_query = `SELECT * FROM visitors WHERE visitor_mobile= '${visitor_mobile}'`;
    connection.query(select_query, function(err, data) {
        console.log(data[0].visitor_id);
        if(data.length > 0) {
            let visitor_id = data[0].visitor_id;

            var insert_grievance = `INSERT INTO grievance (grievance_id, visitor_id, member_name, member_mobile, uan, pf_account_no, ppo_number, establishment_name, establishment_id, task_id, section, grievance_category, no_of_visit, attended_at_level, grievance_details, status, visited_at) VALUES (NULL, '${visitor_id}', '${member_name}', '${member_phone}', '${uan}', '${pf_account_no}', '${ppo_number}', '${establishment_name}', '${establishment_id}', '${task_id}', '${section}', '${grievance_category}', '${no_of_visit}', '${attended_at_level}', '${grievance_details}', '${status}', now())`;

            console.log("insert query-", insert_grievance)
            connection.query(insert_grievance, function(err, result) {
                if (err) throw err;
                console.log("Successfully inserted grievance: ")
                response.status = "200";
                response.message = "Grievance and Visitor Added successfully";
                deferred.resolve(response);
            })
        } else {
            var insert_sql = `INSERT INTO visitors (visitor_id, visitor_name, visitor_mobile, visitor_email, created_at) VALUES (NULL, '${visitor_name}', '${visitor_mobile}', '${visitor_email}', now())`;
            console.log("insert query 1 -", insert_sql)
            connection.query(insert_sql, function (err, result) {
                if (err) throw err;
                console.log('The data is inserted successfully into visitor table');
                console.log("Last inserted id : ", result);
                let visitor_id = result.insertId;

                var insert_grievance = `INSERT INTO grievance (grievance_id, visitor_id, member_name, member_mobile, uan, pf_account_no, ppo_number, establishment_name, establishment_id, task_id, section, grievance_category, no_of_visit, attended_at_level, grievance_details, status, visited_at) VALUES (NULL, '${visitor_id}', '${member_name}', '${member_phone}', '${uan}', '${pf_account_no}', '${ppo_number}', '${establishment_name}', '${establishment_id}', '${task_id}', '${section}', '${grievance_category}', '${no_of_visit}', '${attended_at_level}', '${grievance_details}', '${status}', now())`;
                console.log("insert query-", insert_grievance)
                connection.query(insert_grievance, function(err, result) {
                    if (err) throw err;
                    console.log("Successfully inserted grievance: ")
                    response.status = "200";
                    response.message = "Grievance and Visitor Added successfully";
                    deferred.resolve(response);
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
    let task_id = req.body.task_id;
    let grievance_category = req.body.grievance_category;
    let section = req.body.section;
    let no_of_visit = req.body.no_of_visit;
    let attended_at_level = req.body.attended_at_level;
    let grievance_details = req.body.grievance_details;
    let status = req.body.status;

    var update_sql = `UPDATE visitors SET visitor_name = '${visitor_name}', visitor_email='${visitor_email}' where visitor_mobile = '${visitor_mobile}'`;
    console.log("update query 1 -", update_sql);
    connection.query(update_sql, function (err, result) {
        if (err) throw err;
        console.log('The data is updated successfully into visitor table');

        var update_grievance = `UPDATE grievance SET member_name='${member_name}', member_mobile='${member_phone}', uan='${uan}', pf_account_no='${pf_account_no}', ppo_number='${ppo_number}', establishment_name='${establishment_name}', establishment_id='${establishment_id}', task_id='${task_id}', section='${section}', grievance_category='${grievance_category}', no_of_visit='${no_of_visit}', attended_at_level='${attended_at_level}', grievance_details='${grievance_details}', status='${status}' WHERE grievance_id='${grievance_id}'`;
        console.log("update query-", update_grievance)
        connection.query(update_grievance, function(err, result) {
            if (err) throw err;
            console.log("Successfully updated grievance: ")
            response.status = "200";
            response.message = "Grievance and Visitor Updated successfully";
            deferred.resolve(response);
        })
    });
    return deferred.promise;
}

function deleteVisitor(req) {
    var deferred = Q.defer();
    console.log(req);
    let visitor_id = req.query.visitor_id;
    let response = {};

    delete_query = `DELETE from visitors WHERE visitor_id = ${visitor_id}`;

    console.log(delete_query);
    connection.query(delete_query, (err, result) => {

        if(err) throw deferred.reject(err);
        console.log('The data from visitor table deleted: \n', result);
        response.status = "200";
        response.message = "Record deleted successfully";
        deferred.resolve(response);
    });
    return deferred.promise;
}

function searchVisitor(req) {
    var deferred = Q.defer();
    let LIMIT = 100; //default limit set as 100
    console.log(req);
    let column = setSearchColumn(req.body);
    let value = req.body.value;
    let select_query = "";

    if (req.body.by == "establishment_name") {
        select_query = 'SELECT * FROM establishment WHERE establishment_name like "%' + value + '%"';
    } else if(req.body.by == "establishment_id") {
        select_query = 'SELECT * FROM establishment WHERE establishment_id like "%' + value + '%"';
    } else {
        select_query = 'SELECT v.visitor_id, visitor_name, visitor_mobile, visitor_email, member_name, member_mobile as member_phone, grievance_id, uan, pf_account_no, ppo_number, establishment_name, task_id, establishment_id, created_at, grievance_category, section, no_of_visit, attended_at_level, grievance_details, status FROM visitors as v INNER JOIN grievance as g ON v.visitor_id = g.visitor_id WHERE ' + column + ' like "%' + value + '%"';
    }

    if(req.body.limit) {
        select_query += ' LIMIT ' + req.limit;
    }
    console.log(select_query);
    connection.query(select_query, (err, rows) => {

        if(err) throw deferred.reject(err);
        console.log('The data from users table are: \n', rows);
        deferred.resolve(rows);
    });
    return deferred.promise;
}

function getReport(req) {
    var deferred = Q.defer();
    console.log(req);
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;
    let type = req.body.type;
    let value = req.body.value;

    let select_query = 'SELECT v.visitor_id, visitor_name, visitor_mobile, visitor_email, uan, pf_account_no, establishment_name, created_at, grievance_category, section, no_of_visit, attended_at_level, grievance_details, status, visited_at FROM visitors as v INNER JOIN grievance as g ON v.visitor_id = g.visitor_id where created_at >= "' + start_date + '" and created_at <= "' + end_date + '" and section = "' + value + '"';

    connection.query(select_query, (err, rows) => {
        if(err) throw deferred.reject(err);
        console.log('The data from visitors table are: \n', rows);
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

const connection = require('../config/dbConnect');
var Q = require('q');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const res = require('express/lib/response');

service = {};

service.getAllusers = getAllusers;
service.login = login;
service.logout = logout;
service.addUser = addUser;

module.exports = service;

function getAllusers(req) {
    var deferred = Q.defer();
    try {
        connection.query('SELECT username, email, role from users', (err, rows) => {
            if (err) throw deferred.reject(err);
            console.log('The data from users table are: \n', rows);
            deferred.resolve(rows);
        });
        return deferred.promise;
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }

}

function login(req) {
    var deferred = Q.defer();
    console.log("login successful");
    const username = req.body.username;
    const password = req.body.password;

    try {
        //first authenticate user
        connection.query("SELECT * from users where username = ?", username, (err, rows) => {
            if (err) throw deferred.reject(err);
            rows = Array.from(rows);

            if (rows.length !== 0) {
                rows.forEach((row) => {
                    if (row.password === password) {
                        console.log("Password Matches");
                        const user = { username: username, role: row.role, email: row.email };

                        //then create jwt token and pass it back
                        const accessToken = jwt.sign(user, config.secret, { expiresIn: '1h' })
                        deferred.resolve({ "token": accessToken, "user": user });
                    } else {
                        console.log("No User Found");
                        deferred.resolve();
                    }
                });
            } else {
                console.log("No User Found");
                deferred.resolve();
            }
        });

        return deferred.promise;
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal Server Error");
    }
}

function logout(req) {
    var deferred = Q.defer();
    connection.end();

    return deferred.promise;
}

function addUser(req) {
    var deferred = Q.defer();
    let response = {};
    let username = req.body.username.trim();
    let email = req.body.email.trim();
    let password = req.body.password.trim();
    let role = req.body.role.trim();

    if(username == "" || email == "" || password == "" || role == "") {
        response.status = "405";
        response.message = "Empty values are not allowed";
        deferred.resolve(response);
        return deferred.promise;
    } else {
        try {
            //before add new search for existing
            var select_query = `SELECT * FROM users WHERE username= '${username}'`;
            console.log(select_query);
            connection.query(select_query, function (err, data) {
                if (data.length > 0) {
                    response.status = "200";
                    response.message = "Username already exists!";
                    deferred.resolve(response);
                } else {
                    var insert_sql = `INSERT INTO users (user_id, username, email, password, role,  created_at) VALUES (NULL, '${username}', '${email}', '${password}', '${role}', now())`;
                    console.log("insert query 1 -", insert_sql)
                    connection.query(insert_sql, function (err, result) {
                        if (err) throw err;
                        console.log('The data is inserted successfully into users table');   
                        response.status = "200";
                        response.message = "User Added successfully";
                        deferred.resolve(response);
                    });
                    return deferred.promise;
                }
            });
            return deferred.promise;
        } catch (error) {
            console.error(error.message);
            return res.status(500).send("Internal Server Error");
        }
    }
}
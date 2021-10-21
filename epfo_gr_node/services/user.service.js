
const connection = require('../config/dbConnect');
var Q = require('q');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

service = {};

service.getAllusers = getAllusers;
service.login = login;
service.logout = logout;

module.exports = service;

function getAllusers(req) {
    var deferred = Q.defer();
    connection.query('SELECT username, email, role from users', (err, rows) => {
        if(err) throw deferred.reject(err);
        console.log('The data from users table are: \n', rows);
        deferred.resolve(rows);
    });
    return deferred.promise;
}

function login(req) {
    var deferred = Q.defer();
    console.log("login successful");
    const username = req.body.username;
    const password = req.body.password;

    //first authenticate user
    connection.query("SELECT * from users where username = ?", username, (err, rows) => {
        if(err) throw deferred.reject(err);
        rows = Array.from(rows);

        if(rows.length !== 0) {
            console.log("userdata - ", rows);
            rows.forEach( (row) => {
                if(row.password === password) {
                    console.log("Password Matches");
                    const user = { username : username, role : row.role, email: row.email };
                    
                    //then create jwt token and pass it back
                    const accessToken = jwt.sign(user, config.secret, { expiresIn: '1h' })
                    deferred.resolve({ "token" :  accessToken, "user" : user});
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
}

function logout(req) {
    var deferred = Q.defer();
    connection.end();

    return deferred.promise;
}
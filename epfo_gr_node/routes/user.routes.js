var express = require('express');
var router = express.Router();
var userService = require('../services/user.service');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

router.get('/', authenticate,getAllUsers);
router.post('/login', login);
router.post('/logout', logout);
// router.post('/changePassword', changePW);
// router.put('/forgetPassword', forgotUpdatePW);
// router.put('/updateUser', updateUser);
// router.delete('/deleteUser', deleteUser);
// router.put('/disableUser', disableUser);

module.exports = router;

function getAllUsers(req, res) {
    userService.getAllusers(req.query).then(function (response) {
        res.send(response);
    }).catch(function (err) {
        res.send(err);
    });
}

function login(req, res) {
    userService.login(req).then(function (userData) {
        console.log("in login user controller data = ", userData);

        if (userData) {
            req.token = userData.token;
            req.username = userData.user.username;
            req.role = userData.user.role;
            //req.ssid = req.sessionID
            res.setHeader("authorization", userData.token);

            res.send({
                message: 'Login Successful.',
                response: userData
            });
        } else {
            res.send({
                message: 'Username or password is incorrect'
            });
        }
    }).catch(function (err) {
        res.send(err);
    });
}

function logout(req, res) {
    // console.log("req.body",req.body,req.headers['$sessionid'])
    // store.destroy(req.headers['$sessionid'],function(err,sess){
    // console.log("err",err,sess)
    // })
    userService.logout(req.body).then(response => {
        res.send({ message: "Successfully Logout..." })
    }).catch(function (err) {
        res.send(err);
    });
}

function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, config.secret, (err, user) => {
        if(err) return res.sendStatus(401);

        req.user = user;
        next();
    })
}
var express = require('express');
var router = express.Router();
var visitorService = require('../services/visitor.service');
//var authService = require('../services/authenticate.service');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

router.get('/', authenticate, getAllVisitors);
router.post('/add', authenticate,  addVisitor);
router.put('/update', authenticate, updateVisitor);
router.delete('/delete', authenticate, deleteVisitor);
router.post('/search', authenticate, searchVisitor);

module.exports = router;

function getAllVisitors(req, res) {
    visitorService.getAllVisitors(req).then(function (response) {
        res.send(response);
    }).catch(function (err) {
        res.send(err);
    });
}

function addVisitor(req, res) {
    visitorService.addVisitor(req).then(function (response) {
        res.send(response);
    }).catch(function (err) {
        res.send(err);
    });
}

function updateVisitor(req, res) {
    visitorService.updateVisitor(req).then(function (response) {
        res.send(response);
    }).catch(function (err) {
        res.send(err);
    });
}

function deleteVisitor(req, res) {
    visitorService.deleteVisitor(req).then(function (response) {
        res.send(response);
    }).catch(function (err) {
        res.send(err);
    });
}

function searchVisitor(req, res) {
    visitorService.searchVisitor(req).then(function (response) {
        res.send(response);
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

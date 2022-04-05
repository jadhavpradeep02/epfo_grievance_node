const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
const config = require('./config/config.json');
const connection = require('./config/dbConnect');
const jwt = require('jsonwebtoken');

const allowedMethods = ['OPTIONS', 'GET', 'PUT', 'POST', 'DELETE'];

app.use((req, res, next) => {
    if (allowedMethods.includes(req.method)){ 
        next();
    }else{
        res.status(405).send({ message: "Method Not Allowed" });
    }
})

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})

app.use(function (req, res, next) {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0, max-age=0, s-maxage=0');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '-1');
    res.set('Strict-Transport-Security', 'max-age=10886400; includeSubDomains; preload');
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('Content-Security-Policy', "default-src 'self' icicibank.com *.icicibank.com");
    next()
})

// Temporary text for comparing
//allow all urls for cors related error
app.use(cors( { origin: "*" } ));

//parse request and response
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: "50mb" }));

// app.get("/", (req, res) => {
//     connection.query('SELECT * from users LIMIT 1', (err, rows) => {
//         if(err) throw err;
//         console.log('The data from users table are: \n', rows);
//         connection.end();
//     });
// })

app.use('/api/user', require('./routes/user.routes'));
app.use('/api/visitor', require('./routes/visitor.routes'));

console.log("nodemon added");
app.listen(config.port, () => {
    console.log('Server is running at port 3000');
});


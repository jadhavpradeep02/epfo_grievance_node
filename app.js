const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
const config = require('./config/config.json');
const connection = require('./config/dbConnect');
const jwt = require('jsonwebtoken');

const allowedMethods = ['GET', 'PUT', 'POST', 'DELETE'];

app.use((req, res, next) => {
    if (allowedMethods.includes(req.method)){ 
        next();
    }else{
        res.status(405).send({ message: "Method Not Allowed" });
    }
})

// Temporary text for comparing
//allow all urls for cors related error
app.use(cors({ origin: "*" }));

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


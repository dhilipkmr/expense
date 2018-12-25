require('./config/config');
import 'babel-polyfill';
import env from './config/config';
import express from 'express';
import bodyParser from 'body-parser';
var session = require('express-session');

import App from '../src/app'
import './db/mongoose';
import {signUp, signIn, newExpense, getExpenseData, getExpenseSummary, logout, getUserInfo} from './api/apiCalls';

const MongoStore = require('connect-mongo')(session);
const app = express();
const port = process.env.PORT;

app.use(session({
    secret: 'foo',
    resave: true,
    store: new MongoStore({
        url: process.env.MONGOLAB_URI
    })
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('build/public'));
app.use('/styles', express.static('src/pages/styles'));
app.use(express.static('src/pages/static'));

// API Calls
app.post('/signup', signUp);
app.post('/signin', signIn);
app.post('/logout', logout);
app.post('/userinfo', getUserInfo);
app.post('/new_expense', newExpense);
app.post('/get_expense_data', getExpenseData);
app.post('/get_expense_summary', getExpenseSummary);

const loadHtml = (content) => {
    return (`
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="manifest" href="/manifest.json">
                <link rel="icon" href="/img/budget64.png">
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css">
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js">
                <link rel="stylesheet" type="text/css" href="/styles/common.css">
                <link rel="stylesheet" type="text/css" href="/styles/home.css">
                <link rel="stylesheet" type="text/css" href="/styles/login.css">
                <link rel="stylesheet" type="text/css" href="/styles/new_expense.css">
                <link rel="stylesheet" type="text/css" href="/styles/notfound.css">
                <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
            </head>
            <body>
                <div id="root"></div>
                <script src = "/swRegisterer.js">
                </script>
                <script src="client_bundle.js"></script>
            </body>
        </html>`);
};

app.get('*', (req, res) => {
    const template = loadHtml();
    res.send(template);
});

app.listen(port, () => {
    console.log('Server Started on Port: ', port);
});

export default app;

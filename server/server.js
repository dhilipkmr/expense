require('./config/config');
import 'babel-polyfill';
import env from './config/config';
import express from 'express';
import bodyParser from 'body-parser';
var session = require('express-session');

import App from '../src/app'
import './db/mongoose';
import {signUp, signIn, newExpense, getExpenseData, getExpenseSummary, deleteExpenseDate, logout, getUserInfo, editExpense, getFrequentCategories} from './api/apiCalls';

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
app.post('/delete_expense_date', deleteExpenseDate);
app.post('/edit_expense', editExpense);
app.get('/getFrequentCategories', getFrequentCategories);


const loadHtml = (content) => {
    return (`
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="manifest" href="/manifest.json">
                <link rel="icon" href="/img/budget64.png">
                <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
                <style>
                    @keyframes rippleLoader {
                        100% {
                            transform: scale(700);
                            opacity: 0;
                          }
                    }
                </style>
            </head>
            <body>
                <div id="root"></div>
                <script>
                    document.getElementById('root').innerHTML =
                        '<div>\
                            </div>\
                                <div style="position: relative">\
                                    <div style="color: #fff; background-color: #0757d0; border-radius: 100%; width: 45px; height: 45px; text-align: center; margin: 50vh auto;z-index: 7;position: relative;">\
                                        <div style="color: white; padding: 12px" />₹</div>\
                                    </div>\
                                <span style="position: absolute; top: 50%; left: 50%; width: 1px; height: 1px; background-color: #0757d0; border-radius: 50%; animation: rippleLoader 3s ease infinite;"></span>\
                            </div>\
                        </div>';
                </script>
                <link rel="stylesheet" type="text/css" href="/styles/common.css">
                <link rel="stylesheet" type="text/css" href="/styles/home.css">
                <link rel="stylesheet" type="text/css" href="/styles/login.css">
                <link rel="stylesheet" type="text/css" href="/styles/new_expense.css">
                <link rel="stylesheet" type="text/css" href="/styles/notfound.css">
                <link rel="stylesheet" type="text/css" href="/styles/popup.css">
                <script src = "/swRegisterer.js"></script>
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

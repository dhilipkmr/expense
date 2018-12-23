require('./config/config');
import 'babel-polyfill';
import env from './config/config';
import express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import Helmet from 'react-helmet';
var session = require('express-session');

import App from '../src/app'
import mongoose1 from './db/mongoose';
import {signUp, signIn, newExpense, getExpenseData, getExpenseSummary} from './api/apiCalls';

const app = express();
const port = process.env.PORT;

app.use(session({
    secret: 'dhilipLocal',
    resave: false,
    saveUninitialized: true,
    url: process.env.MONGOLAB_URI
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('build/public'));
app.use('/styles', express.static('src/pages/styles'));
app.use(express.static('src/pages/static'));

// API Calls
app.post('/signup', signUp);
app.post('/signin', signIn);
app.post('/new_expense', newExpense);
app.post('/get_expense_data', getExpenseData);
app.post('/get_expense_summary', getExpenseSummary);

const loadHtml = (content) => {
    const helmet = Helmet.renderStatic();
    return (`
        <html>
            <head>
                ${helmet.meta.toString()}
                ${helmet.title.toString()}
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css">
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js">
                <link rel="stylesheet" type="text/css" href="/styles/common.css">
                <link rel="stylesheet" type="text/css" href="/styles/home.css">
                <link rel="stylesheet" type="text/css" href="/styles/login.css">
                <link rel="stylesheet" type="text/css" href="/styles/new_expense.css">
                <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
            </head>
            <body>
                <div id="root">${content}</div>
                <script src="client_bundle.js"></script>
            </body>
        </html>`);
};

app.get('*', (req, res) => {
    const context = {};
    const content = ReactDOMServer.renderToString(
        <StaticRouter>
            <App location={req.url} context={context} />
        </StaticRouter>
    );
    const template = loadHtml(content);
    res.send(template);
});

app.listen(port, () => {
    console.log('proces.env', port, process.env.MONGOLAB_URI);
    console.log('Server Started on Port: ', port);
});

export default app;

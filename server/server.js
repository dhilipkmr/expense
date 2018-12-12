import 'babel-polyfill';
import env from './config/config';
import express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import Helmet from 'react-helmet';

import App from '../src/app'
import mongoose from './db/mongoose';
import {usersModel} from './models/userModel';


const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('build/public'));
app.use('/styles', express.static('src/pages/styles'));

app.post('/signup', (request, response) => {
   const {username = '', password = '', emailId = ''} = request.body;
    var user = new usersModel({
        username: username,
        password: password,
        emailId: emailId
    });
    usersModel.find({username: username}).then((res)=> {
        if (res.length > 0) {
            response.send({error: true, msg: 'Username already Exists'});
        } else {
            user.save().then((doc) => {
                response.send(doc);
            }, (e) => {
                response.status(500).send(e);
            })
        }
    }, (e) => {
        response.send(e);
        console.log(e);
    });
});

app.post('/signin', (request, response) => {
    const {username = '', password = '', emailId = ''} = request.body;
     usersModel.find({username: username, password: password}).then((res)=> {
         if (res.length > 0) {
             response.send({error: false, msg: 'success'});
         } else {
            response.send({error:true, msg: 'No user account found'});
         }
     }, (e) => {
         response.send(e);
         console.log(e);
     });
 });

app.get('*', (req, res) => {
    const context = {};
    const content = ReactDOMServer.renderToString(
        <StaticRouter>
            <App location={req.url} context={context}/>
        </StaticRouter>
    );
    const template = loadHtml(content);
    res.send(template);
});


const loadHtml = (content) => {
    const helmet = Helmet.renderStatic();
    return (`
        <html>
            <head>
                ${helmet.meta.toString()}
                ${helmet.title.toString()}
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
                <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.bundle.min.js">
                <link rel="stylesheet" type="text/css" href="/styles/common.css">
            </head>
            <body>
                <div id="root">${content}</div>
                <script src="client_bundle.js"></script>
            </body>
        </html>`);
};

app.listen(port, () => {
    console.log('Server has started on port: ', port);
});
import 'babel-polyfill'
import express from 'express';
import bodyparser from 'body-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import Helmet from 'react-helmet';

import App from './src/app';

const app = express();
const port = process.env.PORT || 4000;
app.use(bodyparser.json());
app.use(express.static('build/public'));

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
            </head>
            <body>
                <div id="root">
                    ${content}
                </div>
                <script src="client_bundle.js"></script>
            </body>
        </html>`);
};

app.listen(port, () => {
    console.log('Server has started on port: ', port);
});
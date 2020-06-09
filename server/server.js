require('./config/config');
import 'babel-polyfill';
import env from './config/config';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import compression from 'compression';
import './db/mongoose';
import { saveSchedule, getSchedule } from './api/apiCalls';

const MongoStore = require('connect-mongo')(session);
const app = express();
const port = process.env.PORT;

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('build/public'));

const loadHtml = () => {
  return (`
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="index.css"/>
      </head>
      <body>
        <div id="root"></div>
        <script src="client_bundle.js"></script>
      </body>
    </html>`
  );
};

app.post('/save_schedule', saveSchedule);
app.get('/get_schedules', getSchedule);

app.get('*', (req, res) => {
  const template = loadHtml();
  res.send(template);
});

app.listen(port, () => {
  console.log(`Server Started on Port: http://localhost:${port}/`);
});

export default app;

import express, { Request, Response, NextFunction } from 'express';
import * as path from 'path';
import * as http from 'http';
import * as https from 'https'
import * as bodyParser from "body-parser";
import { Call_Port } from '../config/env/envConfig';
import compression from 'compression';

import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import schema from './schema';
var cors = require('cors');
const app = express();

////options for cors midddleware
const corsOptions= {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: '127.0.0.1',
  preflightContinue: false
};

const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(7)],
  });
  
app.use('*',cors(corsOptions));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  console.log(req.url);
  console.log('Time: %d', Date.now());
  next();
});
app.use(express.static(path.join(__dirname, '/build')));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type, Authorization');
  next();
});

//app.use('/graphql',  require('./routes'));
//const _ip = Call_Host();
const _port = Call_Port();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("Hello World!");
});

server.applyMiddleware({ app, path: '/graphql' });

app.get('*', (req: Request, res: Response) => {
  // res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  req.header('host');
});

http.createServer(app).listen(_port);
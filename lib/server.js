'use strict';

//npm modules
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

//configuring mongoose to connect to our db
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

//create server app
const app = express();

//load middleware
app.use(morgan('dev'));
app.use(cors());


//404 route for invalid path request
app.all('/*', (req, res, next) => res.sendStatus(404));

//error handler
app.use(require('./error-handler.js'));

//funtion methods to start and stop our server
const server = module.exports = {};

server.isOn = false;

server.start = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn){
      server.http = app.listen(process.env.PORT, () => {
        server.isOn = true;
        console.log('server is running on PORT: ', process.env.PORT);
        resolve();
      });
      return;
    }
    reject(new Error('Server seems to be running'));
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(server.http && server.isOn){
      return server.http.close(() => {
        server.isOn = false;
        console.log('Server was successfully stop');
        resolve();
      });
    }
    reject(new Error('Server doesn\'t seems to be running'));
  });
};

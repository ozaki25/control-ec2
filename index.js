const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const app = express();

const ec2 = new AWS.EC2();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/instances', (req, res) => {
  const params = {};
  ec2.describeInstances(params, function(err, data) {
    if (err) {
      console.log('Error', err.stack);
      res.send(err.stack);
    } else {
      console.log('Success', JSON.stringify(data));
      res.send(JSON.stringify(data));
    }
  });
});

app.post('/instances/start', (req, res) => {
  const {
    body: { InstanceIds },
  } = req;
  const params = { InstanceIds };
  console.log({ params });
  ec2.startInstances(params, function(err, data) {
    if (err) {
      console.log('Error', err.stack);
      res.send(err.stack);
    } else {
      console.log('Success', JSON.stringify(data));
      res.send(JSON.stringify(data));
    }
  });
});

app.post('/instances/stop', (req, res) => {
  console.log(req.body);
  const {
    body: { InstanceIds },
  } = req;
  const params = { InstanceIds };
  console.log({ params });
  ec2.stopInstances(params, function(err, data) {
    if (err) {
      console.log('Error', err.stack);
      res.send(err.stack);
    } else {
      console.log('Success', JSON.stringify(data));
      res.send(JSON.stringify(data));
    }
  });
});

module.exports.handler = serverless(app);

const serverless = require('serverless-http');
const express = require('express');
const AWS = require('aws-sdk');
const app = express();

const ec2 = new AWS.EC2();

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

const port = '8080';
app.listen(port, () => {
  console.log(`app start listening on port ${port}`);
});

module.exports.handler = serverless(app);

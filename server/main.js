var express = require('express');
var app = express();
var childProcess = require('child_process');

// childProcess.exec('echo hi', function(error, stdout, stderr) {
//   console.log(stdout);
// })

app.get('/', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  childProcess.exec('octave test.m', function(error, stdout, stderr) {
    console.log(stdout);
    res.send(stdout);
  })
});

app.listen(3000);

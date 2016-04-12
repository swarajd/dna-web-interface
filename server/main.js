var express = require('express');
var app = express();
var childProcess = require('child_process');
var bodyParser = require('body-parser');
var path    = require("path");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));

// childProcess.exec('echo hi', function(error, stdout, stderr) {
//   console.log(stdout);
// })
//

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
})


app.post('/', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Accept, X-Requested-With");
  // res.header("Access-Control-Allow-Credentials", "true")
  // console.log(req.body);
  var dna = req.body.dna;
  childProcess.exec('bash test.sh ' + dna, function(error, stdout, stderr) {
    console.log(stdout);
    res.send(stdout);
  })
});

app.listen(3000);

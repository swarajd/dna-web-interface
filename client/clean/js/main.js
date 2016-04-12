function readFile(e) {
  document.getElementById("loading").hidden = false;
  document.getElementById("downloadbtns").hidden = true;
  var f = e.target[1].files[0];
  if (f) {
    var fr = new FileReader();
    fr.onload = function(e) {
      var contents = e.target.result;
      console.log(contents);

      superagent
        .post('http://localhost:3000/')
        .set('Accept', 'application/json')
        .send({
          dna: contents
        })
        .end(function(err, res) {
          processResults(res);
        });
    }
    fr.readAsText(f);
  } else {
    document.getElementById("loading").hidden = true;
  }
}

function readText(e) {
  document.getElementById("loading").hidden = false;
  document.getElementById("downloadbtns").hidden = true;

  var txt = e.target[0].value;

  console.log(txt);

  superagent
    .post('http://localhost:3000/')
    .set('Accept', 'application/json')
    .send({
      dna: txt
    })
    .end(function(err, res) {
      processResults(res);
    });
}

function processResults(res) {
  document.getElementById("downloadbtns").hidden = false;
  document.getElementById("loading").hidden = true;

  var results = res.text.split('\n');
  console.log(results);
  // for (var i = 0; i < 5; i++) {
  //   var txt = results.split(',');
  //   var row = document.createElement("tr");
  //   var col1 = document.createElement("td");
  //   var col1text = document.createTextNode(txt[0]);
  //   col1.appendChild(col1text);
  //   var col2text = document.createTextNode(txt[1]);
  //   col2.appendChild(col2text);
  //   row.appendChild(col1);
  //   row.appendChild(col2);
  //   console.log(row);
  //   var inactivated = document.getElementById("inactivated");
  //   inactivated.appendChild(row);
  // }

  var firstBtn = document.getElementById("firstData");

  firstBtn.href = 'data:attachment/text,' + encodeURI(results);
  firstBtn.target = '_blank';
  firstBtn.download = 'myFile.txt';

  document.getElementById("downloadbtns").hidden = false;
}

document.getElementById("downloadbtns").hidden = true;
document.getElementById("loading").hidden = true;

document.getElementById('dna-form').addEventListener("submit", function(e) {
  e.preventDefault();
  var textinp = e.target[0].value;
  if (!textinp || textinp.length == 0) {
    readFile(e);
  } else {
    readText(e);
  }

});

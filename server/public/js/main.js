// function readFile(e) {
//   document.getElementById("loading-bar").hidden = false;
//   document.getElementById("downloadbtns").hidden = true;
//   var f = e.target[1].files[0];
//   if (f) {
//     var fr = new FileReader();
//     fr.onload = function(e) {
//       var contents = e.target.result;
//       console.log(contents);
//
//       superagent
//         .post('http://localhost:3000/')
//         .set('Accept', 'application/json')
//         .send({
//           dna: contents
//         })
//         .end(function(err, res) {
//           processResults(res);
//         });
//     }
//     fr.readAsText(f);
//   } else {
//     document.getElementById("loading-bar").hidden = true;
//   }
// }

function readText(e) {
  document.getElementById("loading-bar").hidden = false;
  document.getElementById("downloadbtns").hidden = true;

  var txt = e.target[0].value;

  console.log(txt);

  var count = 0;
  var tick = 0;
  var regex = /gg/g;
  while (match = regex.exec(txt)) {
    count++;
    regex.lastIndex = match.index + 1;
  }

  var progressbar = document.getElementById("loading-bar");

  progressbar.setAttribute("max", count);

  var activate = setInterval(function() {
    if (tick == count) {
      clearInterval(activate);
    }
    tick++;

    progressbar.setAttribute("value", tick);
  }, 600)

  superagent
    .post('http://localhost:3000/')
    .set('Accept', 'application/json')
    .send({
      dna: txt
    })
    .end(function(err, res) {
      clearInterval(activate);
      processResults(res);
    });
}

function processResults(res) {
  document.getElementById("downloadbtns").hidden = false;
  document.getElementById("loading-bar").hidden = true;

  var results = res.text.split('\n');
  console.log(results);
  for (var i = 0; i < 5; i++) {
    var txt = results[i].split(',');
    var row = document.createElement("tr");
    var col1 = document.createElement("td");
    var col2 = document.createElement("td");
    var col1text = document.createTextNode(txt[0]);
    col1.appendChild(col1text);
    var col2text = document.createTextNode(txt[1]);
    col2.appendChild(col2text);
    row.appendChild(col1);
    row.appendChild(col2);
    console.log(row);
    var inactivated = document.getElementById("inactivated");
    inactivated.appendChild(row);
  }

  for (var i = 0; i < 5; i++) {
    var txt = results[results.length - i - 2].split(',');
    var row = document.createElement("tr");
    var col1 = document.createElement("td");
    var col2 = document.createElement("td");
    var col1text = document.createTextNode(txt[0]);
    col1.appendChild(col1text);
    var col2text = document.createTextNode(txt[1]);
    col2.appendChild(col2text);
    row.appendChild(col1);
    row.appendChild(col2);
    console.log(row);
    var inactivated = document.getElementById("elevated");
    inactivated.appendChild(row);
  }

  var firstBtn = document.getElementById("firstData");

  firstBtn.href = 'data:attachment/text,' + encodeURI(res.text);
  firstBtn.target = '_blank';
  firstBtn.download = 'myFile.txt';

  document.getElementById("downloadbtns").hidden = false;
}

document.getElementById("downloadbtns").hidden = true;
document.getElementById("loading-bar").hidden = true;

document.getElementById('dna-form').addEventListener("submit", function(e) {
  e.preventDefault();
  var textinp = e.target[0].value;
  var table1 = document.getElementById("inactivated");
  while (table1.firstChild) {
    table1.removeChild(table1.firstChild);
  }
  var table2 = document.getElementById("elevated");
  while (table2.firstChild) {
    table2.removeChild(table2.firstChild);
  }
  if (!textinp || textinp.length == 0) {
    // readFile(e);
  } else {
    readText(e);
  }

});

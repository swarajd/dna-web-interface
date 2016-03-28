function readFile(e) {
  e.preventDefault();
  document.getElementById("loading").hidden = false;
  var f = e.target[1].files[0];
  if (f) {
    var fr = new FileReader();
    fr.onload = function(e) {
      var contents = e.target.result;
      console.log(contents);
      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", "http://localhost:3000/", true);
      xhttp.send();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4) {
          document.getElementById("downloadbtns").hidden = false;
          document.getElementById("loading").hidden = true;
          console.log('got results');

          //parse the json, and apply them to the two download buttons
          var results = xhttp.responseText;
          console.log(results);

          var firstBtn = document.getElementById("firstData");

          firstBtn.href = 'data:attachment/text,' + encodeURI(results);
          firstBtn.target = '_blank';
          firstBtn.download = 'myFile.txt';
        }
      }
    }
    fr.readAsText(f);
  }
}

// hide the download buttons and
document.getElementById("downloadbtns").hidden = true;
document.getElementById("loading").hidden = true;

document.getElementById('dna-form').addEventListener("submit", function(e) {
  readFile(e);
});

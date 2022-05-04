function toggle(x) {
  var x = document.getElementsByClassName(x);
  var i;
  for (i = 0; i < x.length; i++) {
      x[i].classList.toggle("hidden");
  }
}

function indexOfMax(arr) {
  if (arr.length === 0) {
      return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
      }
  }

  return maxIndex;
}

function setup() {
  pixelDensity(0.1);
  createCanvas(400, 400);
  background(220);
  strokeWeight(40);
  stroke(0);
}

function touchMoved() {
  loadPixels()
  line(mouseX, mouseY, pmouseX, pmouseY);
  return false;
}

let network = new NeuralNetwork(1600, 1000, 10, "sigmoid");
let mode = "training"
function switchMode() {
  if (mode == "training") {
    document.getElementById("mode").innerHTML = "Mode: Testing";
    toggle("trainingButtons");
    mode = "testing";
  } else {
    document.getElementById("mode").innerHTML = "Mode: Training";
    toggle("trainingButtons")
    mode = "training";
  }
}

function rs() {
  background(220);
}

function train(x) {
  let o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  o[x] = 1;
  let p_normalized = [];
  let i = 0;
  Array.prototype.slice.call(pixels).forEach((e) => {
    if (i == 0) {
      if (e == 0) {
        p_normalized.push(1);
      } else if (e > 1) {
        p_normalized.push(0);
      } else {
        p_normalized.push(1);
      }
    }
    i++;
    if (i == 4) {
      i = 0;
    }
  });
  network.train(p_normalized, o);
  console.log("Trained network with data!")
  rs()
}

let text = "";
setInterval(() => {
  if (text.length > 0) {
    network.setWeights(JSON.parse(text));
    text = "";
  }
  if (mode != "testing") return;
  let p_normalized = [];
  let i = 0;
  Array.prototype.slice.call(pixels).forEach((e) => {
    if (i == 0) {
      if (e == 0) {
        p_normalized.push(1);
      } else if (e > 1) {
        p_normalized.push(0);
      } else {
        p_normalized.push(1);
      }
    }
    i++;
    if (i == 4) {
      i = 0;
    }
  });
  let output = network.run(p_normalized);
  let top = indexOfMax(output);
  output.splice(indexOfMax(output), 1)
  let second = indexOfMax(output);
  output.splice(indexOfMax(output), 1)
  let third = indexOfMax(output);

  document.getElementById("prediction").innerHTML = `Top 3 Predictions: ${top} ${second} ${third}`;
}, 500);

function readTextFile(file)
{
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function ()
  {
    if(rawFile.readyState === 4)
    {
      if(rawFile.status === 200 || rawFile.status == 0)
      {
        var allText = rawFile.responseText;
        text = allText;
      }
    }
  }
  rawFile.send(null);
}

function importJSON() {
  let json = readTextFile("file://D:\\GitHub\\DigitClassifier2\\data.txt");
}
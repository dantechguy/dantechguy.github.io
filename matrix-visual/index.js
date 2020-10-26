// variables
var boxMultiplier = 100;

// canvas
canvas = document.querySelector('canvas');
ctx = canvas.getContext('2d');

// axis
var xAxis = new Line(canvas.height/2, 0, canvas.height/2, canvas.width, ctx);
var yAxis = new Line(0, canvas.width/2, canvas.height, canvas.width/2, ctx);

// inputs
var inputTopLeft = document.querySelector('.matrix-input-tl');
var inputTopRight = document.querySelector('.matrix-input-tr');
var inputBottomLeft = document.querySelector('.matrix-input-bl');
var inputBottomRight = document.querySelector('.matrix-input-br');

// ranges
var rangeTopLeft = document.querySelector('.matrix-range-tl');
var rangeTopRight = document.querySelector('.matrix-range-tr');
var rangeBottomLeft = document.querySelector('.matrix-range-bl');
var rangeBottomRight = document.querySelector('.matrix-range-br');

// input range onchange
inputTopLeft.oninput = function() {rangeTopLeft.value = this.value; update()};
inputTopRight.oninput = function() {rangeTopRight.value = this.value; update()};
inputBottomLeft.oninput = function() {rangeBottomLeft.value = this.value; update()};
inputBottomRight.oninput = function() {rangeBottomRight.value = this.value; update()};

rangeTopLeft.oninput = function() {inputTopLeft.value = this.value; update()};
rangeTopRight.oninput = function() {inputTopRight.value = this.value; update()};
rangeBottomLeft.oninput = function() {inputBottomLeft.value = this.value; update()};
rangeBottomRight.oninput = function() {inputBottomRight.value = this.value; update()};

// box matrices
var boxTopLeftInitMatrix = new Matrix2x1(0, 1);
var boxTopRightInitMatrix = new Matrix2x1(1, 1);
var boxBottomLeftInitMatrix = new Matrix2x1(0, 0);
var boxBottomRightInitMatrix = new Matrix2x1(1, 0);

var boxTopLeftMatrix = new Matrix2x1(0, 1);
var boxTopRightMatrix = new Matrix2x1(1, 1);
var boxBottomLeftMatrix = new Matrix2x1(0, 0);
var boxBottomRightMatrix = new Matrix2x1(1, 0);

// box matrices update
function updateBoxMatrices() {
  let topLeft = Number(inputTopLeft.value);
  let topRight = Number(inputTopRight.value);
  let bottomLeft = Number(inputBottomLeft.value);
  let bottomRight = Number(inputBottomRight.value);
  let multiplierMatrix = new Matrix2x2(topLeft, topRight, bottomLeft, bottomRight);

  boxTopLeftMatrix = boxTopLeftInitMatrix.multiplyBy(multiplierMatrix);
  boxTopRightMatrix = boxTopRightInitMatrix.multiplyBy(multiplierMatrix);
  boxBottomLeftMatrix = boxBottomLeftInitMatrix.multiplyBy(multiplierMatrix);
  boxBottomRightMatrix = boxBottomRightInitMatrix.multiplyBy(multiplierMatrix);
}

// box update
function updateBoxCorners() {
  let topLeftX = (canvas.width/2) + (boxTopLeftMatrix.top*boxMultiplier)
  let topLeftY = (canvas.height/2) - (boxTopLeftMatrix.bottom*boxMultiplier)
  box.topLeft(topLeftX, topLeftY);

  let topRightX = (canvas.width/2) + (boxTopRightMatrix.top*boxMultiplier)
  let topRightY = (canvas.height/2) - (boxTopRightMatrix.bottom*boxMultiplier)
  box.topRight(topRightX, topRightY);

  let BottomLeftX = (canvas.width/2) + (boxBottomLeftMatrix.top*boxMultiplier)
  let BottomLeftY = (canvas.height/2) - (boxBottomLeftMatrix.bottom*boxMultiplier)
  box.bottomLeft(BottomLeftX, BottomLeftY);

  let BottomRightX = (canvas.width/2) + (boxBottomRightMatrix.top*boxMultiplier)
  let BottomRightY = (canvas.height/2) - (boxBottomRightMatrix.bottom*boxMultiplier)
  box.bottomRight(BottomRightX, BottomRightY);
}

// box
var box = new Box(0, 0, 0, 0, 0, 0, 0, 0, ctx);
updateBoxCorners();

// on values update
function update() {
  clearCanvas();

  ctx.strokeStyle = '#aaa';
  xAxis.draw();
  yAxis.draw();

  updateBoxMatrices();
  updateBoxCorners();

  box.draw();
};

update();
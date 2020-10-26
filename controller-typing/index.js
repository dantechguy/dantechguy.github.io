var threshold = 0.5;

var textDiv = document.querySelector('#text');
var upDiv = document.querySelector('#up');
var leftDiv = document.querySelector('#left');
var rightDiv = document.querySelector('#right');
var downDiv = document.querySelector('#down');

var gamepadIndex;
let sticks = {
  left: {},
  right: {},
  dir: 0,
  len: 0,
  dir8: 8,
  a: {},
  b: {},
  x: {},
  y: {},
  dpad8: 8,
  lb: {},
  lt: {},
  rb: {},
  rt: {},
  menu: {},
  window: {}
};



/*
7 0 1
 \|/
6-8-2
 /|\
5 4 3
*/

window.addEventListener("gamepadconnected", function(e) {
  let gamepad = e.gamepad;
  if (gamepad.id === 'Xbox 360 Controller (XInput STANDARD GAMEPAD)') {
    gamepadIndex = gamepad.index;
    gameLoop();
  };
});

function gameLoop() {
  sticks = getGamepadInfo(sticks, gamepadIndex);
  writeText(sticks);
  showButtons(sticks);
  requestAnimationFrame(gameLoop);
}

function writeText(sticks) {
  let dir8 = sticks.left.dir8;
  if (dir8 !== 8) {
    let lt = sticks.lt.pressed;
    let a = sticks.a.touched;
    let b = sticks.b.touched;
    let x = sticks.x.touched;
    let y = sticks.y.touched;
    if (a) {
      let char = letters[lt][dir8].a;
      textDiv.textContent += char;
    };
    if (b) {
      let char = letters[lt][dir8].b;
      textDiv.textContent += char;
    };
    if (x) {
      let char = letters[lt][dir8].x;
      textDiv.textContent += char;
    };
    if (y) {
      let char = letters[lt][dir8].y;
      textDiv.textContent += char;
    };
  }
  let rt = sticks.rt.touched;
  if (rt) {
    textDiv.textContent = textDiv.textContent.slice(0, -1);
  }
}

function showButtons(sticks) {
  let dir8 = sticks.left.dir8;
  if (dir8 !== 8) {
    let lt = sticks.lt.pressed;

    let upText = letters[lt][dir8].y;
    let leftText = letters[lt][dir8].x;
    let rightText = letters[lt][dir8].b;
    let downText = letters[lt][dir8].a;

    upDiv.textContent = upText;
    leftDiv.textContent = leftText;
    rightDiv.textContent = rightText;
    downDiv.textContent = downText;
  } else {
    upDiv.textContent = '';
    leftDiv.textContent = '';
    rightDiv.textContent = '';
    downDiv.textContent = '';
  }
}
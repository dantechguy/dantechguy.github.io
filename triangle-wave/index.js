var allOscs = {};

document.addEventListener("touchstart", touchStart);
document.addEventListener("touchmove", touchMove);
document.addEventListener("touchend", touchEnd);

function touchStart(event) {
  var changedTouches = event.changedTouches;

  for (i=0; i<changedTouches.length; i++) {

    let touchJson = changedTouches[i];
    let identifier = touchJson.identifier;
    let touchX = touchJson.clientX;
    let touchY = touchJson.clientY;

    let osc = new p5.Oscillator('square')

    let freq = map(touchX, 0, width, 40, 10000);
    osc.freq(freq);

    let amp = map(touchY, 0, height, 1, .01);
    osc.amp(amp);

    osc.start();

    allOscs[identifier] = osc;
  };
};

function touchMove(event) {
  var changedTouches = event.changedTouches;

  for (i=0; i<changedTouches.length; i++) {

    let touchJson = changedTouches[i];
    let identifier = touchJson.identifier;
    let touchX = touchJson.clientX;
    let touchY = touchJson.clientY;

    let osc = allOscs[identifier];

    let freq = map(touchX, 0, width, 40, 10000);
    osc.freq(freq, 0.1);

    let amp = map(touchY, 0, height, 1, .01);
    osc.amp(amp, 0.1);
  };
};
function touchEnd(event) {
  var changedTouches = event.changedTouches;

  for (i=0; i<changedTouches.length; i++) {

    let touchJson = changedTouches[i];
    let identifier = touchJson.identifier;

    let osc = allOscs[identifier];

    osc.stop();

    delete allOscs[identifier];
  
  };
};
function setup() {
  createCanvas(window.innerWidth-50, window.innerHeight-50);
};

function draw() {
  background(0);
};
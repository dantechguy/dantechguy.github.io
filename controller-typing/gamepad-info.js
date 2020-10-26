function getGamepadInfo(sticks, gamepadIndex) {
  let gamepad = navigator.getGamepads()[gamepadIndex];

  sticks.left.x = gamepad.axes[0];
  sticks.left.y = gamepad.axes[1];
  sticks.right.x = gamepad.axes[2];
  sticks.right.y = gamepad.axes[3];

  sticks.a.previouslyPressed = sticks.a.pressed;
  sticks.b.previouslyPressed = sticks.b.pressed;
  sticks.x.previouslyPressed = sticks.x.pressed;
  sticks.y.previouslyPressed = sticks.y.pressed;
  sticks.lb.previouslyPressed = sticks.lb.pressed;
  sticks.rb.previouslyPressed = sticks.rb.pressed;
  sticks.lt.previouslyPressed = sticks.lt.pressed;
  sticks.rt.previouslyPressed = sticks.rt.pressed;
  sticks.window.previouslyPressed = sticks.window.pressed;
  sticks.menu.previouslyPressed = sticks.menu.pressed;
  sticks.left.previouslyPressed = sticks.left.pressed;
  sticks.right.previouslyPressed = sticks.right.pressed;
  sticks.right.previouslyPressed = sticks.right.pressed;

  sticks.a.pressed = gamepad.buttons[0].pressed;
  sticks.b.pressed = gamepad.buttons[1].pressed;
  sticks.x.pressed = gamepad.buttons[2].pressed;
  sticks.y.pressed = gamepad.buttons[3].pressed;
  sticks.lb.pressed = gamepad.buttons[4].pressed;
  sticks.rb.pressed = gamepad.buttons[5].pressed;
  sticks.lt.pressed = gamepad.buttons[6].pressed;
  sticks.rt.pressed = gamepad.buttons[7].pressed;
  sticks.window.pressed = gamepad.buttons[8].pressed;
  sticks.menu.pressed = gamepad.buttons[9].pressed;
  sticks.left.pressed = gamepad.buttons[10].pressed;
  sticks.right.pressed = gamepad.buttons[11].pressed;
  sticks.right.pressed = gamepad.buttons[11].pressed;

  sticks.a.touched = sticks.a.pressed && !sticks.a.previouslyPressed;
  sticks.b.touched = sticks.b.pressed && !sticks.b.previouslyPressed;
  sticks.x.touched = sticks.x.pressed && !sticks.x.previouslyPressed;
  sticks.y.touched = sticks.y.pressed && !sticks.y.previouslyPressed;
  sticks.lb.touched = sticks.lb.pressed && !sticks.lb.previouslyPressed;
  sticks.rb.touched = sticks.rb.pressed && !sticks.rb.previouslyPressed;
  sticks.lt.touched = sticks.lt.pressed && !sticks.lt.previouslyPressed;
  sticks.rt.touched = sticks.rt.pressed && !sticks.rt.previouslyPressed;
  sticks.window.touched = sticks.window.pressed && !sticks.window.previouslyPressed;
  sticks.menu.touched = sticks.menu.pressed && !sticks.menu.previouslyPressed;
  sticks.left.touched = sticks.left.pressed && !sticks.left.previouslyPressed;
  sticks.right.touched = sticks.right.pressed && !sticks.right.previouslyPressed;
  sticks.right.touched = sticks.right.pressed && !sticks.right.previouslyPressed;
  
  sticks.left.dir = getStickDirection(sticks.left);
  sticks.right.dir = getStickDirection(sticks.right);

  sticks.left.len = pythagoras(sticks.left.x, sticks.left.y);
  sticks.right.len = pythagoras(sticks.right.x, sticks.right.y);

  sticks.left.dir8 = getStickDir8(sticks.left);
  sticks.right.dir8 = getStickDir8(sticks.right);

  return sticks;
}

function getStickDirection(stick) {
  let dir = radiansToDegrees(
    Math.atan(
      stick.y / stick.x )) + 90;

  if (stick.x < 0) {
    dir += 180;
  };

  return dir;
}

function radiansToDegrees(angle) {
  return angle * (180 / Math.PI);
}

function pythagoras(x, y) {
  return Math.sqrt( (x*x) + (y*y) );
}

function getStickDir8(stick) {
  if (stick.len < threshold) {
    return 8;
  } else {
    return Math.floor(((stick.dir/45)+0.5)%8);
  }
}
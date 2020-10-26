document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

var letterInfo = {};

var allLetters = '0123456789qwertyuiopasdfghjklzxcvbnm,. '.split("");
allLetters.push('Enter', 'Shift');

var specialChars = {
  '_': 'Space',
  '⏎': 'Enter',
  '⇧': 'Shift'
}


function isKeyValid(event) {
  return allLetters.includes(event.key);
}

function convertSpace(char) {
  if (char === ' ') {
    return 'Space'
  } else if (Object.keys(specialChars).includes(char)) {
    return specialChars[char];
  } else {
    return char
  }
}

function keyDown(event) {
  if (isKeyValid(event)) {
    key = convertSpace(event.key);
    letterInfo[key].down = true;
    updateKeys();
  };
}

function keyUp(event) {
  if (isKeyValid(event)) {
    key = convertSpace(event.key);
    letterInfo[key].down = false;
    updateKeys();
  };
}

function updateKeys() {
  for (i=0; i<allLetters.length; i++) {
    key = convertSpace(allLetters[i]);
    letterJson = letterInfo[key];
    letterDom = letterJson.dom;
    letterIsPressed = letterJson.down;
    if (letterIsPressed) {
      // letterDom.get(0).style.backgroundColor = '#ddd';
      letterDom.get(0).style.top = '10px';
    } else {
      letterDom.get(0).style.backgroundColor = '#fff';
      letterDom.get(0).style.top = '0';
    }
    
  };

}

function findAllKeys() {
  $('.key').each(function() {
    let domElement = $( this );
    let domText = domElement.text();
    if (Object.keys(specialChars).includes(domText)) {
      domText = specialChars[domText];
    };
    letterInfo[convertSpace(domText)] = {
      dom: domElement,
      down: false
    };
  });
}

findAllKeys();
var sentences;
var sentence = 0;
var keysPressed = {};


function speak() {
  responsiveVoice.speak(sentences[sentence]);
  sentence++;
  document.getElementById('line-input').value = sentence;
}

function loadUrl() {
  let url = document.getElementById('url-input').value;
  httpGetAsync(url, recieveHttp);
}

function recieveHttp(data) {
  data = data.replace(/^\s+|\s+$/g, ' ');
  let sentenceSeparator = document.getElementById('sentence-separator').value;
  sentences = data.split(sentenceSeparator);
  console.log('load success');
  console.log(sentences[0])
}

document.addEventListener("keydown", function(event) {
    keysPressed[event.key] = true;
    checkShiftEnter();
})

document.addEventListener("keyup", function(event) {
    delete keysPressed[event.key];
})

function checkShiftEnter() {
  console.log(keysPressed)
  keysDown = Object.keys(keysPressed);
  if (keysDown.includes('Shift') && keysDown.includes('Enter')) {
    sentence--;
    speak();
  } else if (keysDown.includes('Enter')) {
    speak();
  }
}




function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
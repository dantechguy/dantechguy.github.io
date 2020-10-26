function format() {
  let syntax = {
    '```': {
      true: '<code class=\'code-block\'>',
      false: '</code>',
      open: true,
    },
    '`': {
      true: '<code>',
      false: '</code>',
      open: true,
    },
    '**': {
      true: '<strong>',
      false: '</strong>',
      open: true,
    },
    '*': {
      true: '<em>',
      false: '</em>',
      open: true,
    },
    '_': {
      true: '<u>',
      false: '</u>',
      open: true,
    },
    '\/\/\/': {
      true: '<br>',
      false: '<br>',
      open: true,
    },
    '<\\': {
      true: '&lt;',
      false: '&lt;',
      open: true,
    }
  }
  document.querySelectorAll('.format').forEach( element => {
    let text = element.textContent;
    // Object.keys().forEach( term => {
    //   let index;
    //   while (index = text.indexOf(term) !== -1) {
    //
    //   };
    // });
    let newText = text.replace(/```|`|\*\*|\*|_|\/\/\/|<\\/g, char => {
      let term = syntax[char][syntax[char].open];
      syntax[char].open = !syntax[char].open;
      return term;
    });
    element.innerHTML = newText;
  });
}

// function codeBlockFormat() {
//   document.querySelectorAll('code.code-block').forEach(element => {
//     element.textContent.split('\n').forEach(line => {
//
//     });
//   });
// }

format();
// codeBlockFormat();

var navMenuContainer = document.querySelector('#nav-menu-container');
var navUl = document.querySelector('#sidebar > ul');
var classes = {
  LINK: 'nav-link',
  ITEM: 'nav-item',
  SUBLINK: 'nav-sublink',
  SUBMENU: 'nav-submenu',
}
var navItems = {
  'Home': 'index.html',
  'HTML': {
    'Introduction':   'html.html',
    'HTML':           'html.html#html',
    'Head':           'html.html#head',
    'Title':         'html.html#title',
    'Link':          'html.html#link',
    'Body':           'html.html#body',
    'Headings':       'html.html#h1h6',
    'Image':          'html.html#img',
    'Hyperlink':      'html.html#a',
    'Div':            'html.html#div',
    'Form':           'html.html#form',
    'Input':          'html.html#input',
    'Paragraph':      'html.html#p',
    'Ordered list':   'html.html#ol',
    'Unordered list': 'html.html#ul',
    'List item':      'html.html#li',
    'Script':         'html.html#script',
  },
  'CSS': {
    'Introduction': 'css.html',
    'Selectors': {
      'Element':    'css.html#element',
      'ID':         'css.html#id',
      'Class':      'css.html#class',
    },
    'Properties': {
      'background-color': 'css.html#background-color',
      'border-color':     'css.html#border-color',
      'border-width':     'css.html#border-width',
      'color':            'css.html#color',
      'font-family':      'css.html#font-family',
      'font-size':        'css.html#font-size',
      'height':           'css.html#height',
      'width':            'css.html#width',
    },
  },
  'JS': {
    'Introduction':   'js.html',
    'getElementById': 'js.html#getelementbyid',
    'innerHTML':      'js.html#innerhtml',
    'write':          'js.html#write',
    'alert':          'js.html#alert',
  },
  'Searching': {
    'Introduction': 'search.html',
    'Crawling':     'search.html#crawling',
    'Indexing':     'search.html#indexing',
    'Meta tags':    'search.html#metatags',
    'Page rank':    'search.html#pagerank',
  },
}

function generateNav(container, object, path, hideClasses) {
  for (let key in object) {
    let value = object[key];

    let li = document.createElement('li');
    let a = document.createElement('a');
    let span = document.createElement('span');
    span.textContent = key;
    a.classList.add(classes.ITEM, 'shine');
    a.classList.add(...hideClasses);
    a.style.paddingLeft = `${20 * (path.length + 1)}px`;
    a.dataset.hiddenParents = hideClasses.length;
    a.appendChild(span);
    li.appendChild(a);
    container.appendChild(li);

    switch (typeof value) {

      case 'string':    // is a link
        a.classList.add(classes.LINK);
        a.href = value;
        break;

      case 'object':    // is a submenu
        let i = document.createElement('i');
        i.classList.add('fas', 'fa-angle-down');
        a.appendChild(i);
        a.classList.add(classes.SUBLINK);
        let subObject = object[key];
        let subPath = path.concat(key.toLowerCase());
        let subLinkHideClass = `nav-${subPath.join('-')}-hide`;
        let newHideClasses = hideClasses.concat(subLinkHideClass);
        a.href='#'
        a.dataset.toggleSelector = `.${subLinkHideClass}`;
        a.dataset.toggleOn = 'true';
        a.dataset.toggleStagger = '10';
        let ulLi = document.createElement('li');
        let ul = document.createElement('ul');
        ulLi.appendChild(ul);
        container.appendChild(ulLi);
        generateNav(ul, subObject, subPath, newHideClasses);
        break;
    };
  }
}

function generateMenu(container) {
  // <a id='nav-menu' href="#" data-toggle-selector='nav' data-toggle-on='true'><i class="fas fa-bars"></i></a>
  let a = document.createElement('a');
  let i = document.createElement('i');
  i.classList.add('fas', 'fa-bars');
  a.id = 'nav-menu';
  a.dataset.toggleSelector = 'nav';
  a.dataset.toggleOn = 'true';
  a.href = '#';
  a.appendChild(i);
  container.prepend(a);
}

generateMenu(navMenuContainer);
generateNav(navUl, navItems, [], []);

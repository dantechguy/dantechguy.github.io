var cols = 100;
var rows = 50;
var font = {
  font: '15px Courier New',
  height_factor: 3,
  baseline: 'middle',
  size: {
    width: null,
    height: null,
  }
};
var line = {
  thickness: 1,
  colour: '#eee',
};
var chars = {
  line: '#',
  empty: ' ',
  order: [{x:0, y:-1}, {x:1, y:0}, {x:0, y:1}, {x:-1, y:0}],
  edges: {
    '0000': '+',
    '1000': 'v',
    '0100': '<',
    '0010': '^',
    '0001': '>',
    '0101': '-',
    '1010': '|',
    '0110': '+',
    '0011': '+',
    '1100': '+',
    '1001': '+',
    '1110': '+',
    '1011': '+',
    '0111': '+',
    '1101': '+',
    '1111': '+',
  }
};

var export_button = document.getElementById('export');
var output_div = document.getElementById('output');
var cols_input = document.getElementById('cols');
var rows_input = document.getElementById('rows');
var size_button = document.getElementById('size');
export_button.addEventListener('click', export_data);
size_button.addEventListener('click', set_canvas_size);
cols_input.value = cols;
rows_input.value = rows;

var data = create_empty_array();
var mouse_state = 'up';
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
setup_canvas_style();
font.size = get_font_size();
set_canvas_size();
set_event_listeners();
render_canvas({x:0, y:0, width:cols, height:rows});

function export_data() {
    let text = '';
    for (let y=0; y<rows; y++) {
        text += rendered_data[y].join('') + '\n';
    };
    output_div.value = text;
    output_div.select();
};

function create_empty_array() {
  let data = [];
  for (let row=0; row<rows; row++) {
      data.push(new Array(cols).fill(chars.empty));
  }
  return data;
}

function render_data(rect) {
  rendered_data = create_empty_array();
  for (let y=rect.y; y<rect.y+rect.height; y++) {
    for (let x=rect.x; x<rect.x+rect.width; x++) {
      if (data[y][x] === chars.line) {
        let char_code_array = [];
        for (let order_i=0; order_i<chars.order.length; order_i++) {
          let dir = chars.order[order_i];
          let test_x = x+dir.x;
          let test_y = y+dir.y;
          if (test_x < 0 || test_x > cols-1 || test_y < 0 || test_y > rows-1) {
            char_code_array.push('0');
          } else {
            let joined_dir = joined_at_dir = data[y+dir.y][x+dir.x] === chars.line ? '1' : '0';
            char_code_array.push(joined_dir);
          };
        };
        let char_code = char_code_array.join('');
        let char = chars.edges[char_code];
        rendered_data[y][x] = char;
      } else {
        rendered_data[y][x] = data[y][x];
      }
    }
  }
}

function get_font_size() {
  let test_text = 'abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+|';
  let metrics = ctx.measureText(test_text);
  return {
    width: (metrics.width / test_text.length),
    height: metrics.actualBoundingBoxAscent*font.height_factor,
  };
}

function update_size_variables() {
  let new_cols = Math.max(1, parseInt(cols_input.value));
  let new_rows = Math.max(1, parseInt(rows_input.value));
  if (new_cols !== cols) {
    for (let row=0; row<rows; row++) {
      data[row].length = new_cols;
      data[row].fill(chars.empty, cols);
    }
  }
  if (new_rows !== rows) {
    data.length = new_rows;
    if (new_rows > rows) {
      // the issue??
      data.fill(new Array(cols).fill(chars.empty), rows);
    };
  };
  cols = new_cols;
  rows = new_rows;
}

function setup_canvas_style() {
  ctx.font = font.font;
  ctx.strokeStyle = line.colour;
  ctx.lineWidth = line.thickness;
  ctx.textBaseline = font.baseline;
}

function set_canvas_size() {
  update_size_variables();
  canvas.width = cols * font.size.width;
  canvas.height = rows * font.size.height;
  setup_canvas_style();
  render_canvas({x:0, y:0, width:cols, height:rows});
}

function render_canvas(rect) {
  ctx.clearRect(rect.x * font.size.width, rect.y * font.size.height, rect.width * font.size.width, rect.height * font.size.height);
  render_data(rect);
  for (let y=rect.y; y<rect.y+rect.height; y++) {
    let text_line = rendered_data[y].slice(rect.x, rect.x+rect.width).join('');
    ctx.fillText(text_line, rect.x*font.size.width, (y+0.5)*font.size.height);

    ctx.beginPath();
    ctx.moveTo(rect.x*font.size.width, y*font.size.height + 0.5);
    ctx.lineTo((rect.x+rect.width)*font.size.width, y*font.size.height + 0.5);
    ctx.stroke();
  }
  for (let x=rect.x; x<rect.x+rect.width; x++) {
    ctx.beginPath();
    ctx.moveTo(x*font.size.width + 0.5, rect.y*font.size.height);
    ctx.lineTo(x*font.size.width + 0.5, (rect.y+rect.height)*font.size.height);
    ctx.stroke();
  }
}

function set_event_listeners() {
  canvas.addEventListener('mousedown', mouse_down);
  canvas.addEventListener('mousemove', mouse_move);
  canvas.addEventListener('mouseup', mouse_up);
  canvas.addEventListener('mouseout', mouse_up);
  canvas.addEventListener('contextmenu', mouse_erase);
}

function get_click_coords(event) {
    let rect = event.target.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    }
}

function mouse_down(event) {
  if (mouse_state === 'down' || mouse_state === 'erase') {
    input_text(event);
  } else {
    mouse_state = event.button === 0 ? 'down' : 'erase';
    mouse_move(event);
  }
}

function mouse_move(event) {
  if (mouse_state === 'down' || mouse_state === 'erase') {
    let coords = get_click_coords(event);
    let x = Math.floor(coords.x / font.size.width);
    let y = Math.floor(coords.y / font.size.height);
    data[y][x] = mouse_state === 'down' ? chars.line : chars.empty;
    // render_canvas({x:x-1, y:y-1, width:3, height:3});
    render_canvas({x:0, y:0, width:cols, height:rows});
  }
}

function mouse_up(event) {
  mouse_state = 'up';
}

function mouse_erase(event) {
  event.preventDefault();
}

function input_text(event) {
  mouse_state = 'up';
  let coords = get_click_coords(event);
  let x = Math.floor(coords.x / font.size.width);
  let y = Math.floor(coords.y / font.size.height);
  let text = prompt('enter text') || '';
  for (let i=0, l=text.length; i<l; i++) {
    if (x > cols-1) {
      break;
    }
    data[y][x+i] = text[i];
  }
  render_canvas({x:0, y:0, width:cols, height:rows});
}

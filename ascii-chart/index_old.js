var rows = 1;
var cols = 1;
var font_text = '15px Courier New';
// var font_text = '15px monospace';
var height_factor = 1.5;
var line_width = 1;
var stroke_style = '#ddd';
var text_baseline = 'middle';
var chars = {
  line: '#',
  empty: ' ',
  order: [{x:0, y:-1}, {x:1, y:0}, {x:0, y:1}, {x:-1, y:0}],
  edges: {
    '0000': '+',

    // '1000': '│',
    // '0100': '─',
    // '0010': '│',
    // '0001': '─',
    // '0101': '─',
    // '1010': '│',
    // '0110': '┌',
    // '0011': '┐',
    // '1100': '└',
    // '1001': '┘',
    // '1110': '├',
    // '1011': '┤',
    // '0111': '┬',
    // '1101': '┴',
    // '1111': '┼',

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
var export_output_div = document.getElementById('output');
export_button.addEventListener('click', export_data);
var cols_range = document.getElementById('cols');
var rows_range = document.getElementById('rows');
cols_range.addEventListener('change', set_canvas_size);
rows_range.addEventListener('change', set_canvas_size);

var data = setup_data();
update_size_variables();
var rendered_data = setup_data();
var mouse_state = 'up';
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.font = font_text;
var font = get_font_size();
set_canvas_size();
set_event_listeners();
render_canvas({x:0, y:0, width:cols, height:rows});

function export_data() {
    let text = '';
    for (let y=0; y<rows; y++) {
        for (let x=0; x<cols; x++) {
            text += rendered_data[y][x];
        };
        text += '\n';
    };
    export_output_div.textContent = text;
};

function setup_data() {
  let row = [];
  let data = [];
  for (let i=0; i<cols; i++) {
    row = [];
    row.length = cols;
    row.fill(chars.empty);
    data.push(row);
  }
  return data;
}

function render_data(rect) {
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
    height: metrics.actualBoundingBoxAscent*height_factor,
  };
}

function update_size_variables() {
  let new_cols = parseInt(cols_range.value);
  let new_rows = parseInt(rows_range.value);
  if (new_cols !== cols) {
    for (let y=0; y<rows; y++) {
      data[y].length = new_cols;
      data[y].fill(chars.empty, cols-1);
    }
  }
  if (new_rows !== rows) {
    data.length = new_rows;
    let temp_row;
    if (new_rows > rows) {
        temp_row = [];
        temp_row.length = cols;
        temp_row.fill(chars.empty);
        data.fill(temp_row, rows-1);
    }
  }
  cols = new_cols;
  rows = new_rows;
}

function set_canvas_size() {
  update_size_variables();
  canvas.width = cols * font.width;
  canvas.height = rows * font.height;
  ctx.font = font_text;
  ctx.strokeStyle = stroke_style;
  ctx.lineWidth = line_width;
  ctx.textBaseline = text_baseline;
  render_canvas({x:0, y:0, width:cols, height:rows});
}

function render_canvas(rect) {
  ctx.clearRect(rect.x * font.width, rect.y * font.height, rect.width * font.width, rect.height * font.height);
  render_data(rect);
  for (let y=rect.y; y<rect.y+rect.height; y++) {
    let text_line = rendered_data[y].slice(rect.x, rect.x+rect.width).join('');
    ctx.fillText(text_line, rect.x*font.width, (y+0.5)*font.height);

    ctx.beginPath();
    ctx.moveTo(rect.x*font.width, y*font.height + 0.5);
    ctx.lineTo((rect.x+rect.width)*font.width, y*font.height + 0.5);
    ctx.stroke();
  }
  for (let x=rect.x; x<rect.x+rect.width; x++) {
    ctx.beginPath();
    ctx.moveTo(x*font.width + 0.5, rect.y*font.height);
    ctx.lineTo(x*font.width + 0.5, (rect.y+rect.height)*font.height);
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
    let x = Math.floor(coords.x / font.width);
    let y = Math.floor(coords.y / font.height);
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
  let x = Math.floor(coords.x / font.width);
  let y = Math.floor(coords.y / font.height);
  let text = prompt('enter text') || '';
  for (let i=0, l=text.length; i<l; i++) {
    if (x > cols-1) {
      break;
    }
    data[y][x+i] = text[i];
  }
  render_canvas({x:0, y:0, width:cols, height:rows});
}

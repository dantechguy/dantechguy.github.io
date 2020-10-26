class Line {
  constructor(x1, y1, x2, y2, ctx) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.ctx = ctx;
  }

  startCoordinate(x, y) {
    this.x1 = x;
    this.y1 = y;
  }

  endCoordinate(x, y) {
    this.x2 = x;
    this.y2 = y;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x1, this.y1);
    this.ctx.lineTo(this.x2, this.y2);
    this.ctx.stroke();
  }
}
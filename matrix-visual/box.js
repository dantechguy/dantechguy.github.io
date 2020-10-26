class Box {
  constructor(x1, y1, x2, y2, x3, y3, x4, y4, ctx) {
    this.line1 = new Line(x1, y1, x2, y2, ctx);
    this.line2 = new Line(x2, y2, x3, y3, ctx);
    this.line3 = new Line(x3, y3, x4, y4, ctx);
    this.line4 = new Line(x4, y4, x1, y1, ctx);
    this.ctx = ctx;
  }

  topLeft(x, y) {
    this.line1.startCoordinate(x, y);
    this.line4.endCoordinate(x, y);
  }

  topRight(x, y) {
    this.line2.startCoordinate(x, y);
    this.line1.endCoordinate(x, y);
  }

  bottomLeft(x, y) {
    this.line4.startCoordinate(x, y);
    this.line3.endCoordinate(x, y);
  }

  bottomRight(x, y) {
    this.line3.startCoordinate(x, y);
    this.line2.endCoordinate(x, y);
  }

  draw() {
    ctx.strokeStyle = '#f00';
    this.line1.draw();
    ctx.strokeStyle = '#00f';
    this.line2.draw();
    ctx.strokeStyle = '#0f0';
    this.line3.draw();
    ctx.strokeStyle = '#000';
    this.line4.draw();
  }
}
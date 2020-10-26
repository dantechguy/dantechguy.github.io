class Matrix2x2 {
  constructor(v1, v2, v3, v4) {
    this.size = '2x2';
    this.topLeft = v1;
    this.topRight = v2;
    this.bottomLeft = v3;
    this.bottomRight = v4;
  }

  multiplyBy(matrix) {
    if (matrix.size === '2x2') {

    } else {
      return null;
    }
  }
}

class Matrix2x1 {
  constructor(v1, v2) {
    this.size = '2x1';
    this.top = v1;
    this.bottom = v2;
  }

  multiplyBy(matrix) {
    if (matrix.size === '2x2') {

      let top = (matrix.topLeft * this.top) + (matrix.topRight * this.bottom);
      let bottom = (matrix.bottomLeft * this.top) + (matrix.bottomRight * this.bottom);

      let resultMatrix = new Matrix2x1(top, bottom);
      return resultMatrix;

    } else if (matrix.size === '2x1') {

      let top = (matrix.top * this.top);
      let bottom = (matrix.bottom * this.bottom);

      let resultMatrix = new Matrix2x1(top, bottom);
      return resultMatrix;

    } else {
      return null;
    }
  }
}
class Matrix {
  constructor (rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = [];
    for (let i = 0; i < this.rows; i++) {
      this.data[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = 0;
      }
    }
  }

  // take json data and turn it into a matrix
  static fromJSON (json) {
    const matrix = new Matrix(json.rows, json.cols);
    matrix.data = json.data;
    return matrix;
  }

  static multiply (a, b) {
    // Matrix product
    if (a.cols !== b.rows) {
      throw new Error(`Columns of A (${a.cols}) must match rows of B (${b.rows}).`);
    }
    let result = new Matrix(a.rows, b.cols);
    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        // Dot product of values in col
        let sum = 0;
        for (let k = 0; k < a.cols; k++) {
          sum += a.data[i][k] * b.data[k][j];
        }
        result.data[i][j] = sum;
      }
    }
    return result;
  }

  multiply (n) {
    if (n instanceof Matrix) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] *= n.data[i][j];
        }
      }
    } else {
      // Scalar product
      let result = new Matrix(this.rows, this.cols);
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          result.data[i][j] = this.data[i][j] * n;
        }
      }
      return result;
    }
  }

  // Either adds a scalar to a matrix or does element-wise addition (adds a matrix to a matrix)
  add (n) {
    if (n instanceof Matrix) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] = this.data[i][j] + n.data[i][j];
        }
      }
      return this;
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] = this.data[i][j] + n;
        }
      }
      return this;
    }
  }

  // turn matrix into a scalar by adding all the values
  static sum (a) {
    let sum = 0;
    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < a.cols; j++) {
        sum += a.data[i][j];
      }
    }
    return sum;
  }

  static subtract (a, b) {
    var result = new Matrix(a.rows, a.cols);
    for (var i = 0; i < result.rows; i++) {
      for (var j = 0; j < result.cols; j++) {
        result.data[i][j] = a.data[i][j] - b.data[i][j];
      }
    }
    return result;
  }

  randomize () {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = Math.random() * 2 - 1;
      }
    }
    return this;
  }

  static transpose (a) {
    let result = new Matrix(a.cols, a.rows);
    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < a.cols; j++) {
        result.data[j][i] = a.data[i][j];
      }
    }
    return result;
  }

  static fromArray (arr) {
    let matrix = new Matrix(arr.length, 1);
    for (let i = 0; i < arr.length; i++) {
      matrix.data[i][0] = arr[i];
    }
    return matrix;
  }

  toArray () {
    let arr = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        arr.push(this.data[i][j]);
      }
    }
    return arr;
  }

  // map applies a function to every element of the matrix
  map (func) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = func(this.data[i][j]);
      }
    }
    return this;
  }

  static map (a, func) {
    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < a.cols; j++) {
        a.data[i][j] = func(a.data[i][j]);
      }
    }
    return a;
  }

  // print the matrix
  print () {
    console.table(this.data);
  }
}
// Constructor function
var Board = function(size) {
  this._size = size;
  this._cells = Array(size).fill(null).map(() => Array(size).fill(null));
}

// Prototype methods.
Board.prototype.getCell = function(row, column) {
  return this._cells[row][column];
}

Board.prototype.setCell = function(row, column, value) {
  this._cells[row][column] = value;
}

Board.prototype.showBoard = function() {
  this._cells.forEach((row) => {
    let rowString = "";
    row.forEach((cell) => {
      rowString += cell + " ";
    })
    console.log(rowString);
  });
}

Board.prototype.getSize = function() {
  return this._size;
}

Board.prototype.getAdjacentFlagsCount = function(row, column) {
  let count = 0;
  count += this.isCellAFlag(row - 1, column - 1);
  count += this.isCellAFlag(row + 1, column - 1);
  count += this.isCellAFlag(row - 1, column + 1);
  count += this.isCellAFlag(row + 1, column + 1);
  count += this.isCellAFlag(row - 1, column);
  count += this.isCellAFlag(row + 1, column);
  count += this.isCellAFlag(row, column + 1);
  count += this.isCellAFlag(row, column - 1);
  return count;
}

Board.prototype.isCellAFlag = function(row, column) {
  let size = this._size;
  if (row < 0 || column < 0 || row >= size || column >= size) {
    return 0;
  } else {
    return this._cells[row][column] === 'F' ? 1 : 0;
  }

}

module.exports = Board;
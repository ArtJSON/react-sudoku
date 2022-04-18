function solve(board = []) {
  let solveSeed = Math.floor(Math.random() * 9);

  // iterate over each row
  for (let row = 0; row < 9; row++) {
    // iterate over each number in that row
    for (let col = 0; col < 9; col++) {
      // if a number is equal to 0, try to solve it
      if (board[row][col] === 0) {
        // iterate over each possible value in that spot
        for (let number = 1; number <= 9; number++) {
          // start solving from random number to randomize the board
          let tryNumber = ((number + solveSeed) % 9) + 1;
          // if the number is safe try to solve the board recursively
          if (isNumberSafe(board, tryNumber, row, col)) {
            // if the board is solved recursively, return true. Else, the number is incorrect and try for another value
            board[row][col] = tryNumber;
            if (solve(board)) {
              return true;
            } else {
              board[row][col] = 0;
            }
          }
        }
        // after iterating over all values the board wasn't solved, it is unsolvable
        return false;
      }
    }
  }

  return true;
}

function isNumberSafe(board, num, row, col) {
  if (num === 0) {
    return false;
  }

  // Check if this number is already in the row
  for (let i = 0; i < 9; i++) {
    if (board[row][i] == num) {
      return false;
    }
  }

  // Check if this number is already in the column
  for (let i = 0; i < 9; i++) {
    if (board[i][col] == num) {
      return false;
    }
  }

  // Check if this number is already in the 3x3 block
  let startRow = row - (row % 3);
  let startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] == num) {
        return false;
      }
    }
  }

  return true;
}

module.exports.isNumberSafe = isNumberSafe;
module.exports.solve = solve;

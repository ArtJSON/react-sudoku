import React, { Component } from "react";
import Field from "./Field";
import "../styles/board.css";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startingBoard: this.innitBoard(),
      playBoard: this.innitBoard(),
      good: false,
      bad: false,
    };
    this.fillBoard = this.fillBoard.bind(this);
    this.onFieldUpdate = this.onFieldUpdate.bind(this);
    this.checkSudoku = this.checkSudoku.bind(this);
  }

  static defaultProps = {
    difficulty: 0.01,
  };

  componentDidMount() {
    this.fillBoard();
  }

  // fill board with 9 arrays each containing 9 zeros
  innitBoard() {
    return [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  // fills board with random numbers by tring to solve it, removes random numbers to create a game
  fillBoard() {
    let board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    this.solve(board);

    board = board.map((r) => {
      return r.map((n) => {
        if (Math.random() < this.props.difficulty) {
          return 0;
        } else {
          return n;
        }
      });
    });

    // after all operations set component state to created board
    this.setState({
      startingBoard: board,
      playBoard: board.map(function (arr) {
        return arr.slice();
      }),
    });
    this.setState({ bad: false, good: false });
  }

  solve(board = []) {
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
            if (this.isNumberSafe(board, tryNumber, row, col)) {
              // if the board is solved recursively, return true. Else, the number is incorrect and try for another value
              board[row][col] = tryNumber;
              if (this.solve(board)) {
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

  isNumberSafe(board, num, row, col) {
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

  onFieldUpdate(row, col, val) {
    this.setState((prevState) => {
      prevState.playBoard[row][col] = val;
      return prevState;
    });
    this.setState({ bad: false, good: false });
  }

  checkSudoku() {
    let copy = this.state.playBoard.map(function (arr) {
      return arr.slice();
    });

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        let temp = copy[row][col];
        copy[row][col] = 0;
        let isSafe = this.isNumberSafe(copy, temp, row, col);
        if (!isSafe) {
          this.setState({ bad: true });
          return false;
        }
        copy[row][col] = temp;
      }
    }
    this.setState({ good: true });
    return true;
  }

  render() {
    return (
      <div
        className={`fields-container ${this.state.bad ? " bad" : ""} ${
          this.state.good ? " good" : ""
        }`}
      >
        <h1>Sudoku game</h1>
        <h2 className="status">
          {!this.state.good && !this.state.bad ? "Good luck!" : ""}
          {this.state.good ? "You win!" : ""}
          {this.state.bad ? "Try again" : ""}&nbsp;
        </h2>
        <table>
          <tbody>
            {this.state.playBoard.map((row, rowNum) => {
              return (
                <tr>
                  {row.map((f, colNum) => {
                    return (
                      <td>
                        <Field
                          disabled={
                            (f !== 0 &&
                              f === this.state.startingBoard[rowNum][colNum]) ||
                            this.state.good
                          }
                          value={f}
                          rowNum={rowNum}
                          colNum={colNum}
                          fieldHandler={this.onFieldUpdate}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="btn-container">
          <button className="btn-options" onClick={this.fillBoard}>
            Generate new game
          </button>
          <button className="btn-options" onClick={this.checkSudoku}>
            Check your sudoku
          </button>
          <button className="btn-options">Solve sudoku</button>
        </div>
      </div>
    );
  }
}

export default Board;

import React, { Component } from "react";
import Field from "./Field";
import "../styles/board.css";
import { solve, isNumberSafe } from "./SudokuBacktrackingSolver";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startingBoard: this.innitBoard(),
      playBoard: this.innitBoard(),
      won: false,
      bad: false,
    };
    this.fillBoard = this.fillBoard.bind(this);
    this.onFieldUpdate = this.onFieldUpdate.bind(this);
    this.checkSudoku = this.checkSudoku.bind(this);
    this.solveBoard = this.solveBoard.bind(this);
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
    solve(board);

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
    this.setState({ bad: false, won: false });
  }

  onFieldUpdate(row, col, val) {
    this.setState((prevState) => {
      prevState.playBoard[row][col] = val;
      return prevState;
    });
    this.setState({ bad: false, won: false });
  }

  checkSudoku() {
    let copy = this.state.playBoard.map(function (arr) {
      return arr.slice();
    });

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        let temp = copy[row][col];
        copy[row][col] = 0;
        let isSafe = isNumberSafe(copy, temp, row, col);
        if (!isSafe) {
          this.setState({ bad: true });
          return false;
        }
        copy[row][col] = temp;
      }
    }
    this.setState({ won: true });
    return true;
  }

  solveBoard() {
    let unsolved = this.state.startingBoard.map(function (arr) {
      return arr.slice();
    });

    solve(unsolved);

    this.setState({
      playBoard: unsolved.map(function (arr) {
        return arr.slice();
      }),
    });
  }

  render() {
    return (
      <div
        className={`fields-container ${this.state.bad ? " bad" : ""} ${
          this.state.won ? " won" : ""
        }`}
      >
        <h1>Sudoku game</h1>
        <h2 className="status">
          {!this.state.won && !this.state.bad ? "won luck!" : ""}
          {this.state.won ? "You win!" : ""}
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
                            this.state.won
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
          <button
            disabled={this.state.won}
            className="btn-options"
            onClick={this.solveBoard}
          >
            Solve sudoku
          </button>
        </div>
      </div>
    );
  }
}

export default Board;

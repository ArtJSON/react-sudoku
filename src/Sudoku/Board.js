import React, { Component } from "react";
import Field from "./Field";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldsValues: [],
    };
  }

  static defaultProps = {
    height: 9,
    width: 9,
  };

  // fill board with 9 arrays each containing 9 zeros
  innitBoard() {
    let newBoard = [];
    for (let i = 0; i < 9; i++) {
      newBoard.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
    return newBoard;
  }

  // fills board with random numbers, removes random numbers to create a game
  fillBoard() {
    let board = this.innitBoard();
    for (let i = 0; i < this.props.nrows; i++) {
      let row = [];
      for (let j = 0; j < this.props.ncols; j++) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);
    }

    return board;
  }

  solve(board) {}

  render() {
    return <div></div>;
  }
}

export default Board;

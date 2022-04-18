import React, { Component } from "react";
import Board from "./Board";
import "../styles/sudokuGame.css";

class SudokuGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulty: 0.5,
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
    console.log(evt.target.name);
  }

  getDifficultyText(dif) {
    if (dif < 0.1) {
      return "easy";
    } else if (dif < 0.3) {
      return "medium";
    } else {
      return "hard";
    }
  }

  render() {
    return (
      <div className="sudoku-game-container">
        <Board difficulty={this.state.difficulty} />
        <div className="settings">
          <label className="label" htmlFor="difficulty">
            Difficulty:
          </label>
          <input
            type="range"
            id="difficulty"
            name="difficulty"
            min="0.01"
            max="0.8"
            step="0.01"
            onInput={this.handleInput}
            value={this.state.difficulty}
          />
          <p className="difficulty-text">
            {this.getDifficultyText(this.state.difficulty)}
          </p>
        </div>
      </div>
    );
  }
}

export default SudokuGame;

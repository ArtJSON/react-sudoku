import React, { Component } from "react";
import "./Styles.css";

class Field extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value ? "" : props.value,
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(evt) {
    const pattern = /[^1-9]/g;
    if (pattern.test(evt.target.value)) {
      this.setState({ value: "" });
    } else {
      this.setState({ value: evt.target.value });
    }
  }

  render() {
    return (
      <div>
        <form>
          <input
            onInput={this.handleInput}
            className="field-input"
            maxLength="1"
            type="text"
            value={this.state.value}
          ></input>
        </form>
      </div>
    );
  }
}

export default Field;

import React, { Component } from "react";
import "./Styles.css";

class Field extends Component {
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(evt) {
    const pattern = /[^1-9]/g;
    if (pattern.test(evt.target.value)) {
    } else {
      let props = this.props;
      props.fieldHandler(props.rowNum, props.colNum, evt.target.value);
    }
  }

  render() {
    return (
      <input
        onInput={this.handleInput}
        className="field-input"
        maxLength="1"
        type="text"
        value={this.props.value}
        disabled={this.props.disabled}
      ></input>
    );
  }
}

export default Field;

import React, { Component } from "react";
import "./Button.css";

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button: "",
    };
  }
  render() {
    return (
      <div className="ButtonWrapper">
        <button className="Button">{this.props.button}</button>
      </div>
    );
  }
}

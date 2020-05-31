import React, { Component } from "react";
import "./FrameOptions.css";

export default class FrameOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFrame: "",
    };
  }
  render() {
    return (
      <section className="FrameOptions">
        <h4>Please select from our frames in stock</h4>
      </section>
    );
  }
}

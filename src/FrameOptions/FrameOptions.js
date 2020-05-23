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
        <h3>Please select from our frames in stock</h3>
        <div>
          <div className="FrameImage">Frame1</div>
          <div className="FrameImage">Frame2</div>
          <div className="FrameImage">Frame3</div>
          <div className="FrameImage">Frame4</div>
          <div className="FrameImage">Frame5</div>
          <div className="FrameImage">Frame6</div>
        </div>
      </section>
    );
  }
}

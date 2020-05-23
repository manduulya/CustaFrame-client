import React, { Component } from "react";
import "./UploadPage.css";

export default class UploadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newImage: "",
    };
  }
  render() {
    return (
      <section className="UploadPage">
        <h2>Please upload your artwork!</h2>
        <button>Upload!</button>
        <h2>Or try on our stock images</h2>
        <div className="StockImage">Stock Image</div>
        <button>Click to Frame!</button>
      </section>
    );
  }
}

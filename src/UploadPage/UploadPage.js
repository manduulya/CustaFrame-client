import React, { Component } from "react";
import "./UploadPage.css";
import Frame from "../Frame/Frame";

const API_HOST = "http://localhost:8000/api/";

export default class UploadPage extends Component {
  state = {
    form: {
      image: null,
      width: 1.0,
    },
    selectedFrame: null,
    frames: [],
  };

  onImageUpload(e) {
    const input = e.currentTarget;
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.setState({ form: { ...this.state.form, image: e.target.result } });
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  setSelectedFrame(selectedFrame) {
    this.setState({ selectedFrame });
  }

  setWidth(width) {
    this.setState({ form: { ...this.state.form, width } });
  }
  border(f) {
    if (f.id === this.state.selectedFrame.id) return "3px solid black";
    return "3px solid white";
  }

  render() {
    const { form, frames, selectedFrame } = this.state;
    return (
      <>
        <form
          encType="multipart/form-data"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="ImageUpload">Select an image</label>
          <br />
          <input
            id="ImageUpload"
            name="imageUpload"
            type="file"
            onChange={(e) => this.onImageUpload(e)}
          />
          <br />
          <label htmlFor="frameWidth">Width:</label>
          <br />
          <input
            type="number"
            id="frameWidth"
            step="0.1"
            value={form.width}
            name="frameWidth"
            onChange={(e) => this.setWidth(e.currentTarget.value)}
          />
        </form>

        {frames.map((f, i) => (
          <img
            key={i}
            className="colorPicker"
            src={`${API_HOST}assets/${f.dispImage}`}
            style={{ border: this.border(f) }}
            onClick={() => this.setSelectedFrame(f)}
            alt={f.name}
          ></img>
        ))}
        <br style={{ clear: "both" }} />

        {form.image && (
          <Frame src={form.image} frame={selectedFrame} width={form.width} />
        )}
      </>
    );
  }

  componentDidMount() {
    fetch(`${API_HOST}frames`)
      .then((r) => r.json())
      .then((data) =>
        this.setState({ frames: data.frames, selectedFrame: data.frames[0] })
      );
  }
}

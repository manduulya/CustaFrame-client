import React, { Component } from "react";
import "./UploadPage.css";
import Frame from "../Frame/Frame";
import OrderForm from "../OrderForm/OrderForm";

/*const API_HOST = "https://cryptic-anchorage-91632.herokuapp.com/api/";*/
const API_HOST = "http://localhost:8000/api/";

function imageInfo(img, baseWidth) {
  const aspectRatio = img.height / img.width;
  const height = baseWidth * aspectRatio;
  return {
    aspectRatio,
    height,
    width: baseWidth,
  };
}

export default class UploadPage extends Component {
  state = {
    image: null,
    width: 1.0,
    height: null,
    selectedFrame: null,
    frames: [],
    aspectRatio: null,
  };

  onImageUpload(e) {
    const input = e.currentTarget;
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e) => {
        const imageSource = e.target.result;
        const img = new Image();

        img.onload = () => {
          this.setState({
            image: imageSource,
            ...imageInfo(img, this.state.width),
          });
        };

        img.src = imageSource;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  setSelectedFrame(selectedFrame) {
    this.setState({ selectedFrame });
  }

  border(f) {
    if (f.id === this.state.selectedFrame.id) return "3px solid black";
    return "3px solid white";
  }

  render() {
    const {
      image,
      width,
      height,
      frames,
      selectedFrame,
      aspectRatio,
    } = this.state;
    return (
      <>
        <section className="UploadPage">
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
              value={width}
              name="frameWidth"
              onChange={(e) => this.setWidth(e.currentTarget.value)}
            />
          </form>

          {frames.map((f) => (
            <img
              key={f.urlName}
              className="colorPicker"
              src={`${API_HOST}assets${f.dispImage}`}
              style={{ border: this.border(f) }}
              onClick={() => this.setSelectedFrame(f)}
              alt={f.name}
            ></img>
          ))}

          <br style={{ clear: "both" }} />

          {image && <Frame src={image} frame={selectedFrame} width={width} />}

          {image && (
            <OrderForm
              width={width}
              height={height}
              aspectRatio={aspectRatio}
            />
          )}
        </section>
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

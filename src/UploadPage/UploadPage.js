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

function calculatePrice(width, height, pricePerFeet) {
  console.log(height, width);
  return ((height + width) * 2 * pricePerFeet).toFixed(2);
}

export default class UploadPage extends Component {
  state = {
    image: null,
    selectedFrame: null,
    frames: [],
    form: {
      aspectRatio: null,
      width: 1.0,
      height: null,
      email: "",
      message: "",
      name: "",
    },
  };

  onImageUpload(e) {
    const form = this.state.form;

    const input = e.currentTarget;
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e) => {
        const imageSource = e.target.result;
        const img = new Image();

        img.onload = () => {
          this.setState({
            form: { ...form, ...imageInfo(img, this.state.width) },
            image: imageSource,
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

  changeForm(data) {
    this.setState({ form: { ...this.state.form, ...data } });
  }

  submitData() {
    const { form, image, selectedFrame } = this.state;

    return fetch(`${API_HOST}po`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: {
        customer_name: form.name,
        width: form.width,
        height: form.height,
        email: form.email,
        message: form.message,
        image,
        frame_name: selectedFrame.name,
        total: calculatePrice(
          form.width,
          form.height,
          this.setSelectedFrame.pricePerFeet
        ),
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((purchaseOrder) => {
        this.context.addPurchaseOrder(purchaseOrder);
        this.props.history.push(`/pos`);
      });
  }

  render() {
    const { image, frames, selectedFrame, form } = this.state;
    return (
      <>
        <section className="UploadPage">
          <form
            className="UploadPageForm"
            encType="multipart/form-data"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="ImageUpload" className="UploadHeader">
              Select an image
            </label>
            <br />
            <input
              id="ImageUpload"
              name="imageUpload"
              type="file"
              onChange={(e) => this.onImageUpload(e)}
            />
            <br />
            {/* <label htmlFor="frameWidth">Width:</label>
            <br />
            <input
              type="number"
              id="frameWidth"
              step="0.1"
              value={width}
              name="frameWidth"
              onChange={(e) => this.setWidth(e.currentTarget.value)}
            /> */}
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

          {image && (
            <Frame src={image} frame={selectedFrame} width={form.width} />
          )}

          {image && (
            <OrderForm
              {...form}
              pricePerFeet={Number(selectedFrame.pricePerFeet)}
              changeForm={(data) => this.changeForm(data)}
              submitData={() => this.submitData()}
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

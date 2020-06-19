import React, { Component } from "react";
import "./UploadPage.css";
import Frame from "../Frame/Frame";
import OrderForm from "../OrderForm/OrderForm";
import axios from "axios";

const API_HOST = "https://cryptic-anchorage-91632.herokuapp.com/api/";
// const API_HOST = "http://localhost:8000/api/";

function imageInfo(img, baseWidth) {
  const aspectRatio = img.height / img.width;
  return {
    aspectRatio,
    width: baseWidth,
  };
}

export default class UploadPage extends Component {
  state = {
    image: null,
    selectedFrame: null,
    selectedFile: null,
    frames: [],
    form: {
      aspectRatio: null,
      width: 1.0,
      email: "",
      message: "",
      name: "",
    },
    error: null,
  };
  height() {
    return this.state.form.width * this.state.form.aspectRatio;
  }
  //calculating the total price from user's width and height
  calculatePrice() {
    return (
      (this.height() + this.state.form.width) *
      2 *
      this.state.selectedFrame.pricePerFeet
    ).toFixed(2);
  }
  //on image upload getting values from the image for the width and height
  onImageUpload(event) {
    const form = this.state.form;
    const input = event.currentTarget;
    this.setState({ selectedFile: input.files[0] });

    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e) => {
        const imageSource = e.target.result;
        const img = new Image();

        img.onload = () => {
          this.setState({
            form: { ...form, ...imageInfo(img, this.state.form.width) },
            image: imageSource,
          });
        };

        img.src = imageSource;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  //setting the frame as the selected one
  setSelectedFrame(selectedFrame) {
    this.setState({ selectedFrame });
  }
  //setting up a border around the selected from from the list
  border(f) {
    if (f.id === this.state.selectedFrame.id) return "3px solid black";
    return "3px solid white";
  }

  //changing all states inside the form based on the user input.
  changeForm(data) {
    this.setState({ form: { ...this.state.form, ...data } });
  }

  //making fetch req
  submitData() {
    const { form, selectedFrame, selectedFile } = this.state;

    return fetch(`${API_HOST}po`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        customer_name: form.name,
        email: form.email,
        customers_file: selectedFile,
        frame_name: selectedFrame.name,
        width: form.width,
        height: this.height(),
        note: form.message,
        total_price: this.calculatePrice(),
      }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then(() => {
        this.props.history.push(`/exit`);
      });
  }
  //upload handler calls axios request to make POST request to upload an image to AWS S3
  uploadHandler = (e) => {
    const data = new FormData(); // If file selected
    if (this.state.selectedFile) {
      data.append(
        "uploadImage",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      axios
        .post(`${API_HOST}upload`, data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        })
        .then((response) => {
          if (200 === response.status) {
            // If file size is larger than expected.
            if (response.data.error) {
              if ("LIMIT_FILE_SIZE" === response.data.error.code) {
                this.ocShowAlert("Max size: 2MB", "red");
              } else {
              }
            } else {
              // Success
              let fileName = response.data;
              this.setState({ selectedFile: fileName.location });
              this.setState({ uploadStatus: true });
            }
          }
        })
        .catch((error) => {
          // If another error
        });
    } else {
      // if file not selected throw error
    }
  };

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
              selectedFile
              pricePerFeet={Number(selectedFrame.pricePerFeet)}
              changeForm={(data) => this.changeForm(data)}
              submitData={() => this.submitData()}
              calculatePrice={() => this.calculatePrice()}
              uploadHandler={(e) => this.uploadHandler(e)}
            />
          )}
        </section>
      </>
    );
  }
  //fetching from static files from express
  componentDidMount() {
    fetch(`${API_HOST}frames`)
      .then((r) => r.json())
      .then((data) =>
        this.setState({ frames: data.frames, selectedFrame: data.frames[0] })
      );
  }
}

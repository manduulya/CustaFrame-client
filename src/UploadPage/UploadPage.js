import React, { Component } from "react";
import "./UploadPage.css";
import Frame from "../Frame/Frame";
import OrderForm from "../OrderForm/OrderForm";
import axios from "axios";

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
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      selectedFrame: null,
      selectedFile: null,
      frames: [],
      form: {
        aspectRatio: null,
        width: 1.0,
        height: null,
        email: "",
        message: "",
        name: "",
      },
      error: null,
    };
  }
  calculatePrice() {
    return (
      (this.state.form.height + this.state.form.width) *
      2 *
      this.state.selectedFrame.pricePerFeet
    ).toFixed(2);
  }
  onImageUpload(event) {
    const form = this.state.form;
    const input = event.currentTarget;
    this.setState({ selectedFile: input.files[0] });
    console.log(input.files);

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
        height: form.height,
        note: form.message,
        total_price: this.calculatePrice(
          form.width,
          form.height,
          this.setSelectedFrame.pricePerFeet
        ),
      }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then(() => {
        this.props.history.push(`/`);
      });
  }

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
                console.log(response.data); // If not the given file type
              }
            } else {
              // Success
              let fileName = response.data;
              console.log("fileName", fileName);
              this.setState({ selectedFile: fileName.location });
              console.log(this.state.selectedFile);
            }
          }
        })
        .catch((error) => {
          // If another error
          console.log(error);
        });
    } else {
      // if file not selected throw error
      console.log("error");
    }
  };

  // uploadHandler = (e) => {
  //   e.preventDefault();
  //   const data = new FormData(); // If file selected
  //   if (this.state.selectedFile) {
  //     console.log(this.state.selectedFile);
  //     data.append(
  //       "uploadImage",
  //       this.state.selectedFile,
  //       this.state.selectedFile.name
  //     );
  //     fetch(`${API_HOST}upload`, {
  //       method: "POST",
  //       headers: {
  //         accept: "application/json",
  //         "Accept-Language": "en-US,en;q=0.8",
  //         "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
  //       },
  //       body: { data },
  //     })
  //       .then((res) => {
  //         if (200 === res.status) {
  //           //if file size is larger than expected
  //           if (res.data.error) {
  //             if ("LIMIT_FILE_SIZE" === res.data.error.code) {
  //               return res.json().then((e) => Promise.reject(e));
  //             } else {
  //               console.log(res.data);
  //               //if not the given file type
  //               return res.send("Wrong file type");
  //             }
  //           } else {
  //             let fileName = res.data;
  //             console.log("fileName", fileName);
  //             res.send("File Uploaded!");
  //           }
  //         }
  //       })
  //       .catch((error) => {
  //         this.setState({ error: error.message });
  //       });
  //     //
  //     //       .then((response) => {
  //     //         if (200 === response.status) {
  //     //           // If file size is larger than expected.
  //     //           if (response.data.error) {
  //     //             if ("LIMIT_FILE_SIZE" === response.data.error.code) {
  //     //               this.ocShowAlert("Max size: 2MB", "red");
  //     //             } else {
  //     //               console.log(response.data); // If not the given file type
  //     //               this.ocShowAlert(response.data.error, "red");
  //     //             }
  //     //           } else {
  //     //             // Success
  //     //             let fileName = response.data;
  //     //             console.log("fileName", fileName);
  //     //             this.ocShowAlert("File Uploaded", "#3089cf");
  //     //           }
  //     //         }
  //     //       })
  //     //       .catch((error) => {
  //     //         // If another error
  //     //         this.ocShowAlert(error, "red");
  //     //       });
  //     //   } else {
  //     //     // if file not selected throw error
  //     //     this.ocShowAlert("Please upload file", "red");
  //   }
  // };

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

  componentDidMount() {
    fetch(`${API_HOST}frames`)
      .then((r) => r.json())
      .then((data) =>
        this.setState({ frames: data.frames, selectedFrame: data.frames[0] })
      );
  }
}

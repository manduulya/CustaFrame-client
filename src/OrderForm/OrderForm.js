import React, { Component } from "react";
import Button from "../Button/Button";
import "./OrderForm.css";

export default class OrderForm extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     uploadStatus: false,
  //   };
  // }

  validate(purchaseOrder) {
    if (purchaseOrder.email.length < 3)
      return "email has to be valid email address";
    return null;
  }

  changeWidth(e) {
    const { width, height } = this.props;
    const newWidth = Number(e.currentTarget.value);
    const ratio = newWidth / width;
    const newHeight = Number(height * ratio);

    this.props.changeForm({ width: newWidth, height: newHeight });
  }

  formSubmitted = (e) => {
    e.preventDefault();
    const purchaseOrder = {
      width: e.target["width"].value,
      height: e.target["height"].value,
      email: e.target["email"].value,
      message: e.target["message"].value,
      name: e.target["name"].value,
    };

    let validationError = this.validate(purchaseOrder);
    if (validationError) {
      this.setState({ error: validationError });
      return;
    }

    this.props.submitData().catch((error) => {
      this.setState({ error: error.message });
    });
  };

  round(value) {
    return Math.max(Math.ceil(value * 10) / 10).toFixed(2);
  }

  handleChange = (e) => {
    this.props.changeForm({ [e.target.getAttribute("name")]: e.target.value });
  };

  // displaySubmitButton = () => {
  //   this.setState({ uploadStatus: true });
  // };

  render() {
    const { width, height, email, message, name } = this.props;
    const button = "Submit";

    return (
      <form id="orderForm" onSubmit={(e) => this.formSubmitted(e)}>
        <label htmlFor="width">Width: (ft) </label>
        <input
          type="number"
          value={this.round(width)}
          step={0.1}
          id="width"
          onChange={(e) => this.changeWidth(e)}
          required
        ></input>

        <label htmlFor="height">Height: (ft) </label>
        <input
          type="number"
          value={this.round(height)}
          step={0.1}
          id="height"
          onChange={(e) => this.changeWidth(e)}
          required
        ></input>
        <br />
        <label htmlFor="email">Your email: </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => this.handleChange(e)}
          required
        ></input>
        <br />
        <label htmlFor="name">Your name: </label>
        <input
          type="name"
          id="name"
          name="name"
          value={name}
          onChange={(e) => this.handleChange(e)}
          required
        ></input>
        <br />
        <label htmlFor="message">Message:</label>
        <br />
        <textarea
          value={message}
          id="message"
          name="message"
          onChange={(e) => this.handleChange(e)}
          required
        />
        <br />
        <span className="totalPrice">
          Total: $
          {this.props.calculatePrice(
            this.props.width,
            this.props.height,
            this.props.pricePerFeet
          )}
          <p className="totalPriceDescription">
            (This price includes back board, front glass, frame mounting, and
            all other labors.)
          </p>
        </span>
        <div>
          {/* <button
            type="button"
            // onClick={(e) => this.props.uploadHandler(e)}
            onClick={() => this.displaySubmitButton()}
          >
            Upload
          </button> */}
          <Button button={button} />
          {/* {this.state.uploadStatus === true && (
            <Button button={button} uploadStatus={this.state.uploadStatus} />
          )} */}
        </div>
      </form>
    );
  }
}

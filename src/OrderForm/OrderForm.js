import React, { Component } from "react";
import Button from "../Button/Button";
import "./OrderForm.css";

export default class OrderForm extends Component {
  //validating purchase order's email address
  validate(purchaseOrder) {
    if (purchaseOrder.email.length < 3)
      return "email has to be valid email address";
    return null;
  }
  //changing width with aspect ratio
  changeWidth(e) {
    const { width, height } = this.props;
    const newWidth = Number(e.currentTarget.value);
    const ratio = newWidth / width;
    const newHeight = Number(height * ratio);
    this.props.changeForm({ width: newWidth, height: newHeight });
  }
  roundWidth(e) {
    this.props.changeForm({
      width: Math.max(this.round(this.props.width), 1.0),
    });
  }
  //form submitted on button
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
  //rounding too long decimals to hundredth
  round(value) {
    return Number(value.toFixed(2));
  }
  //getting values from user input
  handleChange = (e) => {
    this.props.changeForm({ [e.target.getAttribute("name")]: e.target.value });
  };

  render() {
    const { width, aspectRatio, email, message, name } = this.props;
    const button = "Submit";

    return (
      <form id="orderForm" onSubmit={(e) => this.formSubmitted(e)}>
        <label htmlFor="width">Width: (ft) </label>
        <input
          type="number"
          value={width}
          step={0.1}
          id="width"
          min="1.0"
          onChange={(e) => this.changeWidth(e)}
          onBlur={() => this.roundWidth()}
          required
        ></input>

        <label htmlFor="height">Height: (ft) </label>
        <input
          type="number"
          value={this.round(width * aspectRatio)}
          step={0.1}
          id="height"
          min="1.0"
          disabled="disabled"
          required
        ></input>
        <br />
        <p className="totalPriceDescription">
          (Please select minimum of 1.00 ft width!
          <br />
          You may only enter the width in order to keep the aspect ratio)
        </p>
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
          Your total: $
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
          <Button button={button} />
        </div>
      </form>
    );
  }
}

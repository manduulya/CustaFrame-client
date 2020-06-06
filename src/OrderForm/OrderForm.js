import React, { Component } from "react";
import Button from "../Button/Button";
import "./OrderForm.css";

const API_HOST = "http://localhost:8000/api/";

export default class OrderForm extends Component {
  state = {};
  /* state = {
    width: this.props.width,
    height: this.props.height,
    email: "",
    message: "",
    error: null,
  }; */

  validate(purchaseOrder) {
    if (purchaseOrder.email.length < 3)
      return "email has to be valid email address";
    return null;
  }

  changeWidth(e) {
    const { width, height } = this.props;
    const newWidth = Number(e.currentTarget.value);
    const ratio = newWidth / width;
    const newHeight = height * ratio;

    this.props.changeForm({ width: newWidth, height: newHeight });
  }

  formSubmitted = (e) => {
    e.preventDefault();
    const purchaseOrder = {
      width: e.target["width"].value,
      height: e.target["height"].value,
      email: e.target["email"].value,
      message: e.target["message"].value,
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

  calculatePrice(width, height, pricePerFeet) {
    console.log(height, width);
    return ((height + width) * 2 * pricePerFeet).toFixed(2);
  }

  render() {
    const { width, height, email, message } = this.props;
    const button = "Submit";

    return (
      <form id="orderForm" onSubmit={(e) => this.formSubmitted(e)}>
        <label htmlFor="width">Width:</label>
        <input
          type="number"
          value={this.round(width)}
          step={0.1}
          id="width"
          onChange={(e) => this.changeWidth(e)}
        ></input>

        <label htmlFor="height">Height:</label>
        <input
          type="number"
          value={this.round(height)}
          step={0.1}
          id="height"
          onChange={(e) => this.changeWidth(e)}
        ></input>
        <br />
        <span>
          Total: $
          {this.calculatePrice(
            this.props.width,
            this.props.height,
            this.props.pricePerFeet
          )}
        </span>
        <label htmlFor="email">Your email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => this.handleChange(e)}
        ></input>
        <br />
        <label htmlFor="message">Message:</label>
        <br />
        <textarea
          value={message}
          id="message"
          name="message"
          onChange={(e) => this.handleChange(e)}
        />
        <Button button={button} />
      </form>
    );
  }
}

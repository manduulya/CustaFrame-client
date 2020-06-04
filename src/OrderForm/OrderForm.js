import React, { Component } from "react";
import Button from "../Button/Button";
import "./OrderForm.css";

const API_HOST = "http://localhost:8000/api/";

export default class OrderForm extends Component {
  state = {
    width: this.props.width,
    height: this.props.height,
    email: "",
    message: "",
    error: null,
  };

  validate(purchaseOrder) {
    if (purchaseOrder.email.length < 3)
      return "email has to be valid email address";
    return null;
  }

  changeWidth(e) {
    const { width, height } = this.state;
    const newWidth = Number(e.currentTarget.value);
    const ratio = newWidth / width;
    const newHeight = height * ratio;

    this.setState({ width: newWidth, height: newHeight });
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

    fetch(`${API_HOST}po`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((purchaseOrder) => {
        this.context.addPurchaseOrder(purchaseOrder);
        this.props.history.push(`/pos`);
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  round(value) {
    return Math.max(Math.ceil(value * 10) / 10).toFixed(2);
  }

  handleChange = (e) => {
    this.setState({ [e.target.getAttribute("name")]: e.target.value });
  };

  calculatePrice() {
    console.log(this.state.height, this.state.width);
    return (
      (this.state.height + this.state.width) *
      2 *
      this.props.pricePerFeet
    ).toFixed(2);
  }

  render() {
    const { width, height, email, message } = this.state;
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
        <span>Total: ${this.calculatePrice()}</span>
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

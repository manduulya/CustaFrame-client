import React, { Component } from "react";
import Button from "../Button/Button";

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
    const roundedWidth = Math.max(Math.ceil(newWidth * 10) / 10).toFixed(2);
    const roundedHeight = Math.max(Math.ceil(newHeight * 10) / 10).toFixed(2);

    this.setState({ width: roundedWidth, height: roundedHeight });
  }

  formSubmitted = (e) => {
    e.preventDefault();
    const purchaseOrder = {
      width: e.target["width"].value.trim(),
      height: e.target["height"].value.trim(),
      email: e.target["email"].value.trim(),
      message: e.target["message"].value.trim(),
    };

    let validationError = this.validate(purchaseOrder);
    if (validationError) {
      this.setState({ error: validationError });
      return;
    }

    fetch(`${API_HOST}/pos`, {
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
  render() {
    const { width, height, email, message } = this.state;
    const button = "Submit";

    return (
      <form id="orderForm" onSubmit={(e) => this.formSubmitted(e)}>
        <label htmlFor="width">Width:</label>
        <input
          type="number"
          value={width}
          step={0.1}
          id="width"
          onChange={(e) => this.changeWidth(e)}
        ></input>
        <br />
        <label htmlFor="height">Height:</label>
        <input
          type="number"
          value={height}
          step={0.1}
          id="height"
          onChange={(e) => this.changeWidth(e)}
        ></input>
        <br />
        <label htmlFor="email">Your email:</label>
        <input
          type="email"
          id="email"
          onChange={(e) => this.changeWidth(e)}
        ></input>
        <br />
        <label htmlFor="message">Message:</label>
        <textarea id="message" onChange={(e) => this.changeWidth(e)} />
        <Button button={button} />
      </form>
    );
  }
}

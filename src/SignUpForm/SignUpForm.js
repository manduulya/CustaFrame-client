import React, { Component } from "react";

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      phone: "",
    };
  }

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <form>
        <h2 className="form_header">Sign up!</h2>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            required
          ></input>
        </div>
        <div>
          <label htmlFor="firstname">First name: </label>
          <input
            id="firstname"
            name="firstname"
            type="text"
            placeholder="Enter your first name"
            required
          ></input>
        </div>
        <div>
          <label htmlFor="lastname">Last name: </label>
          <input
            id="lastname"
            name="lastname"
            type="text"
            placeholder="Enter your last name"
            required
          ></input>
        </div>
        <div>
          <label htmlFor="email">E-mail: </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            required
          ></input>
        </div>
        <div>
          <label htmlFor="phone">Phone: </label>
          <input
            id="phone"
            name="phone"
            type="number"
            placeholder="Enter your phone number"
            required
          ></input>
        </div>
        <div className="signUpFormButton">
          <button type="submit">Sign up!</button>
          <button type="button" onClick={this.handleClickCancel}>
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

import React from "react";
import ReactDOM from "react-dom";
import Button from "../Button/Button";
import ExitPage from "../ExitPage/ExitPage";
import App from "./App";
import UploadPage from "../UploadPage/UploadPage";
import OrderForm from "../OrderForm/OrderForm";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Button />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<UploadPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});

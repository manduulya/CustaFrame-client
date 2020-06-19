import React from "react";
import ReactDOM from "react-dom";
import Button from "../Button/Button";
import ExitPage from "../ExitPage/ExitPage";
import App from "./App";
import UploadPage from "../UploadPage/UploadPage";
import { BrowserRouter } from "react-router-dom";
import Frame from "../Frame/Frame";
import OrderForm from "../OrderForm/OrderForm";
import LandingPage from "../LandingPage/LandingPage";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Button />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <ExitPage />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Frame
        src=""
        frame={{
          id: 1,
          name: "frame001",
          urlName: "frame1",
          dispImage: "/frameImages/frame001.png",
          pricePerFeet: 20,
        }}
        width={1}
      />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <OrderForm
        width={1}
        aspectRatio={1}
        calculatePrice={() => 1.0}
        selectedFile=""
        pricePerFeet={1}
        changeForm={() => {}}
        submitData={() => {}}
        uploadHandler={() => {}}
      />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <UploadPage />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

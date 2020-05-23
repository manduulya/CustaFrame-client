import React from "react";
import "./App.css";
import FrameOptions from "../FrameOptions/FrameOptions";
import UploadPage from "../UploadPage/UploadPage";
import LandingPage from "../LandingPage/LandingPage";
import OrderPage from "../OrderPage/OrderPage";

function App() {
  return (
    <main className="App">
      <header className="App-header"></header>
      <LandingPage />
      <FrameOptions />
      <UploadPage />
      <OrderPage />
      <footer>M Printing and Photo studio 2020</footer>
    </main>
  );
}

export default App;

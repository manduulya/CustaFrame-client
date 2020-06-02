import React from "react";
import "./App.css";
import UploadPage from "../UploadPage/UploadPage";
import LandingPage from "../LandingPage/LandingPage";

function App() {
  return (
    <main className="App">
      <header className="App-header"></header>
      <LandingPage />
      <UploadPage />
      <footer>M Printing and Photo studio 2020</footer>
    </main>
  );
}

export default App;

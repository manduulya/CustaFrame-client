import React from "react";
import "./App.css";
import UploadPage from "../UploadPage/UploadPage";
import LandingPage from "../LandingPage/LandingPage";
import { Route } from "react-router-dom";

function App() {
  return (
    <main className="App">
      <header className="App-header"></header>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/upload" component={UploadPage} />
      <footer className="footer">Enkhmanlai Enkhbold 2020</footer>
    </main>
  );
}

export default App;

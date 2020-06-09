import React from "react";
import "./App.css";
import UploadPage from "../UploadPage/UploadPage";
import LandingPage from "../LandingPage/LandingPage";
import ExitPage from "../ExitPage/ExitPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <main className="App">
        <header className="App-header"></header>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/upload" component={UploadPage} />
          <Route exact path="/exit" component={ExitPage} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;

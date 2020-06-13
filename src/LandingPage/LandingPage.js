import React from "react";
import "./LandingPage.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const button = "Start";
  return (
    <main className="LandingPage">
      <div>
        <img
          className="LandingPageLogo"
          src={"http://localhost:8000/api/assets/logo/custaframelogo.png"}
          // src="https://cryptic-anchorage-91632.herokuapp.com/api/assets/logo/custaframelogo.png"
          alt="custaframelogo"
        />
      </div>
      <h2>Welcome to CustaFrame!</h2>
      <p>
        This web app allows you to see how your art-work will look on specific
        frame, before commiting any physical purchase. Therefore, you may make
        the best choice!
      </p>
      <Link to="/upload">
        {" "}
        <Button button={button} />
      </Link>
    </main>
  );
}

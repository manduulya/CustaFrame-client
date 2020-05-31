import React from "react";
import "./LandingPage.css";
import Button from "../Button/Button";

export default function LandingPage() {
  const button = "Start";
  return (
    <main className="LandingPage">
      <div>
        <img
          className="LandingPageLogo"
          src={"http://localhost:8000/api/assets/logo/custaframelogo.png"}
          alt="custaframelogo"
        />
      </div>
      <h2>Welcome to CustaFrame!</h2>
      <p>
        This web app allows you to see how your artwok will look on specific
        frame, before commiting any physical purchase. Therefore, you may make
        the best choice!
      </p>
      <Button button={button} />
    </main>
  );
}

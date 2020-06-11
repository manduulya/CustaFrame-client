import React from "react";
import "./ExitPage.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

export default function ExitPage() {
  const button2 = "New order";
  return (
    <section className="ExitPage">
      <h4>Congratulations on your new order!</h4>
      <p>
        We appreciate your business with us! We will be in touch with you soon!
      </p>
      <Link to="/">
        <Button button={button2} />
      </Link>
    </section>
  );
}

import React from "react";
import "./OrderPage.css";
import Button from "../Button/Button";

export default function OrderPage() {
  const button1 = "Submit order";
  const button2 = "Start over";
  return (
    <section className="OrderPage">
      <h4>
        Here is the final view of your art work with your choice of frames
      </h4>
      <div className="FramedImage">Image with the frame</div>
      <Button button={button1} />
      <Button button={button2} />
    </section>
  );
}

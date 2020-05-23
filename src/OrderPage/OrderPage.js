import React from "react";
import "./OrderPage.css";

export default function OrderPage() {
  return (
    <section className="OrderPage">
      <h2>
        Here is the final view of your art work with your choice of frames
      </h2>
      <div className="FramedImage">Image with the frame</div>
      <button>Submit order</button>
      <button>Start over</button>
    </section>
  );
}

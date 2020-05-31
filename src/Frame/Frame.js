import React from "react";
import "./Frame.css";

const API_HOST = "http://localhost:8000/api/";

export default function Frame({ src, imageHeight, frame, thickness, width }) {
  const frameSize = Math.floor((thickness / width) * imageHeight);

  const gridStyle = {
    gridTemplateRows: `${frameSize}px auto ${frameSize}px`,
    gridTempColumns: `${frameSize}px auto ${frameSize}px`,
  };

  const cornerStyle = {
    width: `${frameSize}px`,
    height: `${frameSize}px`,
  };

  const fStyle = (name) => ({
    backgroundImage: `url(${API_HOST}assets/${frame.urlName}/${name}.png)`,
  });
  const cStyle = (name) => ({
    ...cornerStyle,
    backgroundImage: `url(${API_HOST}assets/${frame.urlName}/${name}.png)`,
  });

  return (
    <div id="FrameGrid" style={gridStyle}>
      <div
        id="nwCorner"
        className="framePiece"
        style={cStyle("nwCorner")}
      ></div>
      <div
        id="topFrame"
        className="framePiece horizontalFrame"
        style={fStyle("horizontalFrame")}
      ></div>
      <div
        id="neCorner"
        className="framePiece"
        style={cStyle("neCorner")}
      ></div>
      <div
        id="rightFrame"
        className="framePiece verticalFrame"
        style={fStyle("verticalFrame")}
      ></div>
      <img src={src} alt="" height={imageHeight}></img>
      <div
        id="leftFrame"
        className="framePiece verticalFrame"
        style={fStyle("verticalFrame")}
      ></div>
      <div
        id="swCorner"
        className="framePiece"
        style={cStyle("swCorner")}
      ></div>
      <div
        id="bottomFrame"
        className="framePiece horizontalFrame"
        style={fStyle("horizontalFrame")}
      ></div>
      <div
        id="seCorner"
        className="framePiece"
        style={cStyle("seCorner")}
      ></div>
    </div>
  );
}

Frame.defaultProps = {
  imageHeight: 300,
  thickness: 0.1,
};

import React from "react";
import "./FaceRecognition.css";

 
const FaceRecognition = ({ imageUrl, box }) => {
  const renderBoundingBoxes = () => {
    if (!box) return null;

    return Object.values(box).map((faceBox, index) => (
      <div
        key={index}
        style={{
          top: faceBox.topRow,
          right: faceBox.rightCol,
          bottom: faceBox.bottomRow,
          left: faceBox.leftCol,
        }}
        className="bounding-box"
      ></div>
    ));
  };
  

  return (
    <div className="center ma">
      <div className="absolute  orientpoint imagebox">
          
          {imageUrl.length >= 3
          
          ?
            
            <img id="inputimage" className="" alt="" src={imageUrl}  height="auto" />
              
        
          : 
            <div></div>
          }
        {renderBoundingBoxes()}
       
      </div>
    </div>
  );
};

export default FaceRecognition;

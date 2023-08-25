import React, { useState } from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({input, button2, onInputChange, onButtonSubmit }) => {
    const [inputValue, setInputValue] = useState("");

    const handleButtonClick = () => {
        if (input.length >= 10){
            if (button2 === "Delete") {
                setInputValue("");
                
            }
            onButtonSubmit();
        }
        
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        onInputChange(event);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p className="f3">
                {"This Magic Brain will detect faces in your pictures. Give it a try."}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input
                        placeholder="Enter jpg URL"
                        value={inputValue}
                        className="f4 pa2 center"
                        onChange={handleInputChange}
                    />
                    <button className="main grow f5 link ph3 pv2 dib white bg-light-purple" onClick={handleButtonClick}>
                        {button2 === "Delete" ? "Delete" : "Detect"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;

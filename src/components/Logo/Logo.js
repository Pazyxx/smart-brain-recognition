import React from "react";
import Tilt from "react-parallax-tilt";
import brain from "./brain.png";
import "./Logo.css" ;

const Logo = () => {
    return (
        <div style={{display: "flex", justifyContent:"center", marginBottom:"50px", marginTop: "3%"}} className="ma4 mt0 logoclass">
            <Tilt className="Tilt br2 shadow-2" options={{max: 55}}>
                <div className="Tilt-inner pa3" style={{ height: '150px', width: "150px"}}>
                    <img alt="logo" src={brain} style={{paddingTop: "5px"}}/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo
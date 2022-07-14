import React from "react";
import "../../styles/app/app.css";

const Header = (props) => {
    return(
        <header className="header">
            <p className="welcome__message"><h2>
                Welcome to the Object Detection platform!
            </h2></p> 
        </header>
    );
}

export default Header;
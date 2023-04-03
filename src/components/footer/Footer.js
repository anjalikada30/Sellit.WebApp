import React from "react";
import "./styles.css";

const Footer = () => {
    return (
        <div className="blind-footer">
            <div className="footer" style={{display: "flex", direction: "column", justifyContent: "center", alignItems: "center"}}>
                <p>&copy; 2023 Sellit. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;

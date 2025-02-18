// DATA
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

// HEADER COMPONENT
const Header = () => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img
            src={`${backendUrl}/images/bdoctors-original-logo.png`} 
            alt="BDoctors Logo" 
            className="logo-img"
          />
        </Link>
        
      </div>
      <div>
        <Navbar />
      </div>
      
    </header>

  );

};

// EXPORT
export default Header;
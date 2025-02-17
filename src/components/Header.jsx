import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img
            src="null" 
            alt="BDoctors Logo" 
          />
        </Link>
        
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
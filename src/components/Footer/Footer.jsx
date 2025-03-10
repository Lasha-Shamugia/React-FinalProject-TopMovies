import React from "react";

const Footer = ({ showFooter }) => {
  return (
    <footer className="footer" style={{ bottom: showFooter ? "0px" : "-100px" }}>
      <p className="mb-0">© 2025 Top Movies / Final Project by Lasha Shamugia</p>
    </footer>
  );
};

export default Footer;
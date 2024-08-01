import React, { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import { FaUser, FaTachometerAlt, FaCog } from "react-icons/fa";

const VerticalDashboard = () => {
  const [activeLink, setActiveLink] = useState(null);

  const handleSetActive = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="vertical-dashboard">
      <Nav className="flex-column">
        <LinkContainer to="/profile" style={{ cursor: "pointer" }}>
          <Nav.Link
            className={activeLink === "profile" ? "active" : ""}
            onClick={() => handleSetActive("profile")}
          >
            <FaUser className="icon" />
            <span className="text">Profile</span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/dashboard" style={{ cursor: "pointer" }}>
          <Nav.Link
            className={activeLink === "dashboard" ? "active" : ""}
            onClick={() => handleSetActive("dashboard")}
          >
            <FaTachometerAlt className="icon" />
            <span className="text">Dashboard</span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/settings" style={{ cursor: "pointer" }}>
          <Nav.Link
            className={activeLink === "settings" ? "active" : ""}
            onClick={() => handleSetActive("settings")}
          >
            <FaCog className="icon" />
            <span className="text">Settings</span>
          </Nav.Link>
        </LinkContainer>
      </Nav>
    </div>
  );
};

export default VerticalDashboard;

import React from "react";
import HomeIcon from "../../Assets/Menu Icons/Home Logo.png";
import HootelRoomIcon from "../../Assets/Menu Icons/Room Logo.png";
import ReservationIcon from "../../Assets/Menu Icons/Reservation Logo.png";
import AboutUsIcon from "../../Assets/Menu Icons/AboutUs logo.png";
import ContactIcon from "../../Assets/Menu Icons/Contact Logo.png";
import { Link } from "react-router-dom";

//CSS
import "./sideMenu.css";

const SideMenu = () => {
  const copyRight = "Developed by CMV.";
  return (
    <div className="sideMenu-container">
      <div className="navBar">
        <ul className="menu-list">
          <li className="nav-links">
            <img className="icon" src={HomeIcon} alt="" />
            <Link to="/homeguest" className="option">
              {" "}
              Home
            </Link>
          </li>
          <li className="nav-links">
            <img className="icon" src={HootelRoomIcon} alt="" />
            <a className="option" href="/homeguest">
              Hotel Rooms
            </a>
          </li>
          <li className="nav-links">
            <img className="icon" src={ReservationIcon} alt="" />
            <a className="option" href="#">
              Reservations
            </a>
          </li>
          <li className="nav-links">
            <img className="icon" src={AboutUsIcon} alt="" />
            <a className="option" href="#">
              About us
            </a>
          </li>
          <li className="nav-links">
            <img className="icon" src={ContactIcon} alt="" />
            <a className="option" href="#">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div className="copyRight">
        <p>{copyRight}</p>
      </div>
    </div>
  );
};

export default SideMenu;

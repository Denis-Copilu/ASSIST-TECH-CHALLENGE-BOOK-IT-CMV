import React from "react";
import HomeIcon from "../../Assets/Menu Icons/Home Logo.png";
import HootelRoomIcon from "../../Assets/Menu Icons/Room Logo.png";
import ReservationIcon from "../../Assets/Menu Icons/Reservation Logo.png";
import AboutUsIcon from "../../Assets/Menu Icons/AboutUs logo.png";
import ContactIcon from "../../Assets/Menu Icons/Contact Logo.png";
import { Link } from "react-router-dom";

//CSS
import "./sideMenu.css";

const SideMenuGuest = () => {
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
            <Link to="/hotelroomsguest" className="option">
              {" "}
              Hotel Rooms
            </Link>
          </li>
          <li className="nav-links">
            <img className="icon" src={ReservationIcon} alt="" />
            <Link to="/reservationguest" className="option">
              {" "}
              Reservations
            </Link>
          </li>
          <li className="nav-links">
            <img className="icon" src={AboutUsIcon} alt="" />

            <Link to="/aboutus" className="option">
              {" "}
              About us
            </Link>
          </li>
          <li className="nav-links">
            <img className="icon" src={ContactIcon} alt="" />
            <Link to="/contactpage" className="option">
              {" "}
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className="copyRight">
        <p>{copyRight}</p>
      </div>
    </div>
  );
};

export default SideMenuGuest;

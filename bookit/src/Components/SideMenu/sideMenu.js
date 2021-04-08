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
            <Link to="/homeadmin" className="option">
              {" "}
              Home
            </Link>
          </li>
          <li className="nav-links">
            <img className="icon" src={HootelRoomIcon} alt="" />
            <Link to="/hotelroomsadmin" className="option">
              {" "}
              Hotel Rooms
            </Link>
          </li>
          <li className="nav-links">
            <img className="icon" src={ReservationIcon} alt="" />
            <Link to="/reservationadmin" className="option">
              {" "}
              Reservations
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

export default SideMenu;

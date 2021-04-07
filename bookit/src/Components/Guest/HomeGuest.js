import React from "react";
import ToolBar from "../NavBar/Toolbar";
import NavBar from "../SideMenu/sideMenuGuest";
import "./HomeGuest.css";
import GuestHomePagePhoto from "../../Assets/HomePageGuestPhoto/GuestHomePagePhoto.png";
import { Link } from "react-router-dom";

function HomeGuest() {
  return (
    <div className="contentPageGuest">
      <ToolBar name={localStorage.getItem("name")} />
      <div className="elementsHomePage">
        <NavBar />
        <div className="content">
          <div className="wallpaper">
            <img src={GuestHomePagePhoto} alt="" />
            <div className="wallpaper-content">
              <div className="search-section">
                <h1>Content SEARCH </h1>
              </div>

              <button className="findOut-Button" type="button">
                <Link to="/aboutus" className="link-AboutUs">
                  {" "}
                  <p id="content-Button">
                    Discover a new way of safe travelling
                  </p>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeGuest;

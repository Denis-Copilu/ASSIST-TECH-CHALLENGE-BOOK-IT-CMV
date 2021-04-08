import React from "react";
import ToolBar from "../NavBar/Toolbar";
import NavBar from "../SideMenu/sideMenu";
import WallpaperAdmin from "../../Assets/AdminHomePage/Wallpaper.svg";
import { Link } from "react-router-dom";

import "./HomeAdmin.css";
function HomeAdmin() {
  return (
    <div className="contentPageAdmin">
      <ToolBar name={localStorage.getItem("name")} />
      <div className="elementsHomePage">
        <NavBar />
        <div className="content">
          <div className="wallpaper-admin">
            <img src={WallpaperAdmin} alt="" />
          </div>
          <div className="guest-button">
            <button type="button" className="buttonGuests">
              {" "}
              <Link to="/seeallguests" className="link-guests">
                <p id="buttonAllGuests">See all the users</p>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeAdmin;

import React from "react";
import { removeUserSession } from "../../Utils/Common";
import ToolBar from "../NavBar/Toolbar";
import NavBar from "../SideMenu/sideMenu";
import "./HomeGuest.css";
import GuestHomePagePhoto from "../../Assets/HomePageGuestPhoto/GuestHomePagePhoto.png";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";

function HomeGuest(props) {
  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    localStorage.removeItem("name");
    props.history.push("/");
  };
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
                {/*  */}
                
              </div>
              <input
                id="buttonLogOut"
                type="button"
                onClick={handleLogout}
                value="Logout"
                className="Logout-button"
              />
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

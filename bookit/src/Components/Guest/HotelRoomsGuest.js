import React from "react";
import { removeUserSession } from "../../Utils/Common";
import ToolBar from "../NavBar/Toolbar";
import NavBar from "../SideMenu/sideMenu";
import "./HomeGuest.css";
import CardList from "./Card";

function HotelRoomsGuest(props) {
 
  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    localStorage.removeItem("name");
    props.history.push("/");
  };
  

  return (
    <div className="contentPageRoomsGuest">
      <ToolBar name={localStorage.getItem("name")} />
      <div className="elementsPageRoomsGuest">
        <NavBar />
         <div className="content">
              <input
                id="buttonLogOut"
                type="button"
                onClick={handleLogout}
                value="Logout"
                className="Logout-button"
              />
              <CardList/>
        </div>
      </div>
    </div>
  );
}

export default HotelRoomsGuest;

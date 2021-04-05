import React from "react";
import notificationIcon from "../../Assets/NavbarIcons/NotificationIcon.png";
import userIcon from "../../Assets/NavbarIcons/userIcon.png";

import "./Toolbar.css";

const Toolbar = (name) => {
  const Logo = "BookIT";
  console.log(name.name);

  const userFullName = name.name;

  const notificationHandler = () => {
    console.log("U pressed the Notification icon!");
  };

  const userIconHandler = () => {
    console.log("U pressed the user Icon!");
  };

  return (
    <div className="navBar-container">
      <div className="navbar">
        <div className="logo">{Logo}</div>
        <div className="right-components">
          <div>
            <img
              src={notificationIcon}
              alt=""
              onClick={notificationHandler}
              id="notificationIcon"
            />
          </div>
          <div id="userName">{userFullName}</div>
          <div>
            <img
              src={userIcon}
              alt=""
              onClick={userIconHandler}
              id="userIcon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;

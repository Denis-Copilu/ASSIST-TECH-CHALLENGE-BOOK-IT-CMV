import React, { useState } from "react";
import notificationIcon from "../../Assets/NavbarIcons/NotificationIcon.png";
import userIcon from "../../Assets/NavbarIcons/userIcon.png";
import { removeUserSession } from "../../Utils/Common";
import { Link } from "react-router-dom";

import "./Toolbar.css";

function Toolbar(name) {
  const [show, setShow] = useState(false);
  const Logo = "BookIT";
  const userFullName = name.name;

  const notificationHandler = () => {
    console.log("U pressed the Notification icon!");
  };
  const handleLogout = () => {
    removeUserSession();
    localStorage.removeItem("name");
    localStorage.removeItem("id");
  };
  return (
    <div className="navBar-container">
      <div className="navbar">
        <div className="logo">{Logo}</div>
        <div className="right-components">
          {show ? (
            <div className="toggleProfile">
              <Link to="/" className="buttonLogOut">
                <input
                  id="buttonLogOut"
                  type="button"
                  onClick={handleLogout}
                  value="Logout"
                />
              </Link>
            </div>
          ) : null}
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
              onClick={() => setShow(!show)}
              id="userIcon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;

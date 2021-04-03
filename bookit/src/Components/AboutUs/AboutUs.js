import React from "react";
import { removeUserSession } from "../../Utils/Common";
import ToolBar from "../NavBar/Toolbar";
import NavBar from "../SideMenu/sideMenu";
import "./AboutUs.css";

function HomeCleaner(props) {
  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    localStorage.removeItem("name");
    props.history.push("/");
  };
  return (
    <div className="contentPageGuest">
      <ToolBar name={localStorage.getItem("name")} />
      <div>
        <NavBar />
        <div className="content">
          <div className="text-container">
            <div className="header-text">
              <h1>About us</h1>
            </div>

            <input
              type="button"
              onClick={handleLogout}
              value="Logout"
              className="Logout-button"
            />
            <div className="box-1">
              <div className="box-header">
                <h3>Who are we?</h3>
              </div>
              <div className="box-text">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Fugiat voluptatum officia nobis, alias tenetur cum maiores
                  facilis tempore sint reiciendis eligendi deleniti magnam
                  excepturi exercitationem impedit perferendis aliquid rem quas?
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Corporis, sequi sed? Nostrum nihil quidem maxime magni quae,
                  deleniti iste voluptate, obcaecati sed ea rem quis pariatur
                  beatae reprehenderit consequatur id esse aliquam nesciunt
                  dolorum, hic modi! At officia assumenda doloribus, maxime sit,
                  aliquam totam sapiente magni natus velit temporibus error?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCleaner;

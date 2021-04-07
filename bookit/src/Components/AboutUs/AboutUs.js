import React from "react";
import ToolBar from "../NavBar/Toolbar";
import NavBar from "../SideMenu/sideMenu";
import "./AboutUs.css";
import AboutUsPhoto from "../../Assets/AboutUsPhoto/aboutus.svg";

function HomeCleaner(props) {
  // handle click event of logout button

  return (
    <div className="contentPageGuest">
      <ToolBar name={localStorage.getItem("name")} />
      <div>
        <NavBar />
        <div className="content">
          <div className="text-container">
            <div className="box-1">
              <div className="box-header">
                <h3>What?</h3>
              </div>
              <div className="box-text">
                <p>
                  We are providing a new way of booking by yourself using our
                  new automatic system. It can be used solely with your phone,
                  so we keep it simple without any much trouble, interaction
                  with other people and paperwork.
                </p>
              </div>
              <div className="box-header">
                <h3>How?</h3>
              </div>
              <div className="box-text">
                <p>
                  How are we doing it? Simple! By visiting our website you can
                  make a reservation of a room. After that the only thing you
                  need to do is to come and use your phone NFC to check-in and
                  check-out. Moreover, you can also use your phone to unlock and
                  lock your room, so no keys are needed.
                </p>
              </div>
              <div className="box-header">
                <h3>Why?</h3>
              </div>
              <div className="box-text">
                <p>
                  Our first motivation was this actual pandemic, whom afected us
                  all. Moreover, we think this can evolve to a hybrid solution
                  when things are going to get better. Do you want to use the
                  classic check-in/ check-out? No problems! But if u want to
                  keep it simple and to reduce the interaction with another
                  people, we also have that option.
                </p>
              </div>
            </div>
            <div className="side-image">
              {" "}
              <img src={AboutUsPhoto} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCleaner;

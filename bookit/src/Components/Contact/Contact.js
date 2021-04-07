import React from "react";
import { removeUserSession } from "../../Utils/Common";
import ToolBar from "../NavBar/Toolbar";
import NavBar from "../SideMenu/sideMenu";
import FacebookIcon from "../../Assets/ContactIcons/facebook-512.png";
import InstagramIcon from "../../Assets/ContactIcons/instagramIcon.png";
import TwitterIcon from "../../Assets/ContactIcons/twitterIcon.png";
import User1 from "../../Assets/ContactIcons/user_1.png";
import User2 from "../../Assets/ContactIcons/user_2.png";
import User3 from "../../Assets/ContactIcons/user_3.png";

import { Link } from "react-router-dom";
import "./Contact.css";

function ContactPage(props) {
  // handle click event of logout button
  const handleLogout = () => {
    console.log(props);
    // removeUserSession();
    // localStorage.removeItem("name");
    // props.history.push("/");
  };
  return (
    <div className="contentPageAdmin">
      <ToolBar name={localStorage.getItem("name")} />
      <div className="elementsHomePage">
        <NavBar />

        <div className="content">
          <div className="box">
            <div className="page-header">
              <h1 id="header">You want to get in touch with us?</h1>
            </div>
            <div className="text-box">
              <h3>
                {" "}
                Then we are waiting for you to leave a message on our social
                pages and see more of our work which may be an interest for you!
              </h3>
            </div>
            <div className="social-icons">
              <Link to="">
                {" "}
                <img src={FacebookIcon} alt="" className="social-icon" />
              </Link>
              <Link to="">
                {" "}
                <img src={InstagramIcon} alt="" className="social-icon" />
              </Link>{" "}
              <Link to="">
                {" "}
                <img src={TwitterIcon} alt="" className="social-icon" />
              </Link>
            </div>
            <div className="text-box-1">
              <h3>
                Moreover, we invite you to read our reviews and even leave one
                on our social pages!
              </h3>
            </div>
            <div className="review-section">
              <div className="item">
                <div className="header-section">
                  {" "}
                  <img src={User1} alt="" /> M. Swain
                </div>
                <div className="review-text-area">
                  <p>
                    “ The process was extremly easy. Everything worked as a
                    charm. I must admit, at first i was skeptical so i was kinda
                    nervous, but my concerns were for nothing and i didn’t
                    encountered any problems. I must say, next time i’ll go in a
                    trip, i’d love to see something like this in the hotel i’ll
                    spend the night. “
                  </p>
                </div>
              </div>
              <div className="item">
                <div className="header-section">
                  {" "}
                  <img src={User2} alt="" /> T. Tailor
                </div>
                <div className="review-text-area">
                  <p>
                    “ Becouse of the current situation, me and my wife were a
                    little bit concerned about the safety of our honey moon. So
                    we opted for this new automatic booking concept. I must say,
                    i thought it’s gonna be a hard time using this app, having
                    in consideration the fact that we’re that much into tech.
                    How wrongly was i, everything was extremly easy. Would use
                    this again 100% “
                  </p>
                </div>
              </div>
              <div className="item">
                <div className="header-section">
                  {" "}
                  <img src={User3} alt="" /> A. Minesk
                </div>
                <div className="review-text-area">
                  <p>
                    “ Not gonna lie, this was the first time when i encounter an
                    option like this and i must say i loved it. Becouse of my
                    work i often need to spend my nights in hotels of many
                    towns, so i become a paperwork hater, but with this, the
                    process was very easy and fast. I hope this will be included
                    by another hotels and it will become a normality “
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;

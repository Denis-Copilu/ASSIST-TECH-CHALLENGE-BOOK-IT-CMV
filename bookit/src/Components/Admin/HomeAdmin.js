import React from "react";
import ToolBar from "../NavBar/Toolbar";
import NavBar from "../SideMenu/sideMenu";
import WallpaperAdmin from "../../Assets/AdminHomePage/Wallpaper.svg";
import { Link } from "react-router-dom";
import { Modal, Button, DropdownButton, Dropdown } from "react-bootstrap";
import axios from "axios";

import "./HomeAdmin.css";
function HomeAdmin() {
  const [showEmailForm, setShowEmailForm] = React.useState(false);
  const [idUserMail, setIdUserMail] = React.useState("2");
  const [titleMail, setTitleMail] = React.useState("");
  const [contentMail, setContentMail] = React.useState("");
  const [showConfirmSendEmail, setShowConfirmSendEmail] = React.useState(false);

  const handleCloseConfirmSendEmail = () => {
    setShowConfirmSendEmail(false);
  };
  const handleShowConfirmSendEmail = () => {
    setShowConfirmSendEmail(true);
  };
  const handleCloseEmailForm = () => {
    setShowEmailForm(false);
  };
  const handleShowEmailForm = () => {
    setShowEmailForm(true);
  };
  const sendEmail = () => {
    axios
      .post(URL + "/user/email", {
        id: parseInt(idUserMail),
        title: titleMail,
        message: contentMail,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("A apărut o problemă." + error);
      });
  };

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
            <button
              type="button"
              className="buttonEmail"
              onClick={() => handleShowEmailForm()}
            >
              Send email
            </button>
            {/* ********************* MODAL SEND EMAIL TO ALL GUESTS ********************/}
            <Modal
              className="ModalEmail"
              show={showEmailForm}
              onHide={handleCloseEmailForm}
              animation={false}
            >
              <Modal.Header>
                <div className="buttonsModalEmail">
                  <button
                    id="btnExit"
                    onClick={handleCloseEmailForm}
                    type="submit"
                  >
                    <i class="material-icons">close</i>
                  </button>
                </div>
              </Modal.Header>
              <Modal.Body>
                <div className="modal-send-email">
                  <form action="send_mail" method="post">
                    <p id="title">Send message to users</p>
                    <div className="toInput1">
                      <p>Send message to: </p>
                      <select
                        id="opt"
                        name="emails"
                        onChange={(e) => {
                          setIdUserMail(e.target.value);
                        }}
                      >
                        <option value="2">Guests</option>
                        <option value="3">Cleaners</option>
                      </select>
                    </div>
                    <div className="subjectInput">
                      <p>Subject: </p>
                      <input
                        id="subject"
                        onChange={(e) => {
                          setTitleMail(e.target.value);
                        }}
                      ></input>
                    </div>
                    <p></p>
                    <div>
                      <p>Message: </p>
                      <textarea
                        id="message"
                        type="text"
                        name="message"
                        required
                        onChange={(e) => {
                          setContentMail(e.target.value);
                        }}
                      ></textarea>
                    </div>
                    <div></div>
                  </form>
                </div>
                <div className="buttonsModalEmail">
                  <p>Think like a proton. Always positive. (^__^) &nbsp; </p>
                  <button
                    onClick={() => {
                      handleCloseEmailForm();
                      handleShowConfirmSendEmail();
                      sendEmail();
                    }}
                    type="submit"
                  >
                    <i class="material-icons">send</i>
                  </button>
                </div>
              </Modal.Body>
            </Modal>
            {/* ************************* MODAL CONFIRM SEND EMAIL ****************************/}
            <Modal
              className="ModalEmailConfirm"
              show={showConfirmSendEmail}
              onHide={handleCloseConfirmSendEmail}
              animation={false}
            >
              <Modal.Body>
                <div>Your emails have been sent successfully.</div>
                <Button
                  id="btnClose"
                  variant="secondary"
                  onClick={() => {
                    handleCloseConfirmSendEmail();
                  }}
                >
                  Ok
                </Button>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeAdmin;

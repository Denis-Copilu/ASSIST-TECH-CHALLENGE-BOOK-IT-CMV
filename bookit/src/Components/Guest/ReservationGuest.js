import React from "react";
import { removeUserSession } from "../../Utils/Common";
import ToolBar from "../NavBar/Toolbar";
import NavBar from "../SideMenu/sideMenu";
import Reservations from "../../Services/Reservations";
import "./ReservationGuest.css";

class UserReservations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
    };
  }

  componentDidMount() {
    Reservations.getReservations().then((response) => {
      this.setState({ reservations: response.data });
    });
  }
  render() {
    const handleLogout = (props) => {
      removeUserSession();
      localStorage.removeItem("name");
      props.history.push("/");
    };
    return (
      <div className="contentPageAdmin">
        <ToolBar name={localStorage.getItem("name")} />
        <div className="elementsHomePage">
          <NavBar />
          <div className="content">
            <div className="content-container">
              <h1>Content Admin Home Page.</h1>
              <input
                id="buttonLogOut"
                type="button"
                onClick={handleLogout}
                value="Logout"
              />
              <table className="table table-striped">
                <tbody>
                  {this.state.reservations.map((reservation) => {
                    {
                      return (
                        <p>
                          {reservation.id} {reservation.startDate}
                          {reservation.endDate} {reservation.userId}
                          {reservation.status} {reservation.annulled}
                          {reservation.price}
                          {reservation.roomNumber}
                        </p>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserReservations;

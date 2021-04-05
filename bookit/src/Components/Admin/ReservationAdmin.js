import React, { useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { removeUserSession } from "../../Utils/Common";
import ToolBar from "../NavBar/Toolbar";
import NavBar from "../SideMenu/sideMenu";
import "./ReservationAdmin.css";

function ReservationsAdmin(props) {
  const url = "http://8b3eb56492b1.ngrok.io";

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    localStorage.removeItem("name");
    props.history.push("/");
  };
  const { useState } = React;

  const [columns, setColumns] = useState([
    { title: "User Id", field: "userId", filtering: false },
    { title: "Start Date", field: "startDate" },
    { title: "End Date", field: "endDate" },
    { title: "Status", field: "status", filtering: false },
    { title: "Annuled", field: "annulled", filtering: false },
    { title: "Price", field: "price", filtering: false },
    { title: "Room Number", field: "roomNumber", filtering: false },
  ]);

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(url + "/api/reservations")
      .then((resp) => {
        setData(resp.data);
      })
      .catch((error) => console.error("123", error));
  }, []);
  return (
    <div className="contentPageAdmin">
      <ToolBar name={localStorage.getItem("name")} />
      <div className="elementsHomePage">
        <NavBar />
        <input
          id="buttonLogOut"
          type="button"
          onClick={handleLogout}
          value="Logout"
        />
        <div className="container-fluid">
          <MaterialTable
            style={{
              position: "fixed",
              margin: "20px 20px 20px 40px",
              height: "78vh",
              width: "80%",
            }}
            title="Reservations"
            columns={columns}
            data={data}
            options={{
              filtering: true,
              headerStyle: {
                backgroundColor: "#1881c7",
                color: "#fff",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ReservationsAdmin;

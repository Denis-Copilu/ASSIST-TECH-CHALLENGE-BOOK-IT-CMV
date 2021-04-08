import React, { useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import axios from "axios";
import ToolBar from "../NavBar/Toolbar";
import NavBar from "../SideMenu/sideMenuGuest";
import {
  useTheme,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";

import "./ReservationGuest.css";

function ReservationsGuest() {
  const url = "http://6eb4af46c242.ngrok.io";
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#4caf50",
      },
      secondary: {
        main: "rgb(177, 224, 255)",
      },
    },
  });

  const { useState } = React;

  const [columns, setColumns] = useState([
    { title: "Start Date", field: "startDate" },
    { title: "End Date", field: "endDate" },
    {
      title: "Status",
      field: "status",
      filtering: false,
      lookup: {
        new: "New",
        "check-in": "Checked-in",
        "check-out": "Checked-out",
      },
    },
    {
      title: "Canceled",
      field: "annulled",
      filtering: false,
      lookup: { false: "No", true: "Yes" },
    },
    { title: "Price", field: "price", filtering: false },
    { title: "Room Number", field: "roomNumber", filtering: false },
  ]);

  const [data, setData] = useState([]);
  var idUser = localStorage.getItem("id");

  useEffect(() => {
    idUser = parseInt(idUser);
    axios
      .get(url + `/reservation/list/${idUser}`) //trebuie adaugat id dupa login
      .then((resp) => {
        setData(resp.data);
      })
      .catch((error) => console.error("123", error));
  }, []);

  const handleCheckIn = (data) => {
    for (let value of data) {
      let idReservation = parseInt(value.id);
      console.log(idReservation);
      axios.put(url + `/reservation/checkin/${idReservation}`);
    }
  };

  const handleCheckOut = (data) => {
    for (let value of data) {
      let idReservation = parseInt(value.id);
      console.log(idReservation);
      axios.put(url + `/reservation/checkout/${idReservation}`);
    }
  };

  const deleteRow = (selectedRow, index) => {
    index = selectedRow.tableData.id;

    axios
      .delete(`${url}/room/delete/${parseInt(data[index].id)}`)
      .then((resp) => {
        // console.log("deleteRow", resp);
        const dataDelete = [...data];
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
      });
  };

  const renderButton = () => {
    return <button>checkIn</button>;
  };

  return (
    <div className="contentPageAdmin">
      <ToolBar name={localStorage.getItem("name")} />
      <div className="elementsHomePage">
        <NavBar />

        <div className="container-fluid">
          <MuiThemeProvider theme={theme}>
            <MaterialTable
              style={{
                position: "relative",
                margin: "20px 20px 20px 300px",
                height: "80vh",
                flexWrap: "wrap",
              }}
              title="Your Reservations"
              columns={columns}
              data={data}
              editable={{
                onRowDelete: (oldData, index) =>
                  new Promise((resolve, reject) => {
                    //   deleteRow(oldData, index);
                    resolve();
                  }),
              }}
              options={{
                selection: true,
                paging: true,
                pageSize: 11, // make initial page size
                pageSizeOptions: [0],
                headerStyle: {
                  backgroundColor: "#1881c7",
                  color: "#fff",
                },
                toolbar: {
                  color: "#fff",
                  backgroundColor: "black",
                },
              }}
              actions={[
                {
                  tooltip: "Check-in",
                  icon: () => <button className="check">Check In</button>,
                  onClick: (evt, data) => handleCheckIn(data),
                },
                {
                  tooltip: "Check-out",
                  icon: () => <button className="check">Check Out</button>,

                  onClick: (evt, data) => handleCheckOut(data),
                },
              ]}
            />
          </MuiThemeProvider>
        </div>
      </div>
    </div>
  );
}

export default ReservationsGuest;

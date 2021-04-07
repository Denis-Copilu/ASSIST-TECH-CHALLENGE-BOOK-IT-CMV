import React, { useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import ToolBar from "../NavBar/Toolbar";
import NavBar from "../SideMenu/sideMenuGuest";

function ReservationsGuest() {
  const url = "https://145a43d17234.ngrok.io";

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
  var id = localStorage.getItem("id");

  useEffect(() => {
    id = parseInt(id);
    axios
      .get(url + `/reservation/list/${id}`) //trebuie adaugat id dupa login
      .then((resp) => {
        setData(resp.data);
      })
      .catch((error) => console.error("123", error));
  }, []);

  // const deleteRow = (selectedRow, index) => {
  //   index = selectedRow.tableData.id;

  //   axios
  //     .delete(`${url}/room/delete/${parseInt(data[index].id)}`)
  //     .then((resp) => {
  //       // console.log("deleteRow", resp);
  //       const dataDelete = [...data];
  //       dataDelete.splice(index, 1);
  //       setData([...dataDelete]);
  //     });
  // };

  return (
    <div className="contentPageAdmin">
      <ToolBar name={localStorage.getItem("name")} />
      <div className="elementsHomePage">
        <NavBar />

        <div className="container-fluid">
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
              paging: true,
              pageSize: 11, // make initial page size
              pageSizeOptions: [0],
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

export default ReservationsGuest;

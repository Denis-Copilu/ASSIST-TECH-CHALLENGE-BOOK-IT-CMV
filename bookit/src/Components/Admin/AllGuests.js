import React, { useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import ToolBar from "../NavBar/Toolbar";
import NavBar from "../SideMenu/sideMenu";

function AllGuests() {
  const url = "http://d322baaeac27.ngrok.io";

  // handle click event of logout button

  const { useState } = React;

  const [columns, setColumns] = useState([
    { title: "User Id", field: "userId", filtering: false },
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
        locked: "Checked-in",
        unlocked: "Checked-in",
        "auto check-out": "Auto Checked-out",
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
  // const getUser = () =>{
  //   if(    axios.get(url+`/users/id/${data.userId}`===data.userId))

  // }

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(url + "/reservation/list")
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

        <div className="container-fluid">
          <MaterialTable
            style={{
              position: "relative",
              margin: "20px 20px 20px 300px",
              height: "79vh",
              maxWidth: "100%",
            }}
            title="All guests"
            columns={columns}
            data={data}
            options={{
              paging: true,
              pageSize: 9, // make initial page size
              pageSizeOptions: [0],
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

export default AllGuests;

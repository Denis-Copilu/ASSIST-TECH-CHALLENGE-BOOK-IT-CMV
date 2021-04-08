import React, { useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import ToolBar from "../NavBar/Toolbar";
import NavBar from "../SideMenu/sideMenu";

function AllGuests() {
  const url = "http://8c9e55db7a2d.ngrok.io";

  // handle click event of logout button

  const { useState } = React;

  const [columns, setColumns] = useState([
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" },
  ]);

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(url + "/user/list")
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

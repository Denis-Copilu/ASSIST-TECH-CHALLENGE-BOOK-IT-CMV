import React, { useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import ToolBar from "../NavBar/Toolbar";
import NavBar from "../SideMenu/sideMenu";

function HotelRoomAdmin() {
  const url = "https://145a43d17234.ngrok.io";

  const { useState } = React;

  const [columns, setColumns] = useState([
    { title: "RoomNumber", field: "id", editable: "never" },
    { title: "MaxCapacity", field: "maxCapacity" },
    { title: "Facilities", field: "facilities" },
    {
      title: "Smoking",
      field: "smoking",
      lookup: { false: "Not allowed", true: "Allowed" },
    },
    {
      title: "PetFriendly",
      field: "petFriendly",
      lookup: { false: "Not allowed", true: "Allowed" },
    },
    { title: "Rating", field: "rating", editable: "never" },
    { title: "NFCTag", field: "nfcTag" },
    { title: "Beds Number", field: "bedsNumber" },
    {
      title: "Cleaned",
      field: "cleaned",
      editable: "never",
      lookup: { false: "Not Cleaned", true: "Cleaned" },
    },
    { title: "Price", field: "price" },
  ]);

  const inputValidation = (input) => {
    if (
      isNaN(input.maxCapacity) ||
      input.facilities != "string" ||
      isNaN(input.nfcTag) ||
      isNaN(input.price)
    ) {
      alert("Your input is invalid");
    } else if (input.price < 50 || input.price > 5000) {
      alert("Your inserted price should be higher than 50 and less than 5000");
    }
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(url + "/room/list")
      .then((resp) => {
        setData(resp.data);
      })
      .catch((error) => console.error("123", error));
  }, []);

  const addRow = (newData) => {
    axios.post(url + "/room/addRoom", newData).then((resp) => {
      // console.log("zzz", resp);
      setData([...data, newData]);
    });
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

  const editRow = (newData, oldData) => {
    const index = oldData.tableData.id;
    newData.id = parseInt(newData.id);
    newData.nfcTag = parseInt(newData.nfcTag);
    inputValidation(newData);

    axios
      .put(`${url}/room/update/${parseInt(data[index].id)}`, newData)
      .then((resp) => {
        console.error(resp);
        const dataUpdate = [...data];
        dataUpdate[index] = newData;
        setData([...dataUpdate]);
      });
  };

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
            title="Rooms"
            columns={columns}
            data={data}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  addRow(newData);

                  resolve();
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  editRow(newData, oldData);
                  resolve();
                }),
              onRowDelete: (oldData, index) =>
                new Promise((resolve, reject) => {
                  deleteRow(oldData, index);
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

export default HotelRoomAdmin;

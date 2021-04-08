import React, { useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import ToolBar from "../NavBar/Toolbar";
import NavBar from "../SideMenu/sideMenu";

function HotelRoomAdmin() {
  const url = "http://d322baaeac27.ngrok.io";

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
    {
      title: "Room type",
      field: "bedsNumber",
      lookup: { 1: "Single", 2: "Double", 3: "Triple", 4: "King Size" },
    },
    {
      title: "Cleaned",
      field: "cleaned",
      editable: "never",
      lookup: { false: "Not Cleaned", true: "Cleaned" },
    },
    { title: "Price", field: "price" },
  ]);

  const editValidation = (input, oldData) => {
    if (input.nfcTag === oldData.nfcTag) {
      alert("The NFC tag needs to be different from the existing one");
    } else if (
      isNaN(input.maxCapacity) ||
      isNaN(input.nfcTag) ||
      isNaN(input.price)
    ) {
      alert("Your input type is invalid");
    } else if (input.price < 50 || input.price > 5000) {
      alert("Your inserted price should be higher than 50 and less than 5000");
    } else if (input.maxCapacity > 6) {
      alert("Due to pandemic condition, room can hold maximum 6 persons.");
    }
  };

  const addValidation = (input) => {
    if (isNaN(input.maxCapacity) || isNaN(input.nfcTag) || isNaN(input.price)) {
      alert("Your input type is invalid!");
    } else if (input.price < 50 || input.price > 5000) {
      alert("Your inserted price should be higher than 50 and less than 5000");
    } else if (input.maxCapacity > 6) {
      alert("Due to pandemic condition, room can hold maximum 6 persons.");
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
    addValidation(newData);
    axios
      .post(url + "/room/addRoom", newData)
      .then((resp) => {
        setData([...data, newData]);
      })
      .catch((error) => console.log(error));
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
    editValidation(newData, oldData);

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
              pageSize: 7, // make initial page size
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

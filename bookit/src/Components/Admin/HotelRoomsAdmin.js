import React, { useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { removeUserSession } from "../../Utils/Common";
import ToolBar from "../NavBar/Toolbar";
import NavBar from "../SideMenu/sideMenu";
import "./HotelRoomsAdmin.css";

function HotelRoomAdmin(props) {
  const url = "http://8b3eb56492b1.ngrok.io";
  const handleLogout = () => {
    removeUserSession();
    localStorage.removeItem("name");
    props.history.push("/");
  };
  const { useState } = React;

  const [columns, setColumns] = useState([
    { title: "RoomNumber", field: "id" },
    { title: "MaxCapacity", field: "maxCapacity" },
    { title: "Facilities", field: "facilities" },
    { title: "Smoking", field: "smoking" },
    { title: "PetFriendly", field: "petFriendly" },
    { title: "Rating", field: "rating", editable: "never" },
    { title: "NFCTag", field: "nfcTag" },
    { title: "Beds Number", field: "bedsNumber" },
    { title: "Cleaned", field: "cleaned", editable: "never" },
    { title: "Price", field: "price" },
  ]);

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(url + "/rooms")
      .then((resp) => {
        setData(resp.data);
      })
      .catch((error) => console.error("123", error));
  }, []);

  const addRow = (newData) => {
    axios.post(url + "/addRoom", newData).then((resp) => {
      // console.log("zzz", resp);
      setData([...data, newData]);
    });
  };

  const deleteRow = (selectedRow, index) => {
    index = selectedRow.tableData.id;
    // console.log("index", index);
    // console.log("objlog", data[index].id);
    axios
      .delete(`${url}/rooms/delete/${parseInt(data[index].id)}`)
      .then((resp) => {
        // console.log("deleteRow", resp);
        const dataDelete = [...data];
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
      });
  };

  const editRow = (newData, oldData, index) => {
    index = oldData.tableData.id;
    axios
      .put(`${url}/rooms/update/${parseInt(data[index].id)}`)
      .then((resp) => {
        console.log(resp);
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
              onRowUpdate: (newData, oldData, index) =>
                new Promise((resolve, reject) => {
                  editRow(newData, oldData, index);
                  resolve();
                }),
              onRowDelete: (oldData, index) =>
                new Promise((resolve, reject) => {
                  deleteRow(oldData, index);
                  resolve();
                }),
            }}
            options={{
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

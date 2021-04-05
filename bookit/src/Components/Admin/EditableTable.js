import React, { useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";

function Editable() {
  const { useState } = React;

  const [columns, setColumns] = useState([
    { title: "StartDate", field: "startDate" },
    { title: "EndDate", field: "endDate" },
    { title: "Status", field: "status" },
    { title: "Price", field: "price" },
    { title: "RoomNumber", field: "roomNumber" },
  ]);

  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch("http://f9c056ebad68.ngrok.io/api/reservations")
    // .then((resp) => resp.json())
    axios
      .get("http://aa710e44d313.ngrok.io/api/reservations")
      .then((resp) => {
        setData(resp.data);
      })
      .catch((error) => console.error("123", error));
  }, []);

  const addRow = (newData) => {
    axios
      .post("http://f9c056ebad68.ngrok.io/api/addReservation", newData)
      .then((resp) => {
        console.log("zzz", resp);
        setData([...data, newData]);
        //  setData(newData.data)
      });
  };

  return (
    <div className="container-fluid">
      <MaterialTable
        style={{
          position: "fixed",
          width: "80%",
          margin: "20px 20px 20px 40px",
          height: "85vh",
        }}
        title="Reservations"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              // setTimeout(() => {
              addRow(newData);

              resolve();
              // }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              // setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);

              resolve();
              // }, 1000);
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
  );
}

export default Editable;

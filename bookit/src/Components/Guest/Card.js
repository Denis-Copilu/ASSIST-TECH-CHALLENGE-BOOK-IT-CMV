import React from "react";
import axios from "axios";
import "./Card.css";
import Image_rooms from "../../Assets/Image_rooms/image1.png";
import Image_rooms1 from "../../Assets/Image_rooms/image2.png";
import Pagination from "../Pagination/Pagination";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Start App

const Main = () => {
  const [rooms, setRooms] = React.useState([]);
  const [searchedRooms, setSearchedRooms] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage] = React.useState(3);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = searchedRooms.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [filterOption, setFilterOption] = React.useState("");
  const [roomReserve, setRoomReserve] = React.useState([]);
  const [showDetailsRoom, setShowDetailsRoom] = React.useState(false);
  const [showConfirmReservation, setShowConfirmReservation] = React.useState(
    false
  );
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [error, setError] = React.useState("");
  const URL = "http://8c9e55db7a2d.ngrok.io";
  const URLRooms = URL + "/room/list";

  const handleCloseDetailsRoom = () => {
    setShowDetailsRoom(false);
  };
  const handleCloseConfirmReservation = () => {
    setShowConfirmReservation(false);
  };
  const addReservation = (idRoom) => {
    console.log(
      startDate.toISOString().substring(0, 10) +
        " " +
        endDate.toISOString().substring(0, 10) +
        " " +
        localStorage.getItem("id") +
        " rID" +
        idRoom
    );
    axios
      .post(URL + "/reservation/addReservation", {
        startDate: startDate.toISOString().substring(0, 10),
        endDate: endDate.toISOString().substring(0, 10),
        userId: localStorage.getItem("id"),
        roomNumber: idRoom,
      })
      .then((response) => {
        console.log(response);
        setError("");
        handleCloseDetailsRoom();
        setShowConfirmReservation(true);
      })
      .catch((error) => {
        // console.log("A apărut o problemă."+error);
        if (error.response.status === 400)
          setError("The room is not available in between these days.");
        else setError("Something went wrong. Please try again later.");
      });
  };
  const handleShowDetailsRoom = (room = {}) => {
    setShowDetailsRoom(true);
    console.log(room);
    setRoomReserve(room);
  };

  React.useEffect(() => {
    getRooms();
    document.getElementById("search").disabled = true;
  }, []);
  const getRooms = async () => {
    // setRooms(PostsData);
    //  setSearchedRooms(PostsData);
    const response = await axios.get(URLRooms);
    console.log(response.data);
    setRooms(response.data);
    setSearchedRooms(response.data);
  };
  const search = (e) => {
    const searchedWord = e.target.value;
    if (!searchedWord.length > 0) {
      setSearchedRooms(rooms);
      console.log(rooms);
    } else {
      console.log(filterOption);
      if (
        (filterOption == "price" ||
          filterOption == "bedsNumber" ||
          filterOption == "maxCapacity") &&
        isNaN(document.getElementById("search").value)
      ) {
        document.getElementById("search").style.color = "red";
      } else {
        document.getElementById("search").style.color = "black";
        let searched; //= searchedRooms.filter(room => room.maxCapacity.toLowerCase().includes(searchedWord.toLowerCase()));
        switch (filterOption) {
          case "price":
            searched = searchedRooms.filter((room) =>
              room.price.toString().includes(searchedWord)
            );
            break;
          case "bedsNumber":
            searched = searchedRooms.filter((room) =>
              room.bedsNumber.toString().includes(searchedWord)
            );
            break;
          case "maxCapacity":
            searched = searchedRooms.filter((room) =>
              room.maxCapacity.toString().includes(searchedWord)
            );
            break;
          case "facilities":
            searched = searchedRooms.filter((room) =>
              room.facilities.toLowerCase().includes(searchedWord.toLowerCase())
            );
            break;

          default:
            break;
        }
        setSearchedRooms(searched);
      }
    }
  };
  const replaceText = (state, textFalse, textTrue) => {
    return state === false ? textFalse : textTrue;
  };
  return (
    <div className="content-pag">
      <div>
        <div className="app-card-list" id="app-card-list">
          <div id="content-filter">
            <input
              className="form-control"
              id="search"
              type="text"
              placeholder="Search..."
              onChange={(e) => {
                search(e);
              }}
            />
            <form className="filter-option">
              <div className="element-filter">
                <label for="price">Price</label>
                <input
                  type="radio"
                  id="price"
                  value="price"
                  name="opt"
                  onClick={() => {
                    setFilterOption("price");
                    document.getElementById("search").disabled = false;
                    document.getElementById("search").value = "";
                  }}
                ></input>
              </div>
              <div className="element-filter">
                <text>Beds number</text>
                <input
                  type="radio"
                  value="b_numbers"
                  name="opt"
                  onClick={() => {
                    setFilterOption("bedsNumber");
                    document.getElementById("search").disabled = false;
                    document.getElementById("search").value = "";
                  }}
                ></input>
              </div>
              <div className="element-filter">
                <text> Max Capacity</text>
                <input
                  type="radio"
                  value="m_capacity"
                  name="opt"
                  onClick={() => {
                    setFilterOption("maxCapacity");
                    document.getElementById("search").disabled = false;
                    document.getElementById("search").value = "";
                  }}
                ></input>
              </div>
              <div className="element-filter">
                <text> Facilities</text>
                <input
                  type="radio"
                  value="facilities"
                  name="opt"
                  onClick={() => {
                    setFilterOption("facilities");
                    document.getElementById("search").disabled = false;
                    document.getElementById("search").value = "";
                  }}
                ></input>
              </div>
            </form>
          </div>
          {currentPost &&
            currentPost.map((room, key) => (
              <Card
                key={key}
                index={key}
                details={room}
                handleShowDetailsRoom={() => handleShowDetailsRoom(room)}
              />
            ))}
        </div>
      </div>
      <div className="pagination">
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={searchedRooms.length}
          paginate={paginate}
        />
      </div>
      {/* ************************* MODAL ROOM DETAILS ****************************/}
      <div>
        <Modal
          className="Modal"
          show={showDetailsRoom}
          onHide={handleCloseDetailsRoom}
          animation={false}
        >
          <Modal.Body>
            <div className="card-body-details">
              <img src={Image_rooms1} />
              <p id="error">{error}</p>
              <div className="card-header-details">
                <div className="details-room-details">
                  Room number: {roomReserve.id}
                  <br />
                  Price: {roomReserve.price}€/night
                  <br />
                  Beds number: {roomReserve.bedsNumber}
                  <br />
                  Max Capacity: {roomReserve.maxCapacity}
                  <br />
                  Facilities: {roomReserve.facilities}
                  <br />
                  Smoking:{" "}
                  {replaceText(roomReserve.smoking, "Not allowed", "Allowed")}
                  <br />
                  Pet friendly:{" "}
                  {replaceText(roomReserve.petFriendly, "No", "Yes")}
                </div>

                <div className="right-cont">
                  <div className="dtPicker">
                    <p>Check-In</p>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                        console.log(date.toISOString().substring(0, 10));
                      }}
                    />
                  </div>
                  <div className="dtPicker">
                    <p>Check-Out</p>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                    />
                  </div>
                  <div className="buttonsModal">
                    <Button
                      id="btnRezerve"
                      variant="secondary"
                      onClick={() => {
                        addReservation(roomReserve.id);
                      }}
                    >
                      RESERVE
                    </Button>
                    <Button
                      id="btnRezerve"
                      variant="secondary"
                      onClick={() => {
                        handleCloseDetailsRoom();
                        setError("");
                      }}
                    >
                      CLOSE
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        {/* ************************* MODAL CONFIRM CREATE RESERVATION ****************************/}
        <Modal
          className="Modal"
          show={showConfirmReservation}
          onHide={handleCloseConfirmReservation}
          animation={false}
        >
          <Modal.Body>
            <div>The reservation was made successfully.</div>
            <Button
              id="btnClose"
              variant="secondary"
              onClick={() => {
                handleCloseConfirmReservation();
                setError("");
              }}
            >
              Ok
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

class CardHeader extends React.Component {
  render() {
    const {
      image,
      id,
      price,
      bedsNumber,
      smoking,
      facilities,
      maxCapacity,
      petFriendly,
      rating,
      review,
    } = this.props;
    var style = {
      backgroundImage: "url(" + image + ")",
    };
    return (
      <div className="card-body">
        <div className="card-header">
          <img src={Image_rooms} />
          <div className="details-room">
            {id}
            <br />
            {price}
            <br />
            {bedsNumber}
            <br />
            {maxCapacity}
            <br />
            {facilities.substring(0, 18)}
            {facilities.length > 18 ? "..." : ""}
            <br />
            {smoking}
            <br />
            {petFriendly}
          </div>
        </div>
        <p>{review}</p>
        <Box component="fieldset" mb={1} borderColor="transparent">
          <Typography component="legend">Rating</Typography>
          <Rating name="read-only" value={rating} readOnly />
        </Box>
      </div>
    );
  }
}
const Card = (props) => {
  const replaceText = (state, textFalse, textTrue) => {
    return state === false ? textFalse : textTrue;
  };
  return (
    <div className="crd" onClick={props.handleShowDetailsRoom}>
      <CardHeader
        maxCapacity={"Max Capacity: " + props.details.maxCapacity}
        petFriendly={
          "Pet friendly: " + replaceText(props.details.petFriendly, "No", "Yes")
        }
        facilities={"Facilities: " + props.details.facilities}
        smoking={
          "Smoking: " +
          replaceText(props.details.smoking, "Not allowed", "Allowed")
        }
        bedsNumber={"Beds number: " + props.details.bedsNumber}
        price={"Price: " + props.details.price + " €/night"}
        id={"Room number: " + props.details.id}
        rating={props.details.rating}
        image={props.details.image}
      />
    </div>
  );
};
export default Main;

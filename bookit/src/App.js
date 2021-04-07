import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import { getToken, removeUserSession, setUserSession } from "./Utils/Common";
import Login from "./Components/Login/Login";
import HomeAdmin from "./Components/Admin/HomeAdmin";
import HomeCleaner from "./Components/Cleaner/HomeCleaner";
import HomeGuest from "./Components/Guest/HomeGuest";
import AboutUs from "./Components/AboutUs/AboutUs";
import ReservationAdmin from "./Components/Admin/ReservationAdmin";
import HotelRoomsAdmin from "./Components/Admin/HotelRoomsAdmin";
import ContactPage from "./Components/Contact/Contact";
import ReservationGuest from "./Components/Guest/ReservationGuest";

function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios
      .get(`http://localhost:4000/verifyToken?token=${token}`)
      .then((response) => {
        setUserSession(response.data.token, response.data.user);
        setAuthLoading(false);
      })
      .catch((error) => {
        removeUserSession();
        setAuthLoading(false);
      });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="appContent">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/homeadmin" component={HomeAdmin} />
              <Route path="/homeguest" component={HomeGuest} />
              <Route path="/homecleaner" component={HomeCleaner} />
              <Route path="/aboutus" component={AboutUs} />
              <Route path="/reservationadmin" component={ReservationAdmin} />
              <Route path="/hotelroomsadmin" component={HotelRoomsAdmin} />
              <Route path="/contactpage" component={ContactPage} />
              <Route path="/reservationguest" component={ReservationGuest} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

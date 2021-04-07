import React, { useState, Button } from "react";
import axios from "axios";
import { setUserSession } from "../../Utils/Common";
import { Redirect } from "react-router-dom";
import "./Login.css";
import LoginIcon from "../../Assets/login_icon.png";
function Login(props) {
  const username = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState(null);
  const name = localStorage.getItem("name") == "name";
  // handle button click of login form
  const handleLogin = () => {
    setError(null);

    axios
      //.post("http://localhost:4000/users/signin", {
      .post("http://5cdc18449ea8.ngrok.io/authenticate", {
        email: username.value, //username: username.value,
        password: password.value,
      })
      .then((response) => {
        // console.log(response.data.user);
        //console.log(response.data.user);
        setUserSession(response.data.token, response.data.user);
        if (response.data.user.roleId == 1) {
          localStorage.setItem("name", response.data.user.name);
          props.history.push("/homeadmin");
        }
        if (response.data.user.roleId == 2) {
          localStorage.setItem("name", response.data.user.name);
          props.history.push("/homeguest");
        }

        if (response.data.user.roleId == 3) {
          localStorage.setItem("name", response.data.user.name);
          props.history.push("/homecleaner");
        }
      })
      .catch((error) => {
        if (error.response.status === 400)
        setError("Username or Password is Wrong.");  
        //setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  };

  return (
    <div className="content-page">
      {name && <Redirect to="/homeadmin" />}
      <div className="backgroundImg">
        <img alt="img" id="img" src={LoginIcon} />
      </div>
      <div className="loginForm">
        <form className="controlsLogin">
          <h1 id="wlc">Welcome</h1>

          <div className="form-group">
            <input
              type="email"
              className="form-control1"
              placeholder="Email"
              {...username}
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control1"
              placeholder="Password"
              {...password}
              autoComplete="new-password"
            />
          </div>
          {error && (
            <>
              <small style={{ color: "red" }}>{error}</small>
              <br />
            </>
          )}
          <br />

          <button
            type="button"
            className="btn btn-dark btn-lg btn-block"
            onClick={handleLogin}
            id="loginButton"
          >
            LOGIN
          </button>
          <p className="forgot-password text-right">
            Don’t have an account?{" "}
            <a href="/" class="SignUp">
              {" "}
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Login;

import React, { useState, useEffect } from "react";

import axios from "axios";
import Validate from "./LoginValidator";
import "../../forms/registration/SeniorHighRegForm.css";
import Auth from "../../Auth";

function Login() {
  const REST_API_PROD_URL = "https://shares-system.com/SharesApi/";
  const REST_API_DEV_URL = "http://localhost:9191/";

  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [serverSideError, setServerSideError] = useState("");
  const [isLoginBtnClicked, setIsLoginBtnClicked] = useState(false);
  const [errors, setErrors] = useState({});
  const [jwt, setJwt] = useState([]);

  const handleOnClickSubmit = (e) => {
    e.preventDefault();
    setErrors(Validate(userName, userPassword));
    setIsLoginBtnClicked(true);
  };

  useEffect(() => {
    if (Auth.isAuthenticated()) {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isLoginBtnClicked) {
      axios
        .get(
          `${
            process.env.NODE_ENV === "production"
              ? REST_API_PROD_URL
              : REST_API_DEV_URL
          }userJsonWebToken?user=${userName}&password=${userPassword}`
        )
        .then((response) => {
          setJwt(response.data);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  useEffect(() => {
    if (jwt.includes("Bearer")) {
      Auth.saveLocalAuth({
        userName: userName,
        authenticated: true,
        headerConf: {
          headers: {
            Authorization: jwt,
          },
        },
      });

      window.location.href = "/";
    } else {
      setServerSideError(jwt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt]);

  return (
    <div className="form-container info">
      <div className="form-content">
        <form className="form">
          <h3 className="login">
            For teachers and administrators only! All students are only required
            to fill out the registration and enrollment forms.
          </h3>
          <div className="form-inputs login">
            <label htmlFor="username" className="form-label">
              Username
            </label>{" "}
            {errors.userName && (
              <label className="form-label error">{`(${errors.userName})`}</label>
            )}
            {<label className="form-label error">{`${serverSideError}`}</label>}
            <input
              id="username"
              type="text"
              name="username"
              className="form-input"
              placeholder="Please enter username"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div className="form-inputs login">
            <label htmlFor="password" className="form-label">
              Password
            </label>{" "}
            {errors.userPassword && (
              <label className="form-label error">{`(${errors.userPassword})`}</label>
            )}
            {<label className="form-label error">{`${serverSideError}`}</label>}
            <input
              id="password"
              type="password"
              name="password"
              className="form-input"
              placeholder="Please enter password"
              value={userPassword}
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
            />
          </div>
          <button
            className="form-input-btn login"
            type="submit"
            onClick={handleOnClickSubmit}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

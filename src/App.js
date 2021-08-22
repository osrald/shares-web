import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import MainForm from "./forms/MainForm";
import Auth from "./Auth";
import axios from "axios";

import "./App.css";

function App() {
  const REST_API_PROD_URL = "https://shares-system.com/SharesApi/";
  const REST_API_DEV_URL = "http://localhost:9191/";

  const [jwt, setJwt] = useState("");

  useEffect(() => {
    if (Auth.getUserName() === "" && !Auth.isAuthenticated()) {
      axios
        .get(
          `${
            process.env.NODE_ENV === "production"
              ? REST_API_PROD_URL
              : REST_API_DEV_URL
          }userJsonWebToken?user=anonymous&password=12345678`
        )
        .then((response) => {
          setJwt(response.data);
        })
        .catch((err) => {
          console.log("Exception Below:");
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (
      Auth.getUserName() === "" &&
      !Auth.isAuthenticated() &&
      jwt.includes("Bearer")
    ) {
      Auth.saveLocalAuth({
        userName: "anonymous",
        authenticated: false,
        headerConf: {
          headers: {
            Authorization: jwt,
          },
        },
      });
    }
  }, [jwt]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <MainForm />
      </Router>
    </div>
  );
}

export default App;

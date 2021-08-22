import React, { useEffect } from "react";
import Auth from "../../Auth";

function Logout() {
  useEffect(() => {
    if (Auth.isAuthenticated()) {
      Auth.saveLocalAuth({
        userName: "",
        authenticated: false,
        headerConf: {
          headers: {
            Authorization: "",
          },
        },
      });
    }
    window.location.href = "/login";
  }, []);

  return <div></div>;
}

export default Logout;

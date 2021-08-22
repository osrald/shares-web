import axios from "axios";

class Auth {
  static userName = "";
  static authenticated = false;
  static headerConf = {
    headers: {
      Authorization: "",
    },
  };

  saveLocalAuth(auth) {
    localStorage.setItem("auth", JSON.stringify(auth));
  }

  getLocalAuth() {
    const REST_API_PROD_URL = "https://shares-system.com/SharesApi/";
    const REST_API_DEV_URL = "http://localhost:9191/";

    if (localStorage.getItem("auth") === null) {
      this.authenticated = false;
      this.userName = "anonymous";
      axios
        .get(
          `${
            process.env.NODE_ENV === "production"
              ? REST_API_PROD_URL
              : REST_API_DEV_URL
          }userJsonWebToken?user=anonymous&password=12345678`
        )
        .then((response) => {
          this.headerConf = {
            headers: {
              Authorization: response.data,
            },
          };
          this.saveLocalAuth({
            userName: "anonymous",
            authenticated: false,
            headerConf: this.headerConf,
          });
        });
    } else {
      let localAuth = JSON.parse(localStorage.getItem("auth"));
      this.authenticated = localAuth.authenticated;
      this.userName = localAuth.userName;
      this.headerConf = localAuth.headerConf;
    }
  }

  isAuthenticated() {
    this.getLocalAuth();
    return this.authenticated;
  }

  getUserName() {
    this.getLocalAuth();
    return this.userName;
  }

  getHeaderConf() {
    this.getLocalAuth();
    return this.headerConf;
  }
}

export default new Auth();

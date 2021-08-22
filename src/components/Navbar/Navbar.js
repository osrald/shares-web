import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavbarButton } from "./NavbarButton";
import { MenuItems } from "./MenuItems";
import "./Navbar.css";
import Auth from "../../Auth";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    let isAuthenticated = Auth.isAuthenticated();
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">
          SHARES <i className="fas fa-graduation-cap"></i>
        </h1>
        <div className="menu-icon" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {MenuItems.filter(
            (map) => map.auth === isAuthenticated || map.auth === false
          ).map((item, index) => {
            return (
              <Link
                key={index}
                to={
                  item.title === "Login" && isAuthenticated
                    ? "/logout"
                    : item.url
                }
                className="text-link"
              >
                <li key={index} className={item.cName}>
                  {item.title === "Login" && isAuthenticated
                    ? "Logout"
                    : item.title}
                </li>
              </Link>
            );
          })}
        </ul>
        <NavbarButton>{isAuthenticated ? "Logout" : "Login"}</NavbarButton>
      </nav>
    );
  }
}

export default Navbar;

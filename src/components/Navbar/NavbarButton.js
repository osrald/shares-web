import React from "react";
import Auth from "../../Auth";
import "./NavbarButton.css";

const STYLES = ["btn--primary", "btn--outline"];

const SIZES = ["btn--medium", "btn--large"];

export const NavbarButton = ({ children, type, buttonStyle, buttonSize }) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  const onClick = (e) => {
    e.preventDefault();
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
  };

  return (
    <button
      id="NavbarButtonID"
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

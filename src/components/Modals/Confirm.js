import React from "react";

const Confirm = (props) => {
  const onHandleClickOkButton = (e) => {
    e.preventDefault();
    props.setDisplayConfirmation(false);
    props.setUserConfirmed(true);
  };

  const onHandleClickCancel = (e) => {
    e.preventDefault();
    props.setDisplayConfirmation(false);
  };

  const closeXbuttonHandler = () => {
    props.setDisplayConfirmation(false);
  };
  return (
    <div
      id="simpleModal"
      className={props.displayConfirmation ? "modal" : "hidden"}
    >
      <div className="modal-content">
        <div className="modal-header">
          <span onClick={closeXbuttonHandler} className="closeBtn">
            &times;
          </span>
          <h2>{props.header}</h2>
        </div>
        <div className="modal-body">
          <p>{props.message}</p>
          <div className="text-align-center">
            <button
              className="modal-body-ok-button"
              onClick={onHandleClickOkButton}
            >
              Ok
            </button>
            <button className="cancel-button" onClick={onHandleClickCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;

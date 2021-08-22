import React from "react";

const OtherSchoolDetails = (props) => {
  const onHandleClickOkButton = (e) => {
    e.preventDefault();
    props.setDisplayOtherSchoolDetails(false);
  };

  const onHandleClickCancel = (e) => {
    e.preventDefault();
    props.setDisplayOtherSchoolDetails(false);

    if (!props.readOnly) {
      props.setStudentEntity({
        ...props.studentEntity,
        [props.schoolChoiceOthersNmField]: "",
        [props.schoolChoiceOthersAddrField]: "",
      });
    }
  };

  const closeXbuttonHandler = () => {
    props.setDisplayOtherSchoolDetails(false);
  };

  const handleOnchangeSchoolChoiceOthersNm = (e) => {
    props.setStudentEntity({
      ...props.studentEntity,
      [props.schoolChoiceOthersNmField]: e.target.value,
    });
  };

  const handleOnchangeSchoolChoiceOthersAddr = (e) => {
    props.setStudentEntity({
      ...props.studentEntity,
      [props.schoolChoiceOthersAddrField]: e.target.value,
    });
  };

  let schChcOthNm, schChcOthAddr;
  if (!props.schoolChoiceOthersNm) {
    schChcOthNm = "";
  } else {
    schChcOthNm = props.schoolChoiceOthersNm;
  }
  if (!props.schoolChoiceOthersAddr) {
    schChcOthAddr = "";
  } else {
    schChcOthAddr = props.schoolChoiceOthersAddr;
  }

  return (
    <div
      id="simpleModal"
      className={props.displayOtherSchoolDetails ? "modal" : "hidden"}
    >
      <div className="modal-content">
        <div className="modal-header">
          <span onClick={closeXbuttonHandler} className="closeBtn">
            &times;
          </span>
          <h2>{`${
            props.displayIsFirstChoice === "true" ? "First" : "Second"
          } Choice School`}</h2>
        </div>
        <div className="modal-body">
          <label htmlFor="mdlOthersSchoolname" className="modal-label-input">
            School Name
          </label>
          <input
            type="text"
            name="mdlOthersSchoolname"
            className="modal-input"
            value={schChcOthNm}
            readOnly={props.readOnly}
            placeholder={`Enter your ${
              props.displayIsFirstChoice ? "first" : "second"
            } choice school name`}
            onChange={handleOnchangeSchoolChoiceOthersNm}
          />
          <label htmlFor="mdlOthersSchoolAddress" className="modal-label-input">
            School Address
          </label>
          <input
            type="text"
            name="mdlOthersSchoolAddress"
            value={schChcOthAddr}
            readOnly={props.readOnly}
            className="modal-input"
            placeholder={`Enter your ${
              props.displayIsFirstChoice === "true" ? "first" : "second"
            } choice school address`}
            onChange={handleOnchangeSchoolChoiceOthersAddr}
          />
          <div>
            <button className="mdlButton" onClick={onHandleClickOkButton}>
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

export default OtherSchoolDetails;

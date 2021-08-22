import React, { useState } from "react";
import GradeSectionForModal from "../Dropdowns/GradeSectionForModal";

function GradeLevelSectionModal(props) {
  const [errors, setErrors] = useState({});
  const [gradeLevelToMove, setGradeLevelToMove] = useState({
    id: 0,
    code: "",
    name: "",
    desc: "",
    entDate: null,
    modDate: null,
  });

  const closeXbuttonHandler = () => {
    props.setDisplayGradeSectionModal(false);
  };

  const onHandleClickOkButton = (e) => {
    e.preventDefault();

    let violations = {};
    if (gradeLevelToMove === null || gradeLevelToMove.code === "") {
      violations.gradeSection = "Grade/Section is required.";
      setErrors(violations);
    } else if (
      props.sectionToMove === null ||
      props.sectionToMove.code === ""
    ) {
      violations.gradeSection = "Grade/Section is required.";
      setErrors(violations);
    } else {
      violations = {};
      setErrors(violations);
      props.setDisplayGradeSectionModal(false);
      props.setDisplayConfirmation(true);
    }
  };

  const onHandleClickCancel = (e) => {
    e.preventDefault();
    props.setDisplayGradeSectionModal(false);
  };

  return (
    <div
      id="simpleModal"
      className={props.displayGradeSectionModal ? "modal" : "hidden"}
    >
      <div className="modal-content">
        <div className="modal-header">
          <span onClick={closeXbuttonHandler} className="closeBtn">
            &times;
          </span>
          <h2>Grade and Section</h2>
        </div>
        <div className="modal-body">
          <label className="modal-label-input">
            Please select grade level and section to move the selected
            student(s)
          </label>
          <GradeSectionForModal
            gradeLevelToMove={gradeLevelToMove}
            setGradeLevelToMove={setGradeLevelToMove}
            sectionToMove={props.sectionToMove}
            setSectionToMove={props.setSectionToMove}
            errorDisplay={errors.gradeSection}
          />
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
}

export default GradeLevelSectionModal;

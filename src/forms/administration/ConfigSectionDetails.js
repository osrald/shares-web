import React, { useState, useEffect } from "react";
import ClassAdviser from "../../components/Dropdowns/ClassAdviser";
import GradeLevelsDropdown from "../../components/Dropdowns/GradeLevelsDropdown";
import InputBoxWithLabel from "../../components/InputBoxes/InputBoxWithLabel";
import SectionEntity from "../../components/LocalData/SectionEntity";
import Confirm from "../../components/Modals/Confirm";
import EnrollmentService from "../../services/EnrollmentService";
import Validate from "./ConfigSectionDetailsValidator";

function ConfigSectionDetails({ props }) {
  const [sectionEntity, setSectionEntity] = useState(SectionEntity.intialize());
  const [errors, setErrors] = useState({});
  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const [userConfirmed, setUserConfirmed] = useState(false);
  const [isAddUpdateClicked, setIsAddUpdateClicked] = useState(false);

  const handleOnClickAddUpdate = (e) => {
    e.preventDefault();
    setErrors(Validate(sectionEntity));
    setIsAddUpdateClicked(true);
  };

  const handleOnClickCancel = (e) => {
    e.preventDefault();
    props.history.push("/configSection");
  };

  useEffect(() => {
    if (props.match.params.id < 0) {
      setSectionEntity(SectionEntity.intialize());
    } else {
      EnrollmentService.getSectionById(props.match.params.id).then(
        (response) => {
          if (response.data != null) {
            setSectionEntity(response.data);
          }
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      Object.keys(errors).length === 0 &&
      isAddUpdateClicked &&
      !userConfirmed
    ) {
      setDisplayConfirmation(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  useEffect(() => {
    if (
      userConfirmed &&
      isAddUpdateClicked &&
      Object.keys(errors).length === 0
    ) {
      if (props.match.params.id < 0) {
        EnrollmentService.addNewSection(sectionEntity).then((response) => {
          props.history.push("/configSection");
        });
      } else {
        EnrollmentService.updateSection(sectionEntity).then((response) => {
          props.history.push("/configSection");
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userConfirmed]);

  return (
    <div className="form-container info">
      <div className="form-content">
        <Confirm
          header={
            props.match.params.id < 0
              ? "For adding new section"
              : "For section detail update"
          }
          message={`${
            props.match.params.id < 0
              ? "This will add new record"
              : "These will update the record details"
          }, please confirm.`}
          displayConfirmation={displayConfirmation}
          setDisplayConfirmation={setDisplayConfirmation}
          setUserConfirmed={setUserConfirmed}
        />
        <form className="form">
          <h2>{`Section Details (Mode: ${
            props.match.params.id < 0 ? "Add" : "Edit"
          })`}</h2>
          <div className="form-inputs">
            <InputBoxWithLabel
              inputId="name"
              nameLabel="name"
              labelDisplay="Section name"
              inputPlaceHolder="Enter section name"
              textValue={sectionEntity.name}
              dataEntity={sectionEntity}
              setDataEntity={setSectionEntity}
              errorDisplay={errors.name && errors.name}
            />
          </div>
          <div className="form-inputs">
            <InputBoxWithLabel
              inputId="desc"
              nameLabel="desc"
              labelDisplay="Section Desc"
              inputPlaceHolder="Enter section desc"
              textValue={sectionEntity.desc}
              dataEntity={sectionEntity}
              setDataEntity={setSectionEntity}
              errorDisplay={errors.desc && errors.desc}
            />
          </div>
          <div className="form-inputs">
            <GradeLevelsDropdown
              name="gradeLevel"
              className="form-dropdown"
              gradeLevelField="gradeLevel"
              selectedGradeLevelValue={sectionEntity.gradeLevel.id}
              sectionEntity={sectionEntity}
              setSectionEntity={setSectionEntity}
              errorDisplay={errors.gradeLevel && errors.gradeLevel}
            />
          </div>
          <div className="form-inputs">
            <ClassAdviser
              name="adviser"
              className="form-dropdown"
              classAdviserField="adviser"
              sectionEntity={sectionEntity}
              setSectionEntity={setSectionEntity}
              errorDisplay={errors.adviser && errors.adviser}
            />
          </div>
          <div className="form-inputs">
            <InputBoxWithLabel
              inputId="sectionLimit"
              nameLabel="sectionLimit"
              type="number"
              labelDisplay="Section Limit"
              inputPlaceHolder="Enter section or class limit"
              textValue={sectionEntity.sectionLimit}
              dataEntity={sectionEntity}
              setDataEntity={setSectionEntity}
              errorDisplay={errors.sectionLimit && errors.sectionLimit}
            />
          </div>
          <div className="form-inputs">
            <button
              className="userdets-btn-add-update"
              onClick={handleOnClickAddUpdate}
            >
              <i className="fas fa-save">
                {" "}
                {props.match.params.id < 0 ? "Add New" : "Update"}
              </i>
            </button>
            {"  "}
            <button
              className="userdets-btn-cancel"
              onClick={handleOnClickCancel}
            >
              <i className="fas fa-ban"> Cancel</i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConfigSectionDetails;

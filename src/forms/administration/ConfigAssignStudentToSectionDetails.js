import React, { useState, useEffect } from "react";
import GradeSection from "../../components/Dropdowns/GradeSection";
import TextBoxWithLabel from "../../components/InputBoxes/TextBoxWithLabel";
import StudentEntity from "../../components/LocalData/StudentEntity";
import Confirm from "../../components/Modals/Confirm";
import StudentService from "../../services/StudentService";
import Validate from "./ConfigAssignStudentToSectionDetailsValidator";

import "./ConfigAssignStudentToSectionDetails.css";

function ConfigAssignStudentToSectionDetails({ props }) {
  const [studentEntity, setStudentEntity] = useState(
    StudentEntity.initializeExtended()
  );
  const [errors, setErrors] = useState({});
  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const [userConfirmed, setUserConfirmed] = useState(false);

  useEffect(() => {
    StudentService.getStudentById(props.match.params.id).then((response) => {
      if (response.data !== "") {
        setStudentEntity(response.data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSaveClicked && !userConfirmed) {
      setDisplayConfirmation(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  useEffect(() => {
    if (userConfirmed && isSaveClicked && Object.keys(errors).length === 0) {
      StudentService.assignStudentToSection(studentEntity).then((response) => {
        props.history.push("/configAssignStudentsToSections");
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userConfirmed]);

  const handleOnClickSave = (e) => {
    e.preventDefault();
    setErrors(Validate(studentEntity));
    setIsSaveClicked(true);
  };

  const handleOnClickCancel = (e) => {
    e.preventDefault();
    props.history.push("/configAssignStudentsToSections");
  };

  return (
    <div className="form-container assign-student-section-details">
      <div className="form-content">
        <Confirm
          header="Assign section"
          message={"This will assign student to the selected section"}
          displayConfirmation={displayConfirmation}
          setDisplayConfirmation={setDisplayConfirmation}
          setUserConfirmed={setUserConfirmed}
        />
        <form className="form">
          <h2>Assign Student to Grade & Section</h2>
          <h1>1. Student Information</h1>
          <div className="form-inputs">
            <TextBoxWithLabel
              inputId="lrnNo"
              nameLabel="lrnNo"
              labelDisplay="Learner's Reference Number"
              textValue={studentEntity.lrnNo}
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              readOnly={true}
            />
          </div>
          <div className="form-inputs">
            <TextBoxWithLabel
              inputId="lastname"
              nameLabel="lastname"
              labelDisplay="Lastname"
              textValue={studentEntity.lastname}
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              readOnly={true}
            />
          </div>
          <div className="form-inputs">
            <TextBoxWithLabel
              inputId="firstname"
              nameLabel="firstname"
              labelDisplay="Firstname"
              textValue={studentEntity.firstname}
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              readOnly={true}
            />
          </div>
          <div className="form-inputs">
            <TextBoxWithLabel
              inputId="middlename"
              nameLabel="middlename"
              labelDisplay="Middlename"
              textValue={studentEntity.middlename}
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              readOnly={true}
            />
          </div>
          <div className="form-inputs">
            <TextBoxWithLabel
              inputId="gender"
              nameLabel="gender"
              labelDisplay="Gender"
              textValue={studentEntity.gender === "M" ? "Male" : "Female"}
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              readOnly={true}
            />
          </div>
          <div className="form-inputs">
            <TextBoxWithLabel
              inputId="dob"
              nameLabel="dob"
              labelDisplay="Date of Birth"
              textValue={studentEntity.dob}
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              readOnly={true}
            />
          </div>
          <div className="form-inputs">
            <TextBoxWithLabel
              inputId="addrMakatiResident"
              nameLabel="addrMakatiResident"
              labelDisplay="Makati Resident"
              textValue={
                studentEntity.addrMakatiResident === "Y" ? "Yes" : "No"
              }
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              readOnly={true}
            />
          </div>
          <div className="form-inputs">
            <TextBoxWithLabel
              inputId="addrHouseNo"
              nameLabel="addrHouseNo"
              labelDisplay="House No."
              textValue={studentEntity.addrHouseNo}
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              readOnly={true}
            />
          </div>
          <div className="form-inputs">
            <TextBoxWithLabel
              inputId="addrStreet"
              nameLabel="addrStreet"
              labelDisplay="Street"
              textValue={studentEntity.addrStreet}
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              readOnly={true}
            />
          </div>
          <div
            className={`form-inputs ${
              studentEntity.addrMakatiResident !== "Y" && "hidden"
            }`}
          >
            <TextBoxWithLabel
              inputId="makatibarangay"
              nameLabel="addrStreet"
              labelDisplay="Barangay"
              textValue={
                studentEntity.addrMakatiResidentBarangay &&
                studentEntity.addrMakatiResidentBarangay.name
              }
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              readOnly={true}
            />
          </div>
          <div
            className={`form-inputs ${
              studentEntity.addrMakatiResident === "Y" && "hidden"
            }`}
          >
            <TextBoxWithLabel
              inputId="addrBarangay"
              nameLabel="addrBarangay"
              labelDisplay="Barangay"
              textValue={studentEntity.addrBarangay}
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              readOnly={true}
            />
          </div>
          <div className="form-inputs">
            <TextBoxWithLabel
              inputId="addrCityMunicipality"
              nameLabel="addrCityMunicipality"
              labelDisplay="City/Municipality"
              textValue={studentEntity.addrCityMunicipality}
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              readOnly={true}
            />
          </div>
          <h1>2. Grade and Section</h1>
          <div className="form-inputs">
            <GradeSection
              selectedSection={studentEntity.section && studentEntity.section}
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              errorDisplay={errors.gradeSection && errors.gradeSection}
            />
          </div>
          <div className="form-inputs">
            <button
              className="userdets-btn-add-update"
              onClick={handleOnClickSave}
            >
              <i className="fas fa-save"> Save</i>
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

export default ConfigAssignStudentToSectionDetails;

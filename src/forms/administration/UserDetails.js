import React, { useState, useEffect } from "react";
import AccessLevel from "../../components/Dropdowns/AccessLevel";
import Designation from "../../components/Dropdowns/Designation";
import InputBoxWithLabel from "../../components/InputBoxes/InputBoxWithLabel";
import SystemUserEntity from "../../components/LocalData/SystemUserEntity";
import UserService from "../../services/UserService";
import Validate from "./UserDetailsValidator";

import "./UserDetails.css";
import Confirm from "../../components/Modals/Confirm";

function UserDetails({ props }) {
  const [userEntity, setUserEntity] = useState(SystemUserEntity.intialize());
  const [errors, setErrors] = useState({});
  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const [userConfirmed, setUserConfirmed] = useState(false);
  const [isAddUpdateClicked, setIsAddUpdateClicked] = useState(false);

  const handleOnClickAddUpdate = (e) => {
    e.preventDefault();
    setErrors(Validate(userEntity));
    setIsAddUpdateClicked(true);
  };

  const handleOnClickCancel = (e) => {
    e.preventDefault();
    props.history.push("/users");
  };

  useEffect(() => {
    if (props.match.params.id < 0) {
      setUserEntity(SystemUserEntity.intialize());
    } else {
      UserService.getUserById(props.match.params.id).then((response) => {
        if (response.data != null) {
          setUserEntity(response.data);
        }
      });
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
        UserService.addNewSystemUser(userEntity).then((response) => {
          props.history.push("/users");
        });
      } else {
        UserService.updateSystemUser(userEntity).then((response) => {
          props.history.push("/users");
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
              ? "For adding new system user"
              : "For user detail update"
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
          <h2>{`System User Details (Mode: ${
            props.match.params.id < 0 ? "Add" : "Edit"
          })`}</h2>
          <div className="form-inputs">
            <InputBoxWithLabel
              inputId="userName"
              nameLabel="userName"
              labelDisplay="Username"
              inputPlaceHolder="Enter Username"
              textValue={userEntity.userName}
              dataEntity={userEntity}
              setDataEntity={setUserEntity}
              errorDisplay={errors.userName && errors.userName}
            />
          </div>
          <div className="form-inputs">
            <InputBoxWithLabel
              inputId="password"
              nameLabel="password"
              labelDisplay="Password"
              type="password"
              inputPlaceHolder="Enter Password"
              textValue={userEntity.password}
              dataEntity={userEntity}
              setDataEntity={setUserEntity}
              errorDisplay={errors.password && errors.password}
            />
          </div>
          <div className="form-inputs">
            <InputBoxWithLabel
              inputId="fullName"
              nameLabel="fullName"
              labelDisplay="Fullname"
              inputPlaceHolder="Enter Fullname"
              textValue={userEntity.fullName}
              dataEntity={userEntity}
              setDataEntity={setUserEntity}
              errorDisplay={errors.fullName && errors.fullName}
            />
          </div>
          <div className="form-inputs">
            <Designation
              name="designation"
              className="form-dropdown"
              designationField="designation"
              selectedDesignationValue={userEntity.designation.code}
              userEntity={userEntity}
              setUserEntity={setUserEntity}
              errorDisplay={errors.designation && errors.designation}
            />
          </div>
          <div className="form-inputs">
            <AccessLevel
              name="accessLevel"
              className="form-dropdown"
              accessLevelField="accessLevel"
              selectedAccessLevelValue={userEntity.accessLevel}
              userEntity={userEntity}
              setUserEntity={setUserEntity}
              errorDisplay={errors.accessLevel && errors.accessLevel}
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

export default UserDetails;

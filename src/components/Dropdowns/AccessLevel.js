import React from "react";
import { AccessLevels } from "../LocalData/AccessLevels";

const AccessLevel = (props) => {
  const handleAccessLevel = (e) => {
    props.setUserEntity({
      ...props.userEntity,
      [props.accessLevelField]: e.target.value,
    });
  };

  return (
    <>
      <label className="form-label">Access Level</label>{" "}
      {props.errorDisplay && (
        <label className="form-label error">{`(${props.errorDisplay})`}</label>
      )}
      <br />
      <select
        name={props.name}
        className={props.className}
        value={props.selectedAccessLevelValue}
        disabled={props.disabled}
        onChange={handleAccessLevel}
      >
        <option key="000" value="">
          {"Please select ..."}
        </option>
        {AccessLevels.map((accessLevel) => (
          <option key={accessLevel.cfMinor} value={accessLevel.cfName}>
            {accessLevel.cfName}
          </option>
        ))}
      </select>
    </>
  );
};

export default AccessLevel;

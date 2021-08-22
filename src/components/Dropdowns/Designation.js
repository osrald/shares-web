import React from "react";
import DesignationEntity from "../LocalData/DesignationEntity";
import { CfgDesignations } from "../LocalData/CfgDesignations";

const Designation = (props) => {
  const handleDesignation = (e) => {
    props.setUserEntity({
      ...props.userEntity,
      designation:
        e.target.value === ""
          ? DesignationEntity.intialize()
          : CfgDesignations.find(
              (designation) => designation.code === e.target.value
            ),
    });
  };

  return (
    <>
      <label className="form-label">Designation</label>{" "}
      {props.errorDisplay && (
        <label className="form-label error">{`(${props.errorDisplay})`}</label>
      )}
      <br />
      <select
        name={props.name}
        className={props.className}
        value={props.selectedDesignationValue}
        disabled={props.disabled}
        onChange={handleDesignation}
      >
        <option key={0} value="">
          {"Please select ..."}
        </option>
        {CfgDesignations.map((cfgDesignation) => (
          <option key={cfgDesignation.id} value={cfgDesignation.code}>
            {cfgDesignation.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default Designation;

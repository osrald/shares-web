import React from "react";

const MakatiResident = (props) => {
  const makatiResidentHandler = (e) => {
    props.setStudentEntity({
      ...props.studentEntity,
      addrMakatiResident: `${
        e.target.value === "No" || e.target.value === "" ? "N" : "Y"
      }`,
      addrCityMunicipality: `${
        e.target.value === "No" || e.target.value === "" ? "" : "Makati City"
      }`,
    });
  };

  return (
    <div className="form-inputs">
      <label htmlFor="makatiResident" className="form-label">
        Are you a resident of Makati?
      </label>{" "}
      {props.errorDisplay && (
        <label className="form-label error">{`(${props.errorDisplay})`}</label>
      )}
      <br />
      <input
        type="radio"
        value="Yes"
        name="isMakatiResident"
        id="yes"
        checked={props.studentEntity.addrMakatiResident === "Y"}
        onChange={makatiResidentHandler}
      />{" "}
      <label htmlFor="yes" className="form-label-radio">
        Yes
      </label>{" "}
      <input
        type="radio"
        value="No"
        name="isMakatiResident"
        id="no"
        checked={props.studentEntity.addrMakatiResident === "N"}
        onChange={makatiResidentHandler}
      />{" "}
      <label htmlFor="no" className="form-label-radio">
        No
      </label>
    </div>
  );
};

export default MakatiResident;

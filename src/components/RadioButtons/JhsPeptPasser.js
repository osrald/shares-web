import React from "react";

const JhsPeptPasser = (props) => {
  const jhsPeptHandler = (e) => {
    props.setStudentEntity({
      ...props.studentEntity,
      jhsPeptPasser: e.target.value,
    });
  };

  return (
    <>
      <label className="form-label">
        PEPT for junior high school level passer?
      </label>{" "}
      {props.errorDisplay && (
        <label className="form-label error">{`(${props.errorDisplay})`}</label>
      )}
      <br />
      <input
        type="radio"
        value="Y"
        name="PEPTJhs"
        id="PEPTJhsYes"
        checked={props.studentEntity.jhsPeptPasser === "Y"}
        disabled={
          props.disabled && !(props.studentEntity.jhsPeptPasser === "Y")
        }
        onChange={jhsPeptHandler}
      />{" "}
      <label htmlFor="PEPTJhsYes" className="form-label-radio">
        Yes
      </label>{" "}
      <input
        type="radio"
        value="N"
        name="PEPTJhs"
        id="PEPTJhsNo"
        checked={props.studentEntity.jhsPeptPasser === "N"}
        disabled={
          props.disabled && !(props.studentEntity.jhsPeptPasser === "N")
        }
        onChange={jhsPeptHandler}
      />{" "}
      <label htmlFor="PEPTJhsNo" className="form-label-radio">
        No
      </label>
    </>
  );
};

export default JhsPeptPasser;

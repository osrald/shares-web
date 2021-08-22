import React from "react";

const JhsAePasser = (props) => {
  const jhsAeHandler = (e) => {
    props.setStudentEntity({
      ...props.studentEntity,
      jhsAePasser: e.target.value,
    });
  };

  return (
    <>
      <label className="form-label">
        A & E test for junior high school level passer?
      </label>{" "}
      {props.errorDisplay && (
        <label className="form-label error">{`(${props.errorDisplay})`}</label>
      )}
      <br />
      <input
        type="radio"
        value="Y"
        name="AEJhs"
        id="AEJhsYes"
        checked={props.studentEntity.jhsAePasser === "Y"}
        disabled={props.disabled && !(props.studentEntity.jhsAePasser === "Y")}
        onChange={jhsAeHandler}
      />{" "}
      <label htmlFor="AEJhsYes" className="form-label-radio">
        Yes
      </label>{" "}
      <input
        type="radio"
        value="N"
        name="AEJhs"
        id="AEJhsNo"
        checked={props.studentEntity.jhsAePasser === "N"}
        disabled={props.disabled && !(props.studentEntity.jhsAePasser === "N")}
        onChange={jhsAeHandler}
      />{" "}
      <label htmlFor="AEJhsNo" className="form-label-radio">
        No
      </label>
    </>
  );
};

export default JhsAePasser;

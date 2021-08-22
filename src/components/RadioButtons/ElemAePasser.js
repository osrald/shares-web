import React from "react";

const ElemAePasser = (props) => {
  const elemAeHandler = (e) => {
    props.setStudentEntity({
      ...props.studentEntity,
      elemAePasser: e.target.value,
    });
  };

  return (
    <>
      <label className="form-label">
        A & E test for elementary level passer?
      </label>{" "}
      {props.errorDisplay && (
        <label className="form-label error">{`(${props.errorDisplay})`}</label>
      )}
      <br />
      <input
        type="radio"
        value="Y"
        name="AEElem"
        id="AEElemYes"
        checked={props.studentEntity.elemAePasser === "Y"}
        disabled={props.disabled && !(props.studentEntity.elemAePasser === "Y")}
        onChange={elemAeHandler}
      />{" "}
      <label htmlFor="AEElemYes" className="form-label-radio">
        Yes
      </label>{" "}
      <input
        type="radio"
        value="N"
        name="AEElem"
        id="AEElemNo"
        checked={props.studentEntity.elemAePasser === "N"}
        disabled={props.disabled && !(props.studentEntity.elemAePasser === "N")}
        onChange={elemAeHandler}
      />{" "}
      <label htmlFor="AEElemNo" className="form-label-radio">
        No
      </label>
    </>
  );
};

export default ElemAePasser;

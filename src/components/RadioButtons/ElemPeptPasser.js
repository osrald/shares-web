import React from "react";

const ElemPeptPasser = (props) => {
  const elemPeptHandler = (e) => {
    props.setStudentEntity({
      ...props.studentEntity,
      elemPeptPasser: e.target.value,
    });
  };

  return (
    <>
      <label className="form-label">PEPT for elementary level passer?</label>{" "}
      {props.errorDisplay && (
        <label className="form-label error">{`(${props.errorDisplay})`}</label>
      )}
      <br />
      <input
        type="radio"
        value="Y"
        name="PEPTElem"
        id="PEPTElemYes"
        checked={props.studentEntity.elemPeptPasser === "Y"}
        disabled={
          props.disabled && !(props.studentEntity.elemPeptPasser === "Y")
        }
        onChange={elemPeptHandler}
      />{" "}
      <label htmlFor="PEPTElemYes" className="form-label-radio">
        Yes
      </label>{" "}
      <input
        type="radio"
        value="N"
        name="PEPTElem"
        id="PEPTElemNo"
        checked={props.studentEntity.elemPeptPasser === "N"}
        disabled={
          props.disabled && !(props.studentEntity.elemPeptPasser === "N")
        }
        onChange={elemPeptHandler}
      />{" "}
      <label htmlFor="PEPTElemNo" className="form-label-radio">
        No
      </label>
    </>
  );
};

export default ElemPeptPasser;

import React from "react";

const GuardianRelations = (props) => {
  const handleGuardianRelationship = (e) => {
    e.preventDefault();

    props.setStudentEntity({
      ...props.studentEntity,
      sdtStudentOtherInfo: {
        ...props.studentEntity.sdtStudentOtherInfo,
        guardianRelation: e.target.value,
      },
    });
  };

  return (
    <>
      <label className="form-label">Relationship with Guardian</label>{" "}
      {props.errorDisplay && (
        <label className="form-label error">{`(${props.errorDisplay})`}</label>
      )}
      <br />
      <select
        name={props.name}
        className={props.className}
        value={
          props.studentEntity.sdtStudentOtherInfo === null
            ? ""
            : props.studentEntity.sdtStudentOtherInfo.guardianRelation
        }
        disabled={props.disabled}
        onChange={handleGuardianRelationship}
      >
        <option key="0" value="">
          {"Please select ..."}
        </option>
        <option key="1" value="Parent">
          Parent
        </option>
        <option key="2" value="Relative">
          Relative
        </option>
        <option key="3" value="Non-Relative">
          Non-Relative
        </option>
        ))
      </select>
    </>
  );
};

export default GuardianRelations;

import React from "react";
import { CfgGradeLevels } from "../LocalData/CfgGradeLevels";

const GradeLevelsDropdown = (props) => {
  const handleGradeLevels = (e) => {
    props.setSectionEntity({
      ...props.sectionEntity,
      [props.gradeLevelField]:
        e.target.value === "0"
          ? {
              id: 0,
              code: "",
              name: "",
              desc: "",
              entDate: null,
              modDate: null,
            }
          : CfgGradeLevels.find(
              (gradeLevel) => gradeLevel.id === Number(e.target.value)
            ),
    });
  };

  return (
    <>
      <label className="form-label">Grade Level</label>{" "}
      {props.errorDisplay && (
        <label className="form-label error">{`(${props.errorDisplay})`}</label>
      )}
      <br />
      <select
        name={props.name}
        className={props.className}
        value={
          props.sectionEntity.gradeLevel === null
            ? ""
            : props.sectionEntity.gradeLevel.id
        }
        disabled={props.disabled}
        onChange={handleGradeLevels}
      >
        <option key="000" value="0">
          {"Please select ..."}
        </option>
        {CfgGradeLevels.map((gradeLevel) => (
          <option key={gradeLevel.id} value={gradeLevel.id}>
            {gradeLevel.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default GradeLevelsDropdown;

import React, { useEffect, useState } from "react";
import EnrollmentService from "../../services/EnrollmentService";
import { CfgGradeLevels } from "../LocalData/CfgGradeLevels";

function GradeSectionForModal(props) {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    EnrollmentService.getAllSections().then((response) => {
      setSections(response.data);
    });
  }, []);

  const handleOnchangeGradeLevel = (e) => {
    props.setGradeLevelToMove(
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
          )
    );

    if (e.target.value === "0") {
      props.setSectionToMove({
        id: 0,
        code: "",
        name: "",
        desc: "",
        entDate: null,
        modDate: null,
      });
    }
  };

  const handleOnChangeSection = (e) => {
    props.setSectionToMove(
      e.target.value === "0"
        ? {
            id: 0,
            code: "",
            name: "",
            desc: "",
            entDate: null,
            modDate: null,
          }
        : sections.find((section) => section.id === Number(e.target.value))
    );
  };

  return (
    <>
      <div>
        <label className="modal-body-label">Grade Level</label>{" "}
        {props.errorDisplay && (
          <label className="modal-body-label error">{`(${props.errorDisplay})`}</label>
        )}
      </div>
      <select
        name="GradeLevel"
        className="modal-body-dropdown"
        value={
          props.gradeLevelToMove === null ? "0" : props.gradeLevelToMove.id
        }
        onChange={handleOnchangeGradeLevel}
      >
        <option key="0" value="0">
          {"Please select ..."}
        </option>
        {CfgGradeLevels.map((cfgGradeLevel) => (
          <option key={cfgGradeLevel.id} value={cfgGradeLevel.id}>
            {`${cfgGradeLevel.code} - ${cfgGradeLevel.name}`}
          </option>
        ))}
      </select>
      <div>
        <label className="modal-body-label">Section</label>{" "}
        {props.errorDisplay && (
          <label className="modal-body-label error">{`(${props.errorDisplay})`}</label>
        )}
      </div>
      <select
        name="Section"
        className="modal-body-dropdown"
        value={props.sectionToMove === null ? 0 : props.sectionToMove.id}
        onChange={handleOnChangeSection}
        disabled={
          props.gradeLevelToMove === null ||
          props.gradeLevelToMove.id === "0" ||
          props.disabled
        }
      >
        <option key={0} value={0}>
          {"Please select ..."}
        </option>
        {props.gradeLevelToMove &&
          sections
            .filter(
              (section) => section.gradeLevel.id === props.gradeLevelToMove.id
            )
            .map((section) => (
              <option key={section.id} value={section.id}>
                {`${section.gradeLevel.name} - ${section.name}`}
              </option>
            ))}
      </select>
    </>
  );
}

export default GradeSectionForModal;

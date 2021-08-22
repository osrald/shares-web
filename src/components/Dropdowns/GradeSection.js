import React, { useEffect, useState } from "react";
import EnrollmentService from "../../services/EnrollmentService";
import { CfgGradeLevels } from "../LocalData/CfgGradeLevels";

function GradeSection(props) {
  const [sections, setSections] = useState([]);
  const [selectedGradeLevel, setSelectedGradeLevel] = useState(
    props.selectedSection === null
      ? {
          id: 0,
          code: "",
          name: "",
          desc: "",
          entDate: null,
          modDate: null,
        }
      : props.selectedSection.gradeLevel
  );

  useEffect(() => {
    EnrollmentService.getAllSections().then((response) => {
      setSections(response.data);
    });
  }, []);

  const handleOnchangeGradeLevel = (e) => {
    setSelectedGradeLevel(
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
    props.setStudentEntity({ ...props.studentEntity, section: null });
  };

  const handleOnChangeSection = (e) => {
    props.setStudentEntity({
      ...props.studentEntity,
      section:
        e.target.value === "0"
          ? {
              id: 0,
              code: "",
              name: "",
              desc: "",
              entDate: null,
              modDate: null,
            }
          : sections.find((section) => section.id === Number(e.target.value)),
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
        name="GradeLevel"
        className="form-dropdown"
        value={selectedGradeLevel === null ? "0" : selectedGradeLevel.id}
        onChange={handleOnchangeGradeLevel}
        disabled={props.disabled}
      >
        <option key="0" value="0">
          {"Please select ..."}
        </option>
        {CfgGradeLevels.map((cfgGradeLevel) => (
          <option key={cfgGradeLevel.id} value={cfgGradeLevel.id}>
            {`${cfgGradeLevel.code} - ${cfgGradeLevel.name}`}
          </option>
        ))}
      </select>{" "}
      <br />
      <label className="form-label">Section</label>{" "}
      {props.errorDisplay && (
        <label className="form-label error">{`(${props.errorDisplay})`}</label>
      )}
      <br />
      <select
        name="Section"
        className="form-dropdown"
        value={props.selectedSection === null ? 0 : props.selectedSection.id}
        onChange={handleOnChangeSection}
        disabled={
          selectedGradeLevel === null ||
          selectedGradeLevel.id === "0" ||
          props.disabled
        }
      >
        <option key={0} value={0}>
          {"Please select ..."}
        </option>
        {selectedGradeLevel &&
          sections
            .filter(
              (section) => section.gradeLevel.id === selectedGradeLevel.id
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

export default GradeSection;

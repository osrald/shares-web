import React from "react";
import { SchoolYears } from "../LocalData/SchoolYears";
import { Semesters } from "../LocalData/Semesters";

const SchoolYearsAndSemesters = (props) => {
  const handleSchoolYears = (e) => {
    e.preventDefault();

    props.setSelectedValue1(e.target.value);
  };

  const handleSemesters = (e) => {
    e.preventDefault();

    props.setSelectedValue2(e.target.value);
  };

  return (
    <>
      <div className="div-beside">
        <div className="div-beside-left">
          <label className="form-label">School Year</label>{" "}
          {props.errorDisplay1 && (
            <label className="form-label error">{`(${props.errorDisplay1})`}</label>
          )}
          <br />
          <select
            name="ShoolYear"
            className="form-dropdown"
            value={props.selectedValue1}
            onChange={handleSchoolYears}
          >
            <option key="000" value="">
              {"Please select ..."}
            </option>
            {SchoolYears.map((schoolYear) => (
              <option key={schoolYear.code} value={schoolYear.value}>
                {schoolYear.value}
              </option>
            ))}
          </select>
        </div>
        <div className="div-beside-right">
          <label className="form-label">Semester</label>{" "}
          {props.errorDisplay2 && (
            <label className="form-label error">{`(${props.errorDisplay2})`}</label>
          )}
          <br />
          <select
            name="Semester"
            className="form-dropdown"
            value={props.selectedValue2}
            disabled={props.disabled}
            onChange={handleSemesters}
          >
            <option key="000" value="">
              {"Please select ..."}
            </option>
            {Semesters.map((semester) => (
              <option key={semester.code} value={semester.value}>
                {semester.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default SchoolYearsAndSemesters;

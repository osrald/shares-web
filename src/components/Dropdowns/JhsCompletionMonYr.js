import React from "react";
import { Months } from "../LocalData/Months";
import Years from "../LocalData/Years";

const JhsCompletionMonYr = (props) => {
  const monthHandler = (e) => {
    props.setStudentEntity({
      ...props.studentEntity,
      jhsCompMonth: e.target.value,
    });
  };

  const yearHandler = (e) => {
    props.setStudentEntity({
      ...props.studentEntity,
      jhsCompYear: e.target.value,
    });
  };

  return (
    <>
      <label className="form-label">Month/Year of Completion</label>{" "}
      {props.errorDisplay && (
        <label className="form-label error">{`(${props.errorDisplay})`}</label>
      )}
      <br />
      <select
        name="JhsECmm"
        className="form-dropdown"
        value={props.studentEntity.jhsCompMonth}
        disabled={props.disabled}
        onChange={monthHandler}
      >
        <option key="00" value="">
          {" "}
        </option>
        {Months.map((month) => (
          <option key={month.code} value={month.shortName}>
            {month.shortName}
          </option>
        ))}
      </select>
      <select
        name="JhsECyyyy"
        className="form-dropdown"
        value={props.studentEntity.jhsCompYear}
        disabled={props.disabled}
        onChange={yearHandler}
      >
        <option key="0000" value="">
          {" "}
        </option>
        {Years.getYears().map((year) => (
          <option key={year.key} value={year.value}>
            {year.value}
          </option>
        ))}
      </select>
    </>
  );
};

export default JhsCompletionMonYr;

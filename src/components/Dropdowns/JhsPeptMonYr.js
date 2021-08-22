import React from "react";
import { Months } from "../LocalData/Months";
import Years from "../LocalData/Years";

const JhsPeptMonYr = (props) => {
  const monthHandler = (e) => {
    props.setStudentEntity({
      ...props.studentEntity,
      jhsPeptMonth: e.target.value,
    });
  };

  const yearHandler = (e) => {
    props.setStudentEntity({
      ...props.studentEntity,
      jhsPeptYear: e.target.value,
    });
  };

  return (
    <>
      <label className="form-label">
        PEPT junior high school level passer month/year of completion
      </label>{" "}
      {props.errorDisplay && (
        <label className="form-label error">{`(${props.errorDisplay})`}</label>
      )}
      <br />
      <select
        name="JhsPeptCmm"
        className="form-dropdown"
        value={
          props.studentEntity.jhsPeptMonth === null ||
          props.studentEntity.jhsPeptPasser === "N"
            ? ""
            : props.studentEntity.jhsPeptMonth
        }
        onChange={monthHandler}
        disabled={
          (props.studentEntity.jhsPeptPasser === "" ||
          props.studentEntity.jhsPeptPasser === "N"
            ? true
            : false) || props.disabled
        }
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
        name="JhsPeptCyyyy"
        className="form-dropdown"
        value={
          props.studentEntity.jhsPeptYear === null ||
          props.studentEntity.jhsPeptPasser === "N"
            ? ""
            : props.studentEntity.jhsPeptYear
        }
        onChange={yearHandler}
        disabled={
          (props.studentEntity.jhsPeptPasser === "" ||
          props.studentEntity.jhsPeptPasser === "N"
            ? true
            : false) || props.disabled
        }
      >
        <option key={"0000"} value={""}>
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

export default JhsPeptMonYr;

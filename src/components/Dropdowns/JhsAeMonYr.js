import React from "react";
import { Months } from "../LocalData/Months";
import Years from "../LocalData/Years";

const JhsAeMonYr = (props) => {
  const monthHandler = (e) => {
    props.setStudentEntity({
      ...props.studentEntity,
      jhsAeMonth: e.target.value,
    });
  };

  const yearHandler = (e) => {
    props.setStudentEntity({
      ...props.studentEntity,
      jhsAeYear: e.target.value,
    });
  };

  return (
    <>
      <label className="form-label">
        A & E junior high school level passer month/year of completion
      </label>{" "}
      {props.errorDisplay && (
        <label className="form-label error">{`(${props.errorDisplay})`}</label>
      )}
      <br />
      <select
        name="JhsAeCmm"
        className="form-dropdown"
        value={
          props.studentEntity.jhsAeMonth === null ||
          props.studentEntity.jhsAePasser === "N"
            ? ""
            : props.studentEntity.jhsAeMonth
        }
        onChange={monthHandler}
        disabled={
          props.studentEntity.jhsAePasser === "" ||
          props.studentEntity.jhsAePasser === "N"
            ? true
            : false
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
        name="JhsAeCyyyy"
        className="form-dropdown"
        value={
          props.studentEntity.jhsAeYear === null ||
          props.studentEntity.jhsAePasser === "N"
            ? ""
            : props.studentEntity.jhsAeYear
        }
        onChange={yearHandler}
        disabled={
          props.studentEntity.jhsAePasser === "" ||
          props.studentEntity.jhsAePasser === "N"
            ? true
            : false
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

export default JhsAeMonYr;

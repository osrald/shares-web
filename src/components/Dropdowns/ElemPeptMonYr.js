import React from "react";
import { Months } from "../LocalData/Months";
import Years from "../LocalData/Years";

const ElemPeptMonYr = (props) => {
  const monthHandler = (e) => {
    props.setStudentEntity({
      ...props.studentEntity,
      elemPeptMonth: e.target.value,
    });
  };

  const yearHandler = (e) => {
    props.setStudentEntity({
      ...props.studentEntity,
      elemPeptYear: e.target.value,
    });
  };

  return (
    <>
      <label className="form-label">
        PEPT elementary level passer month/year of completion
      </label>{" "}
      {props.errorDisplay && (
        <label className="form-label error">{`(${props.errorDisplay})`}</label>
      )}
      <br />
      <select
        name="ElemPeptCmm"
        className="form-dropdown"
        value={
          props.studentEntity.elemPeptMonth === null ||
          props.studentEntity.elemPeptPasser === "N"
            ? ""
            : props.studentEntity.elemPeptMonth
        }
        onChange={monthHandler}
        disabled={
          (props.studentEntity.elemPeptPasser === "" ||
          props.studentEntity.elemPeptPasser === "N"
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
        name="ElemPeptCyyyy"
        className="form-dropdown"
        value={
          props.studentEntity.elemPeptYear === null ||
          props.studentEntity.elemPeptPasser === "N"
            ? ""
            : props.studentEntity.elemPeptYear
        }
        onChange={yearHandler}
        disabled={
          (props.studentEntity.elemPeptPasser === "" ||
          props.studentEntity.elemPeptPasser === "N"
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

export default ElemPeptMonYr;

import React from "react";
import { Months } from "../LocalData/Months";
import Years from "../LocalData/Years";

const ElemAeMonYr = (props) => {
  const monthHandler = (e) => {
    props.setStudentEntity({
      ...props.studentEntity,
      elemAeMonth: e.target.value,
    });
  };

  const yearHandler = (e) => {
    props.setStudentEntity({
      ...props.studentEntity,
      elemAeYear: e.target.value,
    });
  };

  function renderMnYr() {
    return (
      <>
        <label className="form-label">
          A & E elementary level passer month/year of completion
        </label>{" "}
        {props.errorDisplay && (
          <label className="form-label error">{`(${props.errorDisplay})`}</label>
        )}
        <br />
        <select
          name="ElemAeCmm"
          className="form-dropdown"
          value={
            (props.studentEntity.elemAeMonth === null ||
            props.studentEntity.elemAePasser === "N"
              ? ""
              : props.studentEntity.elemAeMonth) || props.disabled
          }
          onChange={monthHandler}
          disabled={
            (props.studentEntity.elemAePasser === "" ||
            props.studentEntity.elemAePasser === "N"
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
          name="ElemAeCyyyy"
          className="form-dropdown"
          value={
            props.studentEntity.elemAeYear === null ||
            props.studentEntity.elemAePasser === "N"
              ? ""
              : props.studentEntity.elemAeYear
          }
          onChange={yearHandler}
          disabled={
            (props.studentEntity.elemAePasser === "" ||
            props.studentEntity.elemAePasser === "N"
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
  }

  return renderMnYr();
};

export default ElemAeMonYr;

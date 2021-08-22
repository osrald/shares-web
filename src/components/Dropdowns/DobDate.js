import React from "react";
import Days from "../LocalData/Days";
import { Months } from "../LocalData/Months";
import Years from "../LocalData/Years";

const DobDate = (props) => {
  const onChangeMonth = (e) => {
    props.setDobMM(e.target.value);
    props.setStudentEntity({
      ...props.studentEntity,
      dob: `${props.dobYY}-${e.target.value}-${props.dobDD}`,
    });
  };

  const onChangeDay = (e) => {
    props.setDobDD(e.target.value);
    props.setStudentEntity({
      ...props.studentEntity,
      dob: `${props.dobYY}-${props.dobMM}-${e.target.value}`,
    });
  };

  const onChangeYear = (e) => {
    props.setDobYY(e.target.value);
    props.setStudentEntity({
      ...props.studentEntity,
      dob: `${e.target.value}-${props.dobMM}-${props.dobDD}`,
    });
  };

  return (
    <div className="form-inputs">
      <label htmlFor="gender" className="form-label">
        Mon-dd-yyyy
      </label>{" "}
      {props.errorDisplay && (
        <label className="form-label error">{`(${props.errorDisplay})`}</label>
      )}
      <br />
      <select
        name="DOBmm"
        className="form-dropdown"
        value={props.dobMM}
        disabled={props.disabled}
        onChange={onChangeMonth}
      >
        <option key="00" value="">
          {" "}
        </option>
        {Months.map((month) => (
          <option key={month.code} value={month.code}>
            {month.shortName}
          </option>
        ))}
      </select>
      <select
        name="DOBdd"
        className="form-dropdown"
        value={props.dobDD}
        disabled={props.disabled}
        onChange={onChangeDay}
      >
        <option key="00" value="">
          {" "}
        </option>
        {Days.getDays().map((day) => (
          <option key={day.key} value={day.value}>
            {day.value}
          </option>
        ))}
      </select>
      <select
        name="DOByyyy"
        className="form-dropdown"
        value={props.dobYY}
        disabled={props.disabled}
        onChange={onChangeYear}
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
    </div>
  );
};

export default DobDate;

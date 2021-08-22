import React from "react";

const StudentGender = (props) => {
  const genderHandler = (e) => {
    props.setStudentEntity({
      ...props.studentEntity,
      gender: `${e.target.value === "Male" ? "M" : "F"}`,
    });
  };

  return (
    <div className="form-inputs">
      <label htmlFor="gender" className="form-label">
        Click or Tap to choose gender
      </label>{" "}
      {props.errorDisplay && (
        <label className="form-label error">{`(${props.errorDisplay})`}</label>
      )}
      <br />
      <input
        type="radio"
        value="Male"
        name="gender"
        id="male"
        checked={props.studentEntity.gender === "M"}
        onChange={genderHandler}
        disabled={props.disabled && !(props.studentEntity.gender === "M")}
      />{" "}
      <label htmlFor="male" className="form-label-radio">
        Male
      </label>{" "}
      <input
        type="radio"
        value="Female"
        name="gender"
        id="female"
        checked={props.studentEntity.gender === "F"}
        onChange={genderHandler}
        disabled={props.disabled && !(props.studentEntity.gender === "F")}
      />{" "}
      <label htmlFor="female" className="form-label-radio">
        Female
      </label>
    </div>
  );
};

export default StudentGender;

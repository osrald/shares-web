import React, { useState, useEffect } from "react";
import UserService from "../../services/UserService";

const ClassAdviser = (props) => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    UserService.getTeachersAll().then((response) => {
      if (response.data !== null) {
        setTeachers(response.data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClassAdviser = (e) => {
    props.setSectionEntity({
      ...props.sectionEntity,
      [props.classAdviserField]:
        e.target.value === "0"
          ? {
              id: "",
              userName: "",
              fullName: "",
            }
          : teachers.find((teacher) => teacher.id === e.target.value),
    });
  };

  return (
    <>
      <label className="form-label">Class Adviser</label>{" "}
      {props.errorDisplay && (
        <label className="form-label error">{`(${props.errorDisplay})`}</label>
      )}
      <br />
      <select
        name={props.name}
        className={props.className}
        value={
          props.sectionEntity.adviser === null
            ? ""
            : props.sectionEntity.adviser.id
        }
        disabled={props.disabled}
        onChange={handleClassAdviser}
      >
        <option key="000" value="0">
          {"Please select ..."}
        </option>
        {teachers.map((teacher) => (
          <option key={teacher.id} value={teacher.id}>
            {teacher.fullName}
          </option>
        ))}
      </select>
    </>
  );
};

export default ClassAdviser;

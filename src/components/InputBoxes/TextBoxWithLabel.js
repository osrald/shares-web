import React from "react";

const TextBoxWithLabel = (props) => {
  const handleTextOnchange = (e) => {
    const { name, value } = e.target;

    if (props.studentEntity) {
      const nIdx = name.indexOf(".");
      if (nIdx !== -1) {
        const prop1 = name.slice(0, nIdx);
        const prop2 = name.slice(nIdx + 1, name.length);

        props.setStudentEntity({
          ...props.studentEntity,
          [prop1]: { ...props.studentEntity[prop1], [prop2]: value },
        });
      } else {
        props.setStudentEntity({ ...props.studentEntity, [name]: value });
      }
    } else {
      props.setTextValue(value);
    }
  };

  let txtValue;
  if (!props.textValue) {
    txtValue = "";
  } else {
    txtValue = props.textValue;
  }

  return (
    <>
      {props.labelDisplay !== "" ? (
        <>
          <label htmlFor={props.nameLabel} className="form-label">
            {props.labelDisplay}
          </label>{" "}
          {props.errorDisplay && (
            <label className="form-label error">{`(${props.errorDisplay})`}</label>
          )}
        </>
      ) : (
        ""
      )}
      <input
        id={props.inputId}
        type="text"
        name={props.nameLabel}
        className={`form-input ${props.errorDisplay && "input-error"}`}
        placeholder={props.inputPlaceHolder}
        value={txtValue}
        onChange={handleTextOnchange}
        readOnly={props.readOnly}
      />
    </>
  );
};

export default TextBoxWithLabel;

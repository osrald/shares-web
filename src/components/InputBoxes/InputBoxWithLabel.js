import React from "react";

function InputBoxWithLabel(props) {
  const handleTextOnchange = (e) => {
    const { name, value } = e.target;
    props.setDataEntity({ ...props.dataEntity, [name]: value });
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
        type={props.type}
        name={props.nameLabel}
        className={`form-input ${props.errorDisplay && "input-error"}`}
        placeholder={props.inputPlaceHolder}
        value={txtValue}
        onChange={handleTextOnchange}
        readOnly={props.readOnly}
      />
    </>
  );
}

export default InputBoxWithLabel;

import React from "react";
import { CfgBarangays } from "../LocalData/CfgBarangays";

const BarangaysDropdown = (props) => {
  const handleBarangays = (e) => {
    props.setStudentEntity({
      ...props.studentEntity,
      [props.regionField]:
        e.target.value === "0"
          ? {
              id: 0,
              code: "",
              name: "",
              desc: null,
              entDate: null,
              modDate: null,
            }
          : CfgBarangays.find(
              (barangay) => barangay.id === Number(e.target.value)
            ),
    });
  };

  return (
    <>
      <label className="form-label">Barangay</label>{" "}
      {props.errorDisplay && (
        <label className="form-label error">{`(${props.errorDisplay})`}</label>
      )}
      <br />
      <select
        name={props.name}
        className={props.className}
        value={
          props.studentEntity.addrMakatiResidentBarangay === null
            ? ""
            : props.studentEntity.addrMakatiResidentBarangay.id
        }
        disabled={props.disabled}
        onChange={handleBarangays}
      >
        <option key="000" value="0">
          {"Please select ..."}
        </option>
        {CfgBarangays.map((barangay) => (
          <option key={barangay.id} value={barangay.id}>
            {barangay.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default BarangaysDropdown;

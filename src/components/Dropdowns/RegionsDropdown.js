import React from "react";
import { CfgRegions } from "../LocalData/CfgRegions";

const RegionsDropdown = (props) => {
  const handleRegions = (e) => {
    props.setStudentEntity({
      ...props.studentEntity,
      [props.regionField]:
        e.target.value === ""
          ? {
              id: 0,
              code: "",
              name: "",
              desc: null,
              entDate: null,
              modDate: null,
            }
          : CfgRegions.find((region) => region.code === e.target.value),
    });
  };

  return (
    <>
      <label className="form-label">Region</label>{" "}
      {props.errorDisplay && (
        <label className="form-label error">{`(${props.errorDisplay})`}</label>
      )}
      <br />
      <select
        name={props.name}
        className={props.className}
        value={props.selectedRegionValue}
        disabled={props.disabled}
        onChange={handleRegions}
      >
        <option key="000" value="">
          {"Please select ..."}
        </option>
        {CfgRegions.map((cfgRegion) => (
          <option key={cfgRegion.id} value={cfgRegion.code}>
            {cfgRegion.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default RegionsDropdown;

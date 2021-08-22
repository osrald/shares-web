import React from "react";
import { ConfigTypes } from "../LocalData/ConfigTypes";

function ConfigType({ setConfigMajor }) {
  const onChangeConfigType = (e) => {
    e.preventDefault();
    setConfigMajor(e.target.value);
  };

  return (
    <div className="select-input">
      <label htmlFor="configtype" className="form-label">
        Configuration Types
      </label>
      <br />
      <select
        name="configtype"
        id="configtype"
        className="form-dropdown"
        onChange={onChangeConfigType}
      >
        <option key="000" value="000">
          Please select...
        </option>
        {ConfigTypes.map((configType) => (
          <option key={configType.cfMinor} value={configType.cfMinor}>
            {configType.cfMinor} - {configType.cfName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ConfigType;

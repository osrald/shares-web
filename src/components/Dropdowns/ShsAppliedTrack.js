import React from "react";
import { CfgSchools } from "../LocalData/CfgSchools";
import { CfgTracks } from "../LocalData/CfgTracks";
import { CfgStrandSpecs } from "../LocalData/CfgStrandSpecs";

const ShsAppliedTrack = (props) => {
  const MAKATI_HIGH_SCHOOL_ID = 1;

  const handleOnChangeTrack = (e) => {
    props.setStudentEntity({
      ...props.studentEntity,
      [props.trackField]:
        e.target.value === "0"
          ? {
              id: 0,
              chId: 0,
              code: "",
              name: "",
              desc: null,
              entDate: null,
              modDate: null,
            }
          : CfgTracks.find((track) => track.id === Number(e.target.value)),
      [props.strandSpecField]: {
        id: 0,
        chId: 0,
        ctId: 0,
        code: "",
        name: "",
        desc: null,
        entDate: null,
        modDate: null,
      },
    });
  };

  const handleOnchangeStrndSpec = (e) => {
    props.setStudentEntity({
      ...props.studentEntity,
      [props.strandSpecField]:
        e.target.value === "0"
          ? {
              id: 0,
              chId: 0,
              ctId: 0,
              code: "",
              name: "",
              desc: null,
              entDate: null,
              modDate: null,
            }
          : CfgStrandSpecs.find(
              (strandSpec) => strandSpec.id === Number(e.target.value)
            ),
    });
  };

  return (
    <>
      <label className="form-label">School</label>{" "}
      {props.errorDisplay && (
        <label className="form-label error">{`(${props.errorDisplay})`}</label>
      )}
      <br />
      <select
        name="School"
        className="form-dropdown"
        value={MAKATI_HIGH_SCHOOL_ID}
        disabled
      >
        <option key="0" value="0">
          {"Please select ..."}
        </option>
        {CfgSchools.filter(
          (cfgSchool) => cfgSchool.id === MAKATI_HIGH_SCHOOL_ID
        ).map((cfgSchool) => (
          <option key={cfgSchool.id} value={cfgSchool.id}>
            {`${cfgSchool.code} - ${cfgSchool.name}`}
          </option>
        ))}
      </select>
      <br />
      <label className="form-label">Track</label>
      <br />
      <select
        name="Track"
        className="form-dropdown"
        value={props.studentEntity.shsTrackEnrolled.id}
        onChange={handleOnChangeTrack}
      >
        <option key={0} value={0}>
          {"Please select ..."}
        </option>
        {CfgTracks.filter(
          (cfgTrack) => cfgTrack.chId === MAKATI_HIGH_SCHOOL_ID
        ).map((cfgTrack) => (
          <option key={cfgTrack.id} value={cfgTrack.id}>
            {`${cfgTrack.code} - ${cfgTrack.name}`}
          </option>
        ))}
      </select>
      <br />
      <label className="form-label">Strand/Specialization</label>
      <br />
      <select
        name="StrndSpec"
        className="form-dropdown"
        value={props.studentEntity.shsStrSpecEnrolled.id}
        onChange={handleOnchangeStrndSpec}
        disabled={
          props.studentEntity.shsTrackEnrolled.id === 0 || props.disabled
        }
      >
        <option key={0} value={0}>
          {"Please select ..."}
        </option>
        {CfgStrandSpecs.filter(
          (cfgStrandSpec) =>
            cfgStrandSpec.ctId === props.studentEntity.shsTrackEnrolled.id &&
            cfgStrandSpec.chId === MAKATI_HIGH_SCHOOL_ID
        ).map((cfgStrandSpec) => (
          <option key={cfgStrandSpec.id} value={cfgStrandSpec.id}>
            {`${cfgStrandSpec.code} - ${cfgStrandSpec.name}`}
          </option>
        ))}
      </select>
    </>
  );
};

export default ShsAppliedTrack;

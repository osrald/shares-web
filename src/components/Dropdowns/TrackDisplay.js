import React, { useState, useRef, useEffect } from "react";
import { CfgSchools } from "../LocalData/CfgSchools";
import { CfgTracks } from "../LocalData/CfgTracks";
import { CfgStrandSpecs } from "../LocalData/CfgStrandSpecs";
import OtherSchoolDetails from "../Modals/OtherSchoolDetails";

const TrackDisplay = (props) => {
  const [displayOtherSchoolDetails, setDisplayOtherSchoolDetails] =
    useState(false);
  const selectedButtonSchoolOther = useRef(null);

  useEffect(() => {
    if (!displayOtherSchoolDetails) {
      selectedButtonSchoolOther.current.focus();
    }
  }, [displayOtherSchoolDetails]);

  const handleOnchangeSchool = (e) => {
    props.setStudentEntity({
      ...props.studentEntity,
      [props.schoolField]:
        e.target.value === "0"
          ? {
              id: 0,
              code: "",
              name: "",
              desc: null,
              general1: null,
              general2: null,
              entDate: null,
              modDate: null,
            }
          : CfgSchools.find((school) => school.id === Number(e.target.value)),
      [props.trackField]: {
        id: 0,
        chId: 0,
        code: "",
        name: "",
        desc: null,
        entDate: null,
        modDate: null,
      },
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

  const handleOnclickOtherSchool = (e) => {
    e.preventDefault();
    setDisplayOtherSchoolDetails(true);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <OtherSchoolDetails
        displayOtherSchoolDetails={displayOtherSchoolDetails}
        setDisplayOtherSchoolDetails={setDisplayOtherSchoolDetails}
        displayIsFirstChoice={props.displayIsFirstChoice}
        schoolChoiceOthersNm={props.schoolChoiceOthersNm}
        schoolChoiceOthersAddr={props.schoolChoiceOthersAddr}
        schoolChoiceOthersNmField={props.schoolChoiceOthersNmField}
        schoolChoiceOthersAddrField={props.schoolChoiceOthersAddrField}
        studentEntity={props.studentEntity}
        setStudentEntity={props.setStudentEntity}
        readOnly={props.disabled}
      />
      <label className="form-label">School</label>{" "}
      {props.errorDisplay && (
        <label className="form-label error">{`(${props.errorDisplay})`}</label>
      )}
      <br />
      <select
        name="School"
        className="form-dropdown"
        value={props.selectedSchool === null ? "0" : props.selectedSchool.id}
        onChange={handleOnchangeSchool}
        disabled={props.disabled}
      >
        <option key="0" value="0">
          {"Please select ..."}
        </option>
        {CfgSchools.map((cfgSchool) => (
          <option key={cfgSchool.id} value={cfgSchool.id}>
            {`${cfgSchool.code} - ${cfgSchool.name}`}
          </option>
        ))}
      </select>
      {"  "}
      <button
        onClick={handleOnclickOtherSchool}
        className={`button-other ${
          props.selectedSchool === null || props.selectedSchool.code !== "999"
            ? "hidden"
            : ""
        }`}
        ref={selectedButtonSchoolOther}
      >
        Other School Details
      </button>
      <br />
      <label className="form-label">Track</label>
      <br />
      <select
        name="Track"
        className="form-dropdown"
        value={props.selectedTrack === null ? 0 : props.selectedTrack.id}
        onChange={handleOnChangeTrack}
        disabled={
          props.selectedSchool === null ||
          props.selectedSchool.id === 0 ||
          props.disabled
        }
      >
        <option key={0} value={0}>
          {"Please select ..."}
        </option>
        {props.selectedSchool &&
          CfgTracks.filter(
            (cfgTrack) => cfgTrack.chId === props.selectedSchool.id
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
        value={
          props.selectedStrandSpec === null ? 0 : props.selectedStrandSpec.id
        }
        onChange={handleOnchangeStrndSpec}
        disabled={
          props.selectedTrack === null ||
          props.selectedTrack.id === 0 ||
          props.disabled
        }
      >
        <option key={0} value={0}>
          {"Please select ..."}
        </option>
        {props.selectedTrack &&
          CfgStrandSpecs.filter(
            (cfgStrandSpec) =>
              cfgStrandSpec.ctId === props.selectedTrack.id &&
              cfgStrandSpec.chId === props.selectedSchool.id
          ).map((cfgStrandSpec) => (
            <option key={cfgStrandSpec.id} value={cfgStrandSpec.id}>
              {`${cfgStrandSpec.code} - ${cfgStrandSpec.name}`}
            </option>
          ))}
      </select>
    </>
  );
};

export default TrackDisplay;

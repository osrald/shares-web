import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";

//import jwt_decode from "jwt-decode";

import TextBoxWithLabel from "../../components/InputBoxes/TextBoxWithLabel";
import { CfgSchools } from "../../components/LocalData/CfgSchools";
import { CfgTracks } from "../../components/LocalData/CfgTracks";
import { CfgStrandSpecs } from "../../components/LocalData/CfgStrandSpecs";
import StudentEntity from "../../components/LocalData/StudentEntity";
import StudentService from "../../services/StudentService";
import { SeniorHighRegPrintInfo } from "../../components/Print/SeniorHighRegPrintInfo";
import "./SeniorHighRegInfo.css";

function SeniorHighRegFormInfo({ match }) {
  const componentRef = useRef();

  const [studentInfo, setStudentInfo] = useState(StudentEntity.intialize());
  const [fcSchool, setFcSchool] = useState("");
  const [fcTrack, setFcTrack] = useState("");
  const [fcStrandSpec, setFcStrandSpec] = useState("");

  useEffect(() => {
    if (match.params.id.length === 12) {
      StudentService.getStudentByLRN(match.params.id).then((response) => {
        if (response.data !== "") {
          setStudentInfo(response.data);
        }
      });
    } else {
      StudentService.getStudentById(match.params.id).then((response) => {
        if (response.data !== "") {
          setStudentInfo(response.data);
        }
      });
    }

    /*const token =
      "SHARES eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJzaGFyZXNKV1QiLCJzdWIiOiJvcyIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE2MjE0ODA0MjYsImV4cCI6MTYyMTQ4MTAyNn0.hg83fAxddZ3L9XeGXOJrwzCWAuRc5YXlEhg6pj_4v3XxucTlJAF7u8LHbCWslD-iMCI8IAZjz14h9ElDX3CAtg";
    const decoded = jwt_decode(token);

    console.log(decoded);*/

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFcSchool(
      CfgSchools.filter(
        (school) => school.id === studentInfo.shsSchoolFirstChoice.id
      ).map((school) => {
        let fcSchl = "";
        if (school.code === "999") {
          fcSchl = `${school.code} - ${school.name} - ${studentInfo.shsSchoolFirstChoiceOthersNm}`;
        } else {
          fcSchl = `${school.code} - ${school.name}`;
        }

        return fcSchl;
      })
    );

    setFcTrack(
      CfgTracks.filter(
        (track) => track.id === studentInfo.shsTrackFirstChoice.id
      ).map((track) => {
        return `${track.code} - ${track.name} - ${track.desc}`;
      })
    );

    setFcStrandSpec(
      CfgStrandSpecs.filter(
        (strndspec) => strndspec.id === studentInfo.shsStrSpecFirstChoice.id
      ).map((strndspec) => {
        return `${strndspec.code} - ${strndspec.name} - ${strndspec.desc}`;
      })
    );
  }, [studentInfo]);

  return (
    <div className="info-container">
      <div className="info-content">
        <div className="info-form">
          <h2>
            {`Your LRN[${studentInfo.lrnNo}] has been registered for School Year:
            ${studentInfo.shsSy}.`}
          </h2>
          <br />
          <div className="form-inputs">
            <ReactToPrint
              trigger={() => (
                <button
                  className="button"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Print Registration Form
                </button>
              )}
              content={() => componentRef.current}
            />
          </div>
          <div style={{ display: "none" }}>
            <SeniorHighRegPrintInfo
              studentInfo={studentInfo}
              ref={componentRef}
            />
          </div>
          <h1>1. Student Info.</h1>
          <div className="form-inputs">
            <TextBoxWithLabel
              labelDisplay="Lastname"
              readOnly={true}
              textValue={studentInfo.lastname}
            />
          </div>
          <div className="form-inputs">
            <TextBoxWithLabel
              labelDisplay="Firstname"
              readOnly={true}
              textValue={studentInfo.firstname}
            />
          </div>
          <div className="form-inputs">
            <TextBoxWithLabel
              labelDisplay="Middlename"
              readOnly={true}
              textValue={studentInfo.middlename}
            />
          </div>
          <br />
          <h1>2. Other Info.</h1>
          <div className="form-inputs">
            <TextBoxWithLabel
              labelDisplay="First choice School"
              readOnly={true}
              textValue={fcSchool}
            />
          </div>
          <div className="form-inputs">
            <TextBoxWithLabel
              labelDisplay="First choice Track"
              readOnly={true}
              textValue={fcTrack}
            />
          </div>
          <div className="form-inputs">
            <TextBoxWithLabel
              labelDisplay="First choice Strand/Specialization"
              readOnly={true}
              textValue={fcStrandSpec}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeniorHighRegFormInfo;

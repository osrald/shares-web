import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";

import TextBoxWithLabel from "../../components/InputBoxes/TextBoxWithLabel";
import { CfgTracks } from "../../components/LocalData/CfgTracks";
import { CfgStrandSpecs } from "../../components/LocalData/CfgStrandSpecs";
import StudentEntity from "../../components/LocalData/StudentEntity";
import StudentService from "../../services/StudentService";
import { SeniorHighEnrollPrintInfo } from "../../components/Print/SeniorHighEnrollPrintInfo";
import "../registration/SeniorHighRegInfo.css";
import ConfigService from "../../services/ConfigService";

/*Object destructuring*/
function SeniorHighEnrollmentInfo({ match }) {
  const componentRef = useRef();

  const [principal, setPrincipal] = useState("");
  const [principalLevel, setPrincipalLevel] = useState("");
  const [studentInfo, setStudentInfo] = useState(
    StudentEntity.initializeExtended()
  );
  const [afTrack, setAfTrack] = useState("");
  const [afStrandSpec, setAfStrandSpec] = useState("");

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

    ConfigService.getSharesConfigurationByTypeMajorMinor("CFG", "PRN").then(
      (response) => {
        if (response.data !== "") {
          setPrincipal(response.data.cfGeneral1);
        }
      }
    );

    ConfigService.getSharesConfigurationByTypeMajorMinor("CFG", "PRL").then(
      (response) => {
        if (response.data !== "") {
          setPrincipalLevel(response.data.cfGeneral1);
        }
      }
    );

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setAfTrack(
      CfgTracks.filter(
        (track) => track.id === studentInfo.shsTrackEnrolled.id
      ).map((track) => {
        return `${track.code} - ${track.name} - ${track.desc}`;
      })
    );

    setAfStrandSpec(
      CfgStrandSpecs.filter(
        (strndspec) => strndspec.id === studentInfo.shsStrSpecEnrolled.id
      ).map((strndspec) => {
        return `${strndspec.code} - ${strndspec.name} - ${strndspec.desc}`;
      })
    );
  }, [studentInfo]);

  return (
    <div className="info-container">
      <div className="info-content">
        <div className="info-form">
          <h3>
            {`Your LRN[${studentInfo.lrnNo}] has been enrolled for School Year:
            ${studentInfo.shsSy} - ${studentInfo.shsSem} Semester. This will be processed and validated
            by the school. Regularly visit this site to check your enrollment status.`}
          </h3>
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
                  Print Enrollment Form
                </button>
              )}
              content={() => componentRef.current}
            />
          </div>
          <div style={{ display: "none" }}>
            <SeniorHighEnrollPrintInfo
              principal={principal}
              principalLevel={principalLevel}
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
          <h1>2. Enrollment Info.</h1>
          <div className="form-inputs">
            <TextBoxWithLabel
              labelDisplay="Senior High School Track Applied For"
              readOnly={true}
              textValue={afTrack}
            />
          </div>
          <div className="form-inputs">
            <TextBoxWithLabel
              labelDisplay="Senior High School Strand/Specialization Applied For"
              readOnly={true}
              textValue={afStrandSpec}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeniorHighEnrollmentInfo;

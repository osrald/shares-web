import React from "react";
import "./SeniorHighRegPrintInfo.css";

export class SeniorHighRegPrintInfo extends React.Component {
  render() {
    const { studentInfo } = this.props;
    let mhsBw = require("../../logos/MHS-BW.png");
    return (
      <div>
        <div className="print-row">
          <div className="print-column-1">
            <h3>Guidance Copy</h3>
          </div>
          <div className="print-column-2">
            <img className="logo-mhs" src={mhsBw.default} alt="logo-bw" />
          </div>
          <div className="print-column-3">
            <h1>Makati High School</h1>
            <h2>Makati City</h2>
            <h3>{`S.Y.: ${studentInfo.shsSy}`}</h3>
          </div>
          <div className="print-column-4"></div>
          <div className="print-column-5"></div>
        </div>
        <div className="print-center">
          <h3>Senior High Automated Registration and Enrollment System</h3>
        </div>
        <br />
        <div className="regular-print">
          <div className="print-row">
            <div className="regular-print-left">
              Lastname: <b>{studentInfo.lastname}</b>
            </div>
            <div className="regular-print-center">
              Firstame: <b>{studentInfo.firstname}</b>
            </div>
            <div className="regular-print-right">
              Middlename: <b>{studentInfo.middlename}</b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-print-left">
              Gender: <b>{studentInfo.gender === "M" ? "Male" : "Female"}</b>
            </div>
            <div className="regular-print-center">
              Date of birth: <b>{studentInfo.dob}</b>
            </div>
            <div className="regular-print-right">
              Nationality: <b>{studentInfo.nationality}</b>
            </div>
          </div>
          <div>
            Place of birth: <b>{studentInfo.birthplace}</b>
          </div>
          <br />
          <div className="print-row">
            <div className="regular-2colprint-left">
              Elementary School: <b>{studentInfo.elemName}</b>
            </div>
            <div className="regular-2colprint-right">
              Year Graduated:{" "}
              <b>
                {studentInfo.elemCompMonth}-{studentInfo.elemCompYear}
              </b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-2colprint-left">
              Address: <b>{studentInfo.elemSchoolAddr}</b>
            </div>
            <div className="regular-2colprint-right">
              Region: <b>{studentInfo.elemRegion.name}</b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-2colprint-left">
              PEPT Passer:{" "}
              <b>{studentInfo.elemPeptPasser === "Y" ? "Yes" : "No"}</b>
            </div>
            <div className="regular-2colprint-right">
              Month Year Completed:{" "}
              <b>
                {studentInfo.elemPeptPasser === "Y"
                  ? `${studentInfo.elemPeptMonth}-${studentInfo.elemPeptYear}`
                  : "N/A"}
              </b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-2colprint-left">
              A & E Passer:{" "}
              <b>{studentInfo.elemAePasser === "Y" ? "Yes" : "No"}</b>
            </div>
            <div className="regular-2colprint-right">
              Month Year Completed:{" "}
              <b>
                {studentInfo.elemAePasser === "Y"
                  ? `${studentInfo.elemAeMonth}-${studentInfo.elemAeYear}`
                  : "N/A"}
              </b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-2colprint-left">
              Junior High School: <b>{studentInfo.jhsName}</b>
            </div>
            <div className="regular-2colprint-right">
              Year Graduated:{" "}
              <b>
                {studentInfo.jhsCompMonth}-{studentInfo.jhsCompYear}
              </b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-2colprint-left">
              Address: <b>{studentInfo.jhsAddr}</b>
            </div>
            <div className="regular-2colprint-right">
              Region: <b>{studentInfo.jhsRegion.name}</b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-2colprint-left">
              PEPT Passer:{" "}
              <b>{studentInfo.jhsPeptPasser === "Y" ? "Yes" : "No"}</b>
            </div>
            <div className="regular-2colprint-right">
              Month Year Completed:{" "}
              <b>
                {studentInfo.jhsPeptPasser === "Y"
                  ? `${studentInfo.jhsPeptMonth}-${studentInfo.jhsPeptYear}`
                  : "N/A"}
              </b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-2colprint-left">
              A & E Passer:{" "}
              <b>{studentInfo.jhsAePasser === "Y" ? "Yes" : "No"}</b>
            </div>
            <div className="regular-2colprint-right">
              Month Year Completed:{" "}
              <b>
                {studentInfo.jhsAePasser === "Y"
                  ? `${studentInfo.jhsAeMonth}-${studentInfo.jhsAeYear}`
                  : "N/A"}
              </b>
            </div>
          </div>
          <br />
          <div>
            <b>Senior High School(SHS) Applied For:</b>
          </div>
          <div>
            First Choice School:{" "}
            <b>
              {studentInfo.shsSchoolFirstChoice.id === 8
                ? studentInfo.shsSchoolFirstChoiceOthersNm
                : studentInfo.shsSchoolFirstChoice.name}
            </b>
          </div>
          <div className="print-row">
            <div className="regular-2colprint-left">
              First Choice Track: <b>{studentInfo.shsTrackFirstChoice.name}</b>
            </div>
            <div className="regular-2colprint-right">
              Strand/Specialization:{" "}
              <b>{studentInfo.shsStrSpecFirstChoice.name}</b>
            </div>
          </div>
          <div>
            Second Choice School:{" "}
            <b>
              {studentInfo.shsSchoolSecondChoice === null
                ? "None"
                : studentInfo.shsSchoolSecondChoice.id === 8
                ? studentInfo.shsSchoolSecondChoiceOthersNm
                : studentInfo.shsSchoolSecondChoice.name}
            </b>
          </div>
          <div className="print-row">
            <div className="regular-2colprint-left">
              Second Choice Track:{" "}
              <b>
                {studentInfo.shsTrackSecondChoice === null
                  ? "None"
                  : studentInfo.shsTrackSecondChoice.name}
              </b>
            </div>
            <div className="regular-2colprint-right">
              Strand/Specialization:{" "}
              <b>
                {studentInfo.shsStrSpecSecondChoice === null
                  ? "None"
                  : studentInfo.shsStrSpecSecondChoice.name}
              </b>
            </div>
          </div>
        </div>
        <br />
        <div className="footer-print">
          <div>
            <b>APPROVED</b>
          </div>
          <div className="footer-print-signatory">
            Signature over printed name - Guidance Councilor
          </div>
        </div>
        <div className="dashed-line" />
        <div className="print-row">
          <div className="print-column-1">
            <h3>Student's Copy</h3>
          </div>
          <div className="print-column-2">
            <img className="logo-mhs" src={mhsBw.default} alt="logo-bw" />
          </div>
          <div className="print-column-3">
            <h1>Makati High School</h1>
            <h2>Makati City</h2>
            <h3>{`S.Y.: ${studentInfo.shsSy}`}</h3>
          </div>
          <div className="print-column-4" />
          <div className="print-column-5" />
        </div>
        <div className="print-center">
          <h3>Senior High Automated Registration and Enrollment System</h3>
        </div>
        <br />
        <div className="regular-print">
          <div className="print-row">
            <div className="regular-print-left">
              Lastname: <b>{studentInfo.lastname}</b>
            </div>
            <div className="regular-print-center">
              Firstame: <b>{studentInfo.firstname}</b>
            </div>
            <div className="regular-print-right">
              Middlename: <b>{studentInfo.middlename}</b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-print-left">
              Gender: <b>{studentInfo.gender === "M" ? "Male" : "Female"}</b>
            </div>
            <div className="regular-print-center">
              Date of birth: <b>{studentInfo.dob}</b>
            </div>
            <div className="regular-print-right">
              Nationality: <b>{studentInfo.nationality}</b>
            </div>
          </div>
          <div>
            Place of birth: <b>{studentInfo.birthplace}</b>
          </div>
          <br />
          <div className="print-row">
            <div className="regular-2colprint-left">
              Elementary School: <b>{studentInfo.elemName}</b>
            </div>
            <div className="regular-2colprint-right">
              Year Graduated:{" "}
              <b>
                {studentInfo.elemCompMonth}-{studentInfo.elemCompYear}
              </b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-2colprint-left">
              Address: <b>{studentInfo.elemSchoolAddr}</b>
            </div>
            <div className="regular-2colprint-right">
              Region: <b>{studentInfo.elemRegion.name}</b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-2colprint-left">
              PEPT Passer:{" "}
              <b>{studentInfo.elemPeptPasser === "Y" ? "Yes" : "No"}</b>
            </div>
            <div className="regular-2colprint-right">
              Month Year Completed:{" "}
              <b>
                {studentInfo.elemPeptPasser === "Y"
                  ? `${studentInfo.elemPeptMonth}-${studentInfo.elemPeptYear}`
                  : "N/A"}
              </b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-2colprint-left">
              A & E Passer:{" "}
              <b>{studentInfo.elemAePasser === "Y" ? "Yes" : "No"}</b>
            </div>
            <div className="regular-2colprint-right">
              Month Year Completed:{" "}
              <b>
                {studentInfo.elemAePasser === "Y"
                  ? `${studentInfo.elemAeMonth}-${studentInfo.elemAeYear}`
                  : "N/A"}
              </b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-2colprint-left">
              Junior High School: <b>{studentInfo.jhsName}</b>
            </div>
            <div className="regular-2colprint-right">
              Year Graduated:{" "}
              <b>
                {studentInfo.jhsCompMonth}-{studentInfo.jhsCompYear}
              </b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-2colprint-left">
              Address: <b>{studentInfo.jhsAddr}</b>
            </div>
            <div className="regular-2colprint-right">
              Region: <b>{studentInfo.jhsRegion.name}</b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-2colprint-left">
              PEPT Passer:{" "}
              <b>{studentInfo.jhsPeptPasser === "Y" ? "Yes" : "No"}</b>
            </div>
            <div className="regular-2colprint-right">
              Month Year Completed:{" "}
              <b>
                {studentInfo.jhsPeptPasser === "Y"
                  ? `${studentInfo.jhsPeptMonth}-${studentInfo.jhsPeptYear}`
                  : "N/A"}
              </b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-2colprint-left">
              A & E Passer:{" "}
              <b>{studentInfo.jhsAePasser === "Y" ? "Yes" : "No"}</b>
            </div>
            <div className="regular-2colprint-right">
              Month Year Completed:{" "}
              <b>
                {studentInfo.jhsAePasser === "Y"
                  ? `${studentInfo.jhsAeMonth}-${studentInfo.jhsAeYear}`
                  : "N/A"}
              </b>
            </div>
          </div>
          <br />
          <div>
            <b>Senior High School(SHS) Applied For:</b>
          </div>
          <div>
            First Choice School:{" "}
            <b>
              {studentInfo.shsSchoolFirstChoice.id === 8
                ? studentInfo.shsSchoolFirstChoiceOthersNm
                : studentInfo.shsSchoolFirstChoice.name}
            </b>
          </div>
          <div className="print-row">
            <div className="regular-2colprint-left">
              First Choice Track: <b>{studentInfo.shsTrackFirstChoice.name}</b>
            </div>
            <div className="regular-2colprint-right">
              Strand/Specialization:{" "}
              <b>{studentInfo.shsStrSpecFirstChoice.name}</b>
            </div>
          </div>
          <div>
            Second Choice School:{" "}
            <b>
              {studentInfo.shsSchoolSecondChoice === null
                ? "None"
                : studentInfo.shsSchoolSecondChoice.id === 8
                ? studentInfo.shsSchoolSecondChoiceOthersNm
                : studentInfo.shsSchoolSecondChoice.name}
            </b>
          </div>
          <div className="print-row">
            <div className="regular-2colprint-left">
              Second Choice Track:{" "}
              <b>
                {studentInfo.shsTrackSecondChoice === null
                  ? "None"
                  : studentInfo.shsTrackSecondChoice.name}
              </b>
            </div>
            <div className="regular-2colprint-right">
              Strand/Specialization:{" "}
              <b>
                {studentInfo.shsStrSpecSecondChoice === null
                  ? "None"
                  : studentInfo.shsStrSpecSecondChoice.name}
              </b>
            </div>
          </div>
        </div>
        <br />
        <div className="footer-print">
          <div>
            <b>APPROVED</b>
          </div>
          <div className="footer-print-signatory">
            Signature over printed name - Guidance Councilor
          </div>
        </div>
      </div>
    );
  }
}

import React from "react";
import "./SeniorHighEnrollPrintInfo.css";

export class SeniorHighEnrollPrintInfo extends React.Component {
  render() {
    const { principal, principalLevel, studentInfo } = this.props;
    let mhsBw = require("../../logos/MHS-BW.png");
    return (
      <div>
        <div className="print-row">
          <div className="print-column-1">
            <h3>Guidance Copy</h3>
            <br />
            <h4>Date of Enrollment</h4>
            <h5>{studentInfo.shsDateEnrolled}</h5>
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
          <div className="print-column-5">
            <h3>Learner's Reference No.</h3>
            <h4>{studentInfo.lrnNo}</h4>
            <h3>Grade & Section</h3>
            <h4>
              {studentInfo.section === null
                ? "To Follow"
                : studentInfo.section.desc}
            </h4>
            <h3>Class Adviser</h3>
            <h4>
              {studentInfo.section === null
                ? "To Follow"
                : studentInfo.section.adviser.fullName}
            </h4>
          </div>
        </div>
        <div className="print-center">
          <h3>SHARES Enrollment Form</h3>
        </div>
        <div className="regular-print">
          <b>Name</b>
          <div className="print-row">
            <div className="regular-print-left">
              <b>{studentInfo.lastname}</b>
            </div>
            <div className="regular-print-center">
              <b>{studentInfo.firstname}</b>
            </div>
            <div className="regular-print-right">
              <b>{studentInfo.middlename}</b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-print-left">Lastname</div>
            <div className="regular-print-center">Firstame</div>
            <div className="regular-print-right">Middlename</div>
          </div>
          <div className="print-row">
            <div className="regular-4colprint-1">
              Date of birth: <b>{studentInfo.dob}</b>
            </div>
            <div className="regular-4colprint-2">
              Gender: <b>{studentInfo.gender === "M" ? "Male" : "Female"}</b>
            </div>
            <div className="regular-4colprint-3">
              Nationality: <b>{studentInfo.nationality}</b>
            </div>
            <div className="regular-4colprint-4">
              Religion: <b>{studentInfo.sdtStudentOtherInfo.religion}</b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-4colprint-1 text-align-center">
              <b>{studentInfo.addrHouseNo}</b>
            </div>
            <div className="regular-4colprint-2 text-align-center">
              <b>{studentInfo.addrStreet}</b>
            </div>
            <div className="regular-4colprint-3 text-align-center">
              <b>
                {studentInfo.addrMakatiResident === "Y"
                  ? studentInfo.addrMakatiResidentBarangay.name
                  : studentInfo.addrBarangay}
              </b>
            </div>
            <div className="regular-4colprint-4 text-align-center">
              <b>{studentInfo.addrCityMunicipality}</b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-4colprint-1 text-align-center">
              House No.
            </div>
            <div className="regular-4colprint-2 text-align-center">Street</div>
            <div className="regular-4colprint-3 text-align-center">
              Barangay
            </div>
            <div className="regular-4colprint-4 text-align-center">
              City/Municipality
            </div>
          </div>
          <div className="print-row">
            <div className="regular-3colprint-1">
              Father: <b>{studentInfo.sdtStudentOtherInfo.fathersName}</b>
            </div>
            <div className="regular-3colprint-2">
              Occupation:{" "}
              <b>{studentInfo.sdtStudentOtherInfo.fathersOccupation}</b>
            </div>
            <div className="regular-3colprint-3">
              Contact No:{" "}
              <b>{studentInfo.sdtStudentOtherInfo.fathersContactNo}</b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-3colprint-1">
              Mother: <b>{studentInfo.sdtStudentOtherInfo.mothersName}</b>
            </div>
            <div className="regular-3colprint-2">
              Occ.: <b>{studentInfo.sdtStudentOtherInfo.mothersOccupation}</b>
            </div>
            <div className="regular-3colprint-3">
              Contact No:{" "}
              <b>{studentInfo.sdtStudentOtherInfo.mothersContactNo}</b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-4colprint-1">
              Guardian: <b>{studentInfo.sdtStudentOtherInfo.guardianName}</b>
            </div>
            <div className="regular-4colprint-2">
              Relation:{" "}
              <b>{studentInfo.sdtStudentOtherInfo.guardianRelation}</b>
            </div>
            <div className="regular-4colprint-3">
              Occ.: <b>{studentInfo.sdtStudentOtherInfo.guardianOccupation}</b>
            </div>
            <div className="regular-4colprint-4">
              Contact No:{" "}
              <b>{studentInfo.sdtStudentOtherInfo.guardianContactNo}</b>
            </div>
          </div>
          <b>Last School Attended</b>
          <div className="print-row">
            <div className="regular-2colprint-left">
              Schoolname: <b>{studentInfo.lastSchoolAttended}</b>
            </div>
            <div className="regular-2colprint-right">
              School Address: <b>{studentInfo.lastSchoolAddress}</b>
            </div>
          </div>
          <div className="print-row">
            <div className="regularA-4colprint-1">
              S.Y.: <b>{studentInfo.lastSchoolSy}</b>
            </div>
            <div className="regularA-4colprint-2">
              Average: <b>{studentInfo.lastSchoolAverage}</b>
            </div>
            <div className="regularA-4colprint-3">
              Year & Section: <b>{studentInfo.lastSchoolYearSection}</b>
            </div>
            <div className="regularA-4colprint-4">
              Adviser: <b>{studentInfo.lastSchoolAdviser}</b>
            </div>
          </div>
          <b>Track/Strand Applied For</b>
          <div className="print-row">
            <div className="regular-2colprint-left">
              Track:{" "}
              <b>{`${studentInfo.shsTrackEnrolled.code}-${studentInfo.shsTrackEnrolled.name}`}</b>
            </div>
            <div className="regular-2colprint-right">
              Strand/Specialization:{" "}
              <b>{`${studentInfo.shsStrSpecEnrolled.code}-${studentInfo.shsStrSpecEnrolled.name}`}</b>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="print-row">
          <div className="footer-2colprint-left">
            <div className="footer-print-signatory">
              Signature over Printed Name of Student
            </div>
          </div>
          <div className="footer-2colprint-right">
            <div className="footer-print-signatory">
              Signature over Printed Name of Parent/Guardian
            </div>
          </div>
        </div>
        <div className="footer-approved">
          <b>APPROVED</b>
        </div>
        <br />
        <div className="print-row">
          <div className="footer-2colprint-left">
            <div className="footer-print-signatory">
              {`${principal} - ${principalLevel}`}
            </div>
          </div>
          <div className="footer-2colprint-right">
            <div className="footer-print-signatory">
              School Guidance Councilor
            </div>
          </div>
        </div>
        <div className="dashed-line" />
        <div className="print-row">
          <div className="print-column-1">
            <h3>Student's Copy</h3>
            <br />
            <h4>Date of Enrollment</h4>
            <h5>{studentInfo.shsDateEnrolled}</h5>
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
          <div className="print-column-5">
            <h3>Learner's Reference No.</h3>
            <h4>{studentInfo.lrnNo}</h4>
            <h3>Grade & Section</h3>
            <h4>
              {studentInfo.section === null
                ? "To Follow"
                : studentInfo.section.desc}
            </h4>
            <h3>Class Adviser</h3>
            <h4>
              {studentInfo.section === null
                ? "To Follow"
                : studentInfo.section.adviser.fullName}
            </h4>
          </div>
        </div>
        <div className="print-center">
          <h3>SHARES Enrollment Form</h3>
        </div>
        <div className="regular-print">
          <b>Name</b>
          <div className="print-row">
            <div className="regular-print-left">
              <b>{studentInfo.lastname}</b>
            </div>
            <div className="regular-print-center">
              <b>{studentInfo.firstname}</b>
            </div>
            <div className="regular-print-right">
              <b>{studentInfo.middlename}</b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-print-left">Lastname</div>
            <div className="regular-print-center">Firstame</div>
            <div className="regular-print-right">Middlename</div>
          </div>
          <div className="print-row">
            <div className="regular-4colprint-1">
              Date of birth: <b>{studentInfo.dob}</b>
            </div>
            <div className="regular-4colprint-2">
              Gender: <b>{studentInfo.gender === "M" ? "Male" : "Female"}</b>
            </div>
            <div className="regular-4colprint-3">
              Nationality: <b>{studentInfo.nationality}</b>
            </div>
            <div className="regular-4colprint-4">
              Religion: <b>{studentInfo.sdtStudentOtherInfo.religion}</b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-4colprint-1 text-align-center">
              <b>{studentInfo.addrHouseNo}</b>
            </div>
            <div className="regular-4colprint-2 text-align-center">
              <b>{studentInfo.addrStreet}</b>
            </div>
            <div className="regular-4colprint-3 text-align-center">
              <b>
                {studentInfo.addrMakatiResident === "Y"
                  ? studentInfo.addrMakatiResidentBarangay.name
                  : studentInfo.addrBarangay}
              </b>
            </div>
            <div className="regular-4colprint-4 text-align-center">
              <b>{studentInfo.addrCityMunicipality}</b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-4colprint-1 text-align-center">
              House No.
            </div>
            <div className="regular-4colprint-2 text-align-center">Street</div>
            <div className="regular-4colprint-3 text-align-center">
              Barangay
            </div>
            <div className="regular-4colprint-4 text-align-center">
              City/Municipality
            </div>
          </div>
          <div className="print-row">
            <div className="regular-3colprint-1">
              Father: <b>{studentInfo.sdtStudentOtherInfo.fathersName}</b>
            </div>
            <div className="regular-3colprint-2">
              Occupation:{" "}
              <b>{studentInfo.sdtStudentOtherInfo.fathersOccupation}</b>
            </div>
            <div className="regular-3colprint-3">
              Contact No:{" "}
              <b>{studentInfo.sdtStudentOtherInfo.fathersContactNo}</b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-3colprint-1">
              Mother: <b>{studentInfo.sdtStudentOtherInfo.mothersName}</b>
            </div>
            <div className="regular-3colprint-2">
              Occ.: <b>{studentInfo.sdtStudentOtherInfo.mothersOccupation}</b>
            </div>
            <div className="regular-3colprint-3">
              Contact No:{" "}
              <b>{studentInfo.sdtStudentOtherInfo.mothersContactNo}</b>
            </div>
          </div>
          <div className="print-row">
            <div className="regular-4colprint-1">
              Guardian: <b>{studentInfo.sdtStudentOtherInfo.guardianName}</b>
            </div>
            <div className="regular-4colprint-2">
              Relation:{" "}
              <b>{studentInfo.sdtStudentOtherInfo.guardianRelation}</b>
            </div>
            <div className="regular-4colprint-3">
              Occ.: <b>{studentInfo.sdtStudentOtherInfo.guardianOccupation}</b>
            </div>
            <div className="regular-4colprint-4">
              Contact No:{" "}
              <b>{studentInfo.sdtStudentOtherInfo.guardianContactNo}</b>
            </div>
          </div>
          <b>Last School Attended</b>
          <div className="print-row">
            <div className="regular-2colprint-left">
              Schoolname: <b>{studentInfo.lastSchoolAttended}</b>
            </div>
            <div className="regular-2colprint-right">
              School Address: <b>{studentInfo.lastSchoolAddress}</b>
            </div>
          </div>
          <div className="print-row">
            <div className="regularA-4colprint-1">
              S.Y.: <b>{studentInfo.lastSchoolSy}</b>
            </div>
            <div className="regularA-4colprint-2">
              Average: <b>{studentInfo.lastSchoolAverage}</b>
            </div>
            <div className="regularA-4colprint-3">
              Year & Section: <b>{studentInfo.lastSchoolYearSection}</b>
            </div>
            <div className="regularA-4colprint-4">
              Adviser: <b>{studentInfo.lastSchoolAdviser}</b>
            </div>
          </div>
          <b>Track/Strand Applied For</b>
          <div className="print-row">
            <div className="regular-2colprint-left">
              Track:{" "}
              <b>{`${studentInfo.shsTrackEnrolled.code}-${studentInfo.shsTrackEnrolled.name}`}</b>
            </div>
            <div className="regular-2colprint-right">
              Strand/Specialization:{" "}
              <b>{`${studentInfo.shsStrSpecEnrolled.code}-${studentInfo.shsStrSpecEnrolled.name}`}</b>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="print-row">
          <div className="footer-2colprint-left">
            <div className="footer-print-signatory">
              Signature over Printed Name of Student
            </div>
          </div>
          <div className="footer-2colprint-right">
            <div className="footer-print-signatory">
              Signature over Printed Name of Parent/Guardian
            </div>
          </div>
        </div>
        <div className="footer-approved">
          <b>APPROVED</b>
        </div>
        <br />
        <div className="print-row">
          <div className="footer-2colprint-left">
            <div className="footer-print-signatory">
              {`${principal} - ${principalLevel}`}
            </div>
          </div>
          <div className="footer-2colprint-right">
            <div className="footer-print-signatory">
              School Guidance Councilor
            </div>
          </div>
        </div>
      </div>
    );
  }
}

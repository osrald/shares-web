import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import TextBoxWithLabel from "../../components/InputBoxes/TextBoxWithLabel";
import StudentGender from "../../components/RadioButtons/StudentGender";
import GuardianRelations from "../../components/Dropdowns/GuardianRelations";
import ElemPeptPasser from "../../components/RadioButtons/ElemPeptPasser";
import ElemAePasser from "../../components/RadioButtons/ElemAePasser";
import JhsAePasser from "../../components/RadioButtons/JhsAePasser";
import JhsPeptPasser from "../../components/RadioButtons/JhsPeptPasser";
import ShsAppliedTrack from "../../components/Dropdowns/ShsAppliedTrack";
import BarangaysDropdown from "../../components/Dropdowns/BarangaysDropdown";
import MakatiResident from "../../components/RadioButtons/MakatiResident";
import Validate from "./SeniorHighEnrollmentValidator";
import ValidateLRNEnrollment from "../../components/Modals/ValidateLRNEnrollment";
import { LrnStatus } from "../../components/Enums/LrnStatus";
import { CfgStatuses } from "../../components/LocalData/CfgStatuses";
import StudentService from "../../services/StudentService";

import StudentEntity from "../../components/LocalData/StudentEntity";

import "../registration/SeniorHighRegForm.css";
import Confirm from "../../components/Modals/Confirm";

function SeniorHighEnrollment(props) {
  const [lrnStat, setLrnStat] = useState(LrnStatus.NotSet);
  const [studentLRN, setStudentLRN] = useState("");
  const [displayValidateLrnEnrollModal, setDisplayValidateLrnEnrollModal] =
    useState(true);
  const [forProcessing, setForProcessing] = useState(false);

  const [studentEntity, setStudentEntity] = useState(
    StudentEntity.initializeExtended()
  );
  const [errors, setErrors] = useState({});

  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const [userConfirmed, setUserConfirmed] = useState(false);

  const HandleClickEnroll = (e) => {
    e.preventDefault();

    if (forProcessing) {
      if (lrnStat === LrnStatus.InSystemCurrentlyRegistered) {
        setErrors(Validate(studentEntity));
        setStudentEntity({
          ...studentEntity,
          status: CfgStatuses.find((status) => status.code === "CEN"),
          shsSem: props.configCurrentSem,
          shsDateEnrolled: props.configEnrollDate,
        });
      }
    } else setDisplayValidateLrnEnrollModal(true);
  };

  useEffect(() => {
    if (studentLRN !== "") {
      if (lrnStat === LrnStatus.InSystemCurrentlyRegistered) {
        StudentService.getStudentByLRN(studentLRN).then((response) => {
          if (response.data !== "") {
            setStudentEntity(
              StudentEntity.prepareEnrollmentEntity(response.data)
            );
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentLRN]);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && forProcessing && !userConfirmed) {
      setDisplayConfirmation(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  useEffect(() => {
    if (userConfirmed) {
      if (lrnStat === LrnStatus.InSystemCurrentlyRegistered) {
        StudentService.enrollStudent(studentEntity).then((response) => {
          window.location.href = `/enrollmentinfo/${response.data.id}`;
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userConfirmed]);

  return (
    <div className="form-container">
      <div className="form-content">
        <Confirm
          header="For Enrollment"
          message={`This will enroll the indicated student for school year: ${props.configSchoolYear} - ${props.configCurrentSem} Semester, please confirm.`}
          displayConfirmation={displayConfirmation}
          setDisplayConfirmation={setDisplayConfirmation}
          setUserConfirmed={setUserConfirmed}
        />
        <ValidateLRNEnrollment
          configSchoolYear={props.configSchoolYear}
          configCurrentSem={props.configCurrentSem}
          setStudentLRN={setStudentLRN}
          displayValidateLrnEnrollModal={displayValidateLrnEnrollModal}
          setDisplayValidateLrnEnrollModal={setDisplayValidateLrnEnrollModal}
          forProcessing={forProcessing}
          setForProcessing={setForProcessing}
          lrnStat={lrnStat}
          setLrnStat={setLrnStat}
        />
        <div className="tab-margin">
          <div className="form-inputs">
            <button className="button" onClick={HandleClickEnroll}>
              {studentLRN === "" ? "Validate your LRN" : "Enroll"}
            </button>
            {"  "}
            <button className="button hidden">Print Enrollment Form</button>
            {"  "}
            {Object.keys(errors).length > 0 && (
              <label className="form-label">
                *** Please check the required entries below for both student and
                school information
              </label>
            )}
          </div>
          <Tabs>
            <TabList>
              <Tab>
                <h3>Student Information</h3>
              </Tab>
              <Tab>
                <h3>School Information</h3>
              </Tab>
            </TabList>
            <TabPanel>
              <div className="form-panel">
                <h1>1. Enrollment</h1>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="lrnNo"
                    nameLabel="lrnNo"
                    labelDisplay="Learner's Reference Number"
                    inputPlaceHolder="Click or Tap the 'Validate your LRN' button above"
                    textValue={studentEntity.lrnNo}
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={true}
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="shsDateEnrolled"
                    nameLabel="shsDateEnrolled"
                    labelDisplay="Date of Enrollment"
                    inputPlaceHolder="This will indicate your enrollment date. This is a read-only field input is not necessary"
                    textValue={studentEntity.shsDateEnrolled}
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={true}
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="shsSy"
                    nameLabel="shsSy"
                    labelDisplay="School Year"
                    inputPlaceHolder="Enter school year"
                    textValue={studentEntity.shsSy}
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={true}
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="shsGradeSection"
                    nameLabel="shsGradeSection"
                    labelDisplay="Grade & Section"
                    inputPlaceHolder="This will indicate your grade and section once enrollment process is complete. This is a read-only field, input is not necessary"
                    textValue={studentEntity.shsGradeSection}
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={true}
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="shsExamResult"
                    nameLabel="shsExamResult"
                    labelDisplay="Exam Result"
                    inputPlaceHolder="This will show your exam result (if applicable). This is a read-only field, input is not necessary"
                    textValue={studentEntity.shsExamResult}
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={true}
                  />
                </div>
                <h1>2. Name of Student</h1>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="lastname"
                    nameLabel="lastname"
                    labelDisplay="Lastname"
                    inputPlaceHolder=""
                    textValue={studentEntity.lastname}
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={true}
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="firstname"
                    nameLabel="firstname"
                    labelDisplay="Firstname"
                    inputPlaceHolder=""
                    textValue={studentEntity.firstname}
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={true}
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="middlename"
                    nameLabel="middlename"
                    labelDisplay="Middlename"
                    inputPlaceHolder=""
                    textValue={studentEntity.middlename}
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={true}
                  />
                </div>
                <h1>3. Gender</h1>
                <StudentGender
                  studentEntity={studentEntity}
                  setStudentEntity={setStudentEntity}
                  errorDisplay={errors.gender && errors.gender}
                  disabled={true}
                />
                <h1>4. Other Information</h1>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="dob"
                    nameLabel="dob"
                    labelDisplay="Date of Birth"
                    inputPlaceHolder="Enter your date of birth"
                    textValue={studentEntity.dob}
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={true}
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="pob"
                    nameLabel="pob"
                    labelDisplay="Place of Birth"
                    inputPlaceHolder="Enter your place of birth"
                    textValue={studentEntity.birthplace}
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={true}
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="sdtStudentOtherInfo.religion"
                    nameLabel="sdtStudentOtherInfo.religion"
                    labelDisplay="Religion"
                    inputPlaceHolder="Enter your religion"
                    textValue={
                      studentEntity.sdtStudentOtherInfo &&
                      studentEntity.sdtStudentOtherInfo.religion
                    }
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={false}
                    errorDisplay={errors.religion && errors.religion}
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="sdtStudentOtherInfo.dialectSpoken"
                    nameLabel="sdtStudentOtherInfo.dialectSpoken"
                    labelDisplay="Dialect"
                    inputPlaceHolder="Enter your dialect"
                    textValue={
                      studentEntity.sdtStudentOtherInfo &&
                      studentEntity.sdtStudentOtherInfo.dialectSpoken
                    }
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={false}
                    errorDisplay={errors.dialectSpoken && errors.dialectSpoken}
                  />
                </div>
                <h1>5. Address</h1>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="addrHouseNo"
                    nameLabel="addrHouseNo"
                    labelDisplay="House No."
                    inputPlaceHolder="Enter your house number"
                    textValue={studentEntity.addrHouseNo}
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={false}
                    errorDisplay={errors.addrHouseNo && errors.addrHouseNo}
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="addrStreet"
                    nameLabel="addrStreet"
                    labelDisplay="Street"
                    inputPlaceHolder="Enter your street"
                    textValue={studentEntity.addrStreet}
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={false}
                    errorDisplay={errors.addrStreet && errors.addrStreet}
                  />
                </div>
                <MakatiResident
                  studentEntity={studentEntity}
                  setStudentEntity={setStudentEntity}
                  errorDisplay={
                    errors.addrMakatiResident && errors.addrMakatiResident
                  }
                />
                <div
                  className={`form-inputs ${
                    studentEntity.addrMakatiResident !== "Y" && "hidden"
                  }`}
                >
                  <BarangaysDropdown
                    name="makatibarangays"
                    className="form-dropdown"
                    regionField="addrMakatiResidentBarangay"
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    disabled={false}
                    errorDisplay={
                      errors.addrMakatiResidentBarangay &&
                      errors.addrMakatiResidentBarangay
                    }
                  />
                </div>
                <div
                  className={`form-inputs ${
                    studentEntity.addrMakatiResident === "Y" && "hidden"
                  }`}
                >
                  <TextBoxWithLabel
                    inputId="addrBarangay"
                    nameLabel="addrBarangay"
                    labelDisplay="Barangay"
                    inputPlaceHolder="Enter your barangay"
                    textValue={studentEntity.addrBarangay}
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={false}
                    errorDisplay={errors.addrBarangay && errors.addrBarangay}
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="addrCityMunicipality"
                    nameLabel="addrCityMunicipality"
                    labelDisplay="City/Municipality"
                    inputPlaceHolder="Enter your city/municipality"
                    textValue={studentEntity.addrCityMunicipality}
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={studentEntity.addrMakatiResident === "Y"}
                    errorDisplay={
                      errors.addrCityMunicipality && errors.addrCityMunicipality
                    }
                  />
                </div>
                <h1>6. Supplemental Information</h1>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="sdtStudentOtherInfo.fathersName"
                    nameLabel="sdtStudentOtherInfo.fathersName"
                    labelDisplay="Name of Father"
                    inputPlaceHolder="Enter your father's name"
                    textValue={
                      studentEntity.sdtStudentOtherInfo &&
                      studentEntity.sdtStudentOtherInfo.fathersName
                    }
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={false}
                    errorDisplay={errors.fathersName && errors.fathersName}
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="sdtStudentOtherInfo.fathersOccupation"
                    nameLabel="sdtStudentOtherInfo.fathersOccupation"
                    labelDisplay="Father's Occupation"
                    inputPlaceHolder="Enter your father's occupation"
                    textValue={
                      studentEntity.sdtStudentOtherInfo &&
                      studentEntity.sdtStudentOtherInfo.fathersOccupation
                    }
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={false}
                    errorDisplay={
                      errors.fathersOccupation && errors.fathersOccupation
                    }
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="sdtStudentOtherInfo.fathersContactNo"
                    nameLabel="sdtStudentOtherInfo.fathersContactNo"
                    labelDisplay="Father's contact number"
                    inputPlaceHolder="Enter your father's contact number"
                    textValue={
                      studentEntity.sdtStudentOtherInfo &&
                      studentEntity.sdtStudentOtherInfo.fathersContactNo
                    }
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={false}
                    errorDisplay={
                      errors.fathersContactNo && errors.fathersContactNo
                    }
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="sdtStudentOtherInfo.mothersName"
                    nameLabel="sdtStudentOtherInfo.mothersName"
                    labelDisplay="Name of Mother"
                    inputPlaceHolder="Enter your mother's name"
                    textValue={
                      studentEntity.sdtStudentOtherInfo &&
                      studentEntity.sdtStudentOtherInfo.mothersName
                    }
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={false}
                    errorDisplay={errors.mothersName && errors.mothersName}
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="sdtStudentOtherInfo.mothersOccupation"
                    nameLabel="sdtStudentOtherInfo.mothersOccupation"
                    labelDisplay="Mother's Occupation"
                    inputPlaceHolder="Enter your mother's occupation"
                    textValue={
                      studentEntity.sdtStudentOtherInfo &&
                      studentEntity.sdtStudentOtherInfo.mothersOccupation
                    }
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={false}
                    errorDisplay={
                      errors.mothersOccupation && errors.mothersOccupation
                    }
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="sdtStudentOtherInfo.mothersContactNo"
                    nameLabel="sdtStudentOtherInfo.mothersContactNo"
                    labelDisplay="Mother's contact number"
                    inputPlaceHolder="Enter your mother's contact number"
                    textValue={
                      studentEntity.sdtStudentOtherInfo &&
                      studentEntity.sdtStudentOtherInfo.mothersContactNo
                    }
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={false}
                    errorDisplay={
                      errors.mothersContactNo && errors.mothersContactNo
                    }
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="sdtStudentOtherInfo.guardianName"
                    nameLabel="sdtStudentOtherInfo.guardianName"
                    labelDisplay="Name of Guardian"
                    inputPlaceHolder="Enter your guardian's name"
                    textValue={
                      studentEntity.sdtStudentOtherInfo &&
                      studentEntity.sdtStudentOtherInfo.guardianName
                    }
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={false}
                    errorDisplay={errors.guardianName && errors.guardianName}
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="sdtStudentOtherInfo.guardianOccupation"
                    nameLabel="sdtStudentOtherInfo.guardianOccupation"
                    labelDisplay="Guardian's Occupation"
                    inputPlaceHolder="Enter your guardian's occupation"
                    textValue={
                      studentEntity.sdtStudentOtherInfo &&
                      studentEntity.sdtStudentOtherInfo.guardianOccupation
                    }
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={false}
                    errorDisplay={
                      errors.guardianOccupation && errors.guardianOccupation
                    }
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="sdtStudentOtherInfo.guardianContactNo"
                    nameLabel="sdtStudentOtherInfo.guardianContactNo"
                    labelDisplay="Guardian's contact number"
                    inputPlaceHolder="Enter your guardian's contact number"
                    textValue={
                      studentEntity.sdtStudentOtherInfo &&
                      studentEntity.sdtStudentOtherInfo.guardianContactNo
                    }
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={false}
                    errorDisplay={
                      errors.guardianContactNo && errors.guardianContactNo
                    }
                  />
                </div>
                <div className="form-inputs">
                  <GuardianRelations
                    name="guardianrelation"
                    className="form-dropdown"
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    errorDisplay={
                      errors.guardianRelation && errors.guardianRelation
                    }
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="sdtStudentOtherInfo.guardianAddress"
                    nameLabel="sdtStudentOtherInfo.guardianAddress"
                    labelDisplay="Guardian's address"
                    inputPlaceHolder="Enter your guardian's address"
                    textValue={
                      studentEntity.sdtStudentOtherInfo &&
                      studentEntity.sdtStudentOtherInfo.guardianAddress
                    }
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={false}
                    errorDisplay={
                      errors.guardianAddress && errors.guardianAddress
                    }
                  />
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="form-panel">
                <h1>1. Last School Attended</h1>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="lastSchoolAttended"
                    nameLabel="lastSchoolAttended"
                    labelDisplay="Name of Last School Attended"
                    inputPlaceHolder="Enter name of last school attended"
                    textValue={studentEntity.lastSchoolAttended}
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={false}
                    errorDisplay={
                      errors.lastSchoolAttended && errors.lastSchoolAttended
                    }
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="lastSchoolAddress"
                    nameLabel="lastSchoolAddress"
                    labelDisplay="Address of Last School Attended"
                    inputPlaceHolder="Enter address of last school attended"
                    textValue={studentEntity.lastSchoolAddress}
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={false}
                    errorDisplay={
                      errors.lastSchoolAddress && errors.lastSchoolAddress
                    }
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="lastSchoolAverage"
                    nameLabel="lastSchoolAverage"
                    labelDisplay="School Average Grade"
                    inputPlaceHolder="Enter your last school average grade"
                    textValue={studentEntity.lastSchoolAverage}
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={false}
                    errorDisplay={
                      errors.lastSchoolAverage && errors.lastSchoolAverage
                    }
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="lastSchoolYearSection"
                    nameLabel="lastSchoolYearSection"
                    labelDisplay="Former Year & Section"
                    inputPlaceHolder="Enter former year and section"
                    textValue={studentEntity.lastSchoolYearSection}
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={false}
                    errorDisplay={
                      errors.lastSchoolYearSection &&
                      errors.lastSchoolYearSection
                    }
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="lastSchoolAdviser"
                    nameLabel="lastSchoolAdviser"
                    labelDisplay="Former Adviser"
                    inputPlaceHolder="Enter your previous school adviser"
                    textValue={studentEntity.lastSchoolAdviser}
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={false}
                    errorDisplay={
                      errors.lastSchoolAdviser && errors.lastSchoolAdviser
                    }
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="lastSchoolSy"
                    nameLabel="lastSchoolSy"
                    labelDisplay="Former School Year"
                    inputPlaceHolder="Enter your previous school year"
                    textValue={studentEntity.lastSchoolSy}
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={false}
                    errorDisplay={errors.lastSchoolSy && errors.lastSchoolSy}
                  />
                </div>
                <h1>2. Elementary School</h1>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="elemschoolname"
                    nameLabel="elemschoolname"
                    labelDisplay="Elementary School Name"
                    inputPlaceHolder="Enter your elementary school name"
                    textValue={studentEntity.elemName}
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={true}
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="elemschoolyeargraduated"
                    nameLabel="elemschoolyeargraduated"
                    labelDisplay="Elementary School Year Graduated"
                    inputPlaceHolder="Enter your elementary school year graduated"
                    textValue={`${studentEntity.elemCompMonth} ${studentEntity.elemCompYear}`}
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={true}
                  />
                </div>
                <div className="form-inputs">
                  <ElemPeptPasser
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    disabled={true}
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="peptelemmonthyear"
                    nameLabel="peptelemmonthyear"
                    labelDisplay="Elementary PEPT Month/Year Taken"
                    inputPlaceHolder="Enter elementary PEPT month/year taken"
                    textValue={
                      studentEntity.elemPeptPasser === "N" ||
                      studentEntity.elemPeptPasser === ""
                        ? "N/A"
                        : `${studentEntity.elemPeptMonth} ${studentEntity.elemPeptYear}`
                    }
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={true}
                  />
                </div>
                <div className="form-inputs">
                  <ElemAePasser
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    disabled={true}
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="aeelemmonthyear"
                    nameLabel="aeelemmonthyear"
                    labelDisplay="Elementary A & E Month/Year Taken"
                    inputPlaceHolder="Enter your elementary A & E month/year taken"
                    textValue={
                      studentEntity.elemPeptPasser === "N" ||
                      studentEntity.elemPeptPasser === ""
                        ? "N/A"
                        : `${studentEntity.elemAeMonth} ${studentEntity.elemAeYear}`
                    }
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={true}
                  />
                </div>
                <h1>3. Junior High School</h1>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="jhsschoolname"
                    nameLabel="jhsschoolname"
                    labelDisplay="Junior High School Name"
                    inputPlaceHolder="Enter your junior high school name"
                    textValue={studentEntity.jhsName}
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={true}
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="jhsschoolyeargraduated"
                    nameLabel="jhsschoolyeargraduated"
                    labelDisplay="Junior High School Year Graduated"
                    inputPlaceHolder="Enter your junior high school year graduated"
                    textValue={`${studentEntity.jhsCompMonth} ${studentEntity.jhsCompYear}`}
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={true}
                  />
                </div>
                <div className="form-inputs">
                  <JhsPeptPasser
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    disabled={true}
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="peptjhsmonthyear"
                    nameLabel="peptjhsmonthyear"
                    labelDisplay="Junior High School PEPT Month/Year Taken"
                    inputPlaceHolder="Enter junior high school PEPT month/year taken"
                    textValue={
                      studentEntity.jhsPeptPasser === "N" ||
                      studentEntity.jhsPeptPasser === ""
                        ? "N/A"
                        : `${studentEntity.jhsPeptMonth} ${studentEntity.jhsPeptYear}`
                    }
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={true}
                  />
                </div>
                <div className="form-inputs">
                  <JhsAePasser
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    disabled={true}
                  />
                </div>
                <div className="form-inputs">
                  <TextBoxWithLabel
                    inputId="aejhsmontyear"
                    nameLabel="aejhsmontyear"
                    labelDisplay="Junior High School AE Month/Year Taken"
                    inputPlaceHolder="Enter your junior high school PEPT month/year taken"
                    textValue={
                      studentEntity.jhsAePasser === "N" ||
                      studentEntity.jhsAePasser === ""
                        ? "N/A"
                        : `${studentEntity.jhsAeMonth} ${studentEntity.jhsAeYear}`
                    }
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    readOnly={true}
                  />
                </div>
                <h1>4. Senior High School Applied For</h1>
                <div className="form-inputs">
                  <ShsAppliedTrack
                    trackField="shsTrackEnrolled"
                    strandSpecField="shsStrSpecEnrolled"
                    studentEntity={studentEntity}
                    setStudentEntity={setStudentEntity}
                    errorDisplay={
                      errors.shsTrackEnrolled && errors.shsTrackEnrolled
                    }
                  />
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default SeniorHighEnrollment;

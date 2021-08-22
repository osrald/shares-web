import React, { useEffect, useState } from "react";

import TextBoxWithLabel from "../../components/InputBoxes/TextBoxWithLabel";

import DobDate from "../../components/Dropdowns/DobDate";

import StudentGender from "../../components/RadioButtons/StudentGender";
import ElemPeptPasser from "../../components/RadioButtons/ElemPeptPasser";
import ElemAePasser from "../../components/RadioButtons/ElemAePasser";
import JhsPeptPasser from "../../components/RadioButtons/JhsPeptPasser";
import JhsAePasser from "../../components/RadioButtons/JhsAePasser";

import ElemCompletionMonYr from "../../components/Dropdowns/ElemCompletionMonYr";
import ElemPeptMonYr from "../../components/Dropdowns/ElemPeptMonYr";
import ElemAeMonYr from "../../components/Dropdowns/ElemAeMonYr";
import JhsCompletionMonYr from "../../components/Dropdowns/JhsCompletionMonYr";
import JhsPeptMonYr from "../../components/Dropdowns/JhsPeptMonYr";
import JhsAeMonYr from "../../components/Dropdowns/JhsAeMonYr";
import RegionsDropdown from "../../components/Dropdowns/RegionsDropdown";
import TrackDisplay from "../../components/Dropdowns/TrackDisplay";
import ValidateLRN from "../../components/Modals/ValidateLRN";
import StudentService from "../../services/StudentService";
import Validate from "./SeniorHighRegFormValidator";
import Confirm from "../../components/Modals/Confirm";
import StudentEntity from "../../components/LocalData/StudentEntity";
import { LrnStatus } from "../../components/Enums/LrnStatus";
import { CfgStatuses } from "../../components/LocalData/CfgStatuses";

import "./SeniorHighRegForm.css";

const SeniorHighRegForm = (props) => {
  const [lrnStat, setLrnStat] = useState(LrnStatus.NotSet);
  const [studentLRN, setStudentLRN] = useState("");
  const [displayValidateLrnModal, setDisplayValidateLrnModal] = useState(true);
  const [forProcessing, setForProcessing] = useState(false);
  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const [userConfirmed, setUserConfirmed] = useState(false);
  const [studentEntity, setStudentEntity] = useState(StudentEntity.intialize());

  const [dobMM, setDobMM] = useState("");
  const [dobDD, setDobDD] = useState("");
  const [dobYY, setDobYY] = useState("");

  const [errors, setErrors] = useState({});

  const ValidateRegisterHandler = (e) => {
    e.preventDefault();

    if (forProcessing) {
      if (
        lrnStat === LrnStatus.InSystemNotRegisteredCurrently ||
        lrnStat === LrnStatus.ValidButNotInSystem
      ) {
        setErrors(Validate(studentEntity));
        setStudentEntity({
          ...studentEntity,
          lrnNo: studentLRN,
          status: CfgStatuses.find((status) => status.code === "REG"),
          registrationDate: props.configRegDate,
          shsSy: props.configSchoolYear,
          elemPeptMonth:
            studentEntity.elemPeptPasser === "N"
              ? null
              : studentEntity.elemPeptMonth,
          elemPeptYear:
            studentEntity.elemPeptPasser === "N"
              ? null
              : studentEntity.elemPeptYear,
          elemAeMonth:
            studentEntity.elemAePasser === "N"
              ? null
              : studentEntity.elemAeMonth,
          elemAeYear:
            studentEntity.elemAePasser === "N"
              ? null
              : studentEntity.elemAeYear,
          jhsPeptMonth:
            studentEntity.jhsPeptPasser === "N"
              ? null
              : studentEntity.jhsPeptMonth,
          jhsPeptYear:
            studentEntity.jhsPeptPasser === "N"
              ? null
              : studentEntity.jhsPeptYear,
          jhsAeMonth:
            studentEntity.jhsAePasser === "N" ? null : studentEntity.jhsAeMonth,
          jhsAeYear:
            studentEntity.jhsAePasser === "N" ? null : studentEntity.jhsAeYear,
          sdtStudentOtherInfo: null,
        });
      }
    } else setDisplayValidateLrnModal(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && forProcessing && !userConfirmed) {
      setDisplayConfirmation(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  useEffect(() => {
    if (userConfirmed) {
      if (lrnStat === LrnStatus.ValidButNotInSystem) {
        try {
          StudentService.registerNewStudent(studentEntity).then((response) => {
            window.location.href = `/registrationinfo/${response.data.id}`;
          });
        } catch (error) {
          console.log(error.response.data);
        }
      } else if (lrnStat === LrnStatus.InSystemNotRegisteredCurrently) {
        StudentService.registerExistingStudent(studentEntity).then(
          (response) => {
            window.location.href = `/registrationinfo/${response.data.id}`;
          }
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userConfirmed]);

  useEffect(() => {
    if (studentLRN !== "") {
      if (lrnStat === LrnStatus.InSystemNotRegisteredCurrently) {
        StudentService.getStudentByLRN(studentLRN).then((response) => {
          if (response.data !== "") {
            setStudentEntity(response.data);

            const dobl = response.data.dob;
            setDobYY(dobl.slice(0, 4));
            setDobMM(dobl.slice(5, 7));
            setDobDD(dobl.slice(8, 10));
          }
        });
      } else if (lrnStat === LrnStatus.ValidButNotInSystem) {
        setStudentEntity(StudentEntity.intialize());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentLRN]);

  return (
    <div className="form-container">
      <div className="form-content">
        <Confirm
          header="For Registration"
          message={`This will register the indicated student for school year: ${props.configSchoolYear}, please confirm.`}
          displayConfirmation={displayConfirmation}
          setDisplayConfirmation={setDisplayConfirmation}
          setUserConfirmed={setUserConfirmed}
        />
        <ValidateLRN
          configSchoolYear={props.configSchoolYear}
          configCurrentSem={props.configCurrentSem}
          setStudentLRN={setStudentLRN}
          displayValidateLrnModal={displayValidateLrnModal}
          setDisplayValidateLrnModal={setDisplayValidateLrnModal}
          forProcessing={forProcessing}
          setForProcessing={setForProcessing}
          lrnStat={lrnStat}
          setLrnStat={setLrnStat}
        />
        <form className="form">
          <div className="form-inputs">
            <button className="button" onClick={ValidateRegisterHandler}>
              {studentLRN === "" ? "Validate your LRN" : "Register"}
            </button>
          </div>
          <h1>1. Name of Student</h1>
          <div className="form-inputs">
            <TextBoxWithLabel
              inputId="lastname"
              nameLabel="lastname"
              labelDisplay="Lastname"
              inputPlaceHolder="Enter your Lastname"
              textValue={studentEntity.lastname}
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              errorDisplay={errors.lastname && errors.lastname}
              readOnly={lrnStat === LrnStatus.InSystemNotRegisteredCurrently}
            />
          </div>
          <div className="form-inputs">
            <TextBoxWithLabel
              inputId="firstname"
              nameLabel="firstname"
              labelDisplay="Firstname"
              inputPlaceHolder="Enter your Firstname"
              textValue={studentEntity.firstname}
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              readOnly={lrnStat === LrnStatus.InSystemNotRegisteredCurrently}
              errorDisplay={errors.firstname && errors.firstname}
            />
          </div>
          <div className="form-inputs">
            <TextBoxWithLabel
              inputId="middlename"
              nameLabel="middlename"
              labelDisplay="Middlename"
              inputPlaceHolder="Enter your Middlename"
              textValue={studentEntity.middlename}
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              readOnly={lrnStat === LrnStatus.InSystemNotRegisteredCurrently}
            />
          </div>
          <h1>2. Gender</h1>
          <StudentGender
            studentEntity={studentEntity}
            setStudentEntity={setStudentEntity}
            errorDisplay={errors.gender && errors.gender}
            disabled={lrnStat === LrnStatus.InSystemNotRegisteredCurrently}
          />
          <h1>3. Date of birth</h1>
          <DobDate
            dobMM={dobMM}
            setDobMM={setDobMM}
            dobDD={dobDD}
            setDobDD={setDobDD}
            dobYY={dobYY}
            setDobYY={setDobYY}
            studentEntity={studentEntity}
            setStudentEntity={setStudentEntity}
            disabled={lrnStat === LrnStatus.InSystemNotRegisteredCurrently}
            errorDisplay={errors.dob && errors.dob}
          />
          <h1>4. Place of birth</h1>{" "}
          <div className="form-inputs">
            <TextBoxWithLabel
              inputId="birthplace"
              nameLabel="birthplace"
              labelDisplay="City / Municipality"
              inputPlaceHolder="Enter your place of birth"
              textValue={studentEntity.birthplace}
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              readOnly={lrnStat === LrnStatus.InSystemNotRegisteredCurrently}
              errorDisplay={errors.birthplace && errors.birthplace}
            />
          </div>
          <h1>5. Nationality</h1>
          <div className="form-inputs">
            <TextBoxWithLabel
              inputId="nationality"
              nameLabel="nationality"
              labelDisplay="Filipino / Korean / Malaysian / Thai / Chinese etc..."
              inputPlaceHolder="Enter your nationality"
              textValue={studentEntity.nationality}
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              readOnly={lrnStat === LrnStatus.InSystemNotRegisteredCurrently}
              errorDisplay={errors.nationality && errors.nationality}
            />
          </div>
          <h1>6. Learner's Identification Number</h1>
          <div className="form-inputs">
            <input
              id="lrn"
              type="text"
              name="lrn"
              className="form-input"
              placeholder="Click or Tap the 'Validate your LRN' button above"
              readOnly
              value={studentLRN}
            />
          </div>
          <h1>7. Elementary School</h1>
          <div className="form-inputs">
            <TextBoxWithLabel
              inputId="elemName"
              nameLabel="elemName"
              labelDisplay="School Name"
              inputPlaceHolder="[Do not abbreviate] - Enter your elementary school name"
              textValue={studentEntity.elemName}
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              readOnly={lrnStat === LrnStatus.InSystemNotRegisteredCurrently}
              errorDisplay={errors.elemName && errors.elemName}
            />
          </div>
          <div className="form-inputs">
            <TextBoxWithLabel
              inputId="elemSchoolAddr"
              nameLabel="elemSchoolAddr"
              labelDisplay="School Address"
              inputPlaceHolder="Enter your elementary school address (city/town or province)"
              textValue={studentEntity.elemSchoolAddr}
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              readOnly={lrnStat === LrnStatus.InSystemNotRegisteredCurrently}
              errorDisplay={errors.elemSchoolAddr && errors.elemSchoolAddr}
            />
          </div>
          <div className="form-inputs">
            <ElemCompletionMonYr
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              disabled={lrnStat === LrnStatus.InSystemNotRegisteredCurrently}
              errorDisplay={
                errors.elemCompMonthYear && errors.elemCompMonthYear
              }
            />
          </div>
          <div className="form-inputs">
            <RegionsDropdown
              name="ECregion"
              className="form-dropdown"
              regionField="elemRegion"
              selectedRegionValue={studentEntity.elemRegion.code}
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              disabled={lrnStat === LrnStatus.InSystemNotRegisteredCurrently}
              errorDisplay={errors.elemRegion && errors.elemRegion}
            />
          </div>
          <div className="form-inputs">
            <ElemPeptPasser
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              disabled={lrnStat === LrnStatus.InSystemNotRegisteredCurrently}
              errorDisplay={errors.elemPeptPasser && errors.elemPeptPasser}
            />
          </div>
          <div className="form-inputs">
            <ElemPeptMonYr
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              disabled={lrnStat === LrnStatus.InSystemNotRegisteredCurrently}
              errorDisplay={
                errors.elemPeptMonthYear && errors.elemPeptMonthYear
              }
            />
          </div>
          <div className="form-inputs">
            <ElemAePasser
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              disabled={lrnStat === LrnStatus.InSystemNotRegisteredCurrently}
              errorDisplay={errors.elemAePasser && errors.elemAePasser}
            />
          </div>
          <div className="form-inputs">
            <ElemAeMonYr
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              disabled={lrnStat === LrnStatus.InSystemNotRegisteredCurrently}
              errorDisplay={errors.elemAeMonthYear && errors.elemAeMonthYear}
            />
          </div>
          <h1>8. Junior High School</h1>
          <div className="form-inputs">
            <TextBoxWithLabel
              inputId="jhsName"
              nameLabel="jhsName"
              labelDisplay="School Name"
              inputPlaceHolder="[Do not abbreviate] - Enter your junior high school name"
              textValue={studentEntity.jhsName}
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              readOnly={lrnStat === LrnStatus.InSystemNotRegisteredCurrently}
              errorDisplay={errors.jhsName && errors.jhsName}
            />
          </div>
          <div className="form-inputs">
            <TextBoxWithLabel
              inputId="jhsAddr"
              nameLabel="jhsAddr"
              labelDisplay="School Address"
              inputPlaceHolder="Enter your junior high school address (city/town or province)"
              textValue={studentEntity.jhsAddr}
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              readOnly={lrnStat === LrnStatus.InSystemNotRegisteredCurrently}
              errorDisplay={errors.jhsAddr && errors.jhsAddr}
            />
          </div>
          <div className="form-inputs">
            <JhsCompletionMonYr
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              disabled={lrnStat === LrnStatus.InSystemNotRegisteredCurrently}
              errorDisplay={errors.jhsCompMonthYear && errors.jhsCompMonthYear}
            />
          </div>
          <div className="form-inputs">
            <RegionsDropdown
              name="JHSregion"
              className="form-dropdown"
              regionField="jhsRegion"
              selectedRegionValue={studentEntity.jhsRegion.code}
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              disabled={lrnStat === LrnStatus.InSystemNotRegisteredCurrently}
              errorDisplay={errors.jhsRegion && errors.jhsRegion}
            />
          </div>
          <div className="form-inputs">
            <JhsPeptPasser
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              disabled={lrnStat === LrnStatus.InSystemNotRegisteredCurrently}
              errorDisplay={errors.jhsPeptPasser && errors.jhsPeptPasser}
            />
          </div>
          <div className="form-inputs">
            <JhsPeptMonYr
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              disabled={lrnStat === LrnStatus.InSystemNotRegisteredCurrently}
              errorDisplay={errors.jhsPeptMonthYear && errors.jhsPeptMonthYear}
            />
          </div>
          <div className="form-inputs">
            <JhsAePasser
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              disabled={lrnStat === LrnStatus.InSystemNotRegisteredCurrently}
              errorDisplay={errors.jhsAePasser && errors.jhsAePasser}
            />
          </div>
          <div className="form-inputs">
            <JhsAeMonYr
              studentEntity={studentEntity}
              setStudentEntity={setStudentEntity}
              disabled={lrnStat === LrnStatus.InSystemNotRegisteredCurrently}
              errorDisplay={errors.jhsAeMonthYear && errors.jhsAeMonthYear}
            />
          </div>
          <div className="form-inputs">
            <h1>9. Senior High School applied for</h1>
            <div className="form-inputs">
              <label className="form-label">First Choice</label>
              <br />
              <TrackDisplay
                displayIsFirstChoice="true"
                schoolField="shsSchoolFirstChoice"
                trackField="shsTrackFirstChoice"
                strandSpecField="shsStrSpecFirstChoice"
                schoolChoiceOthersNmField="shsSchoolFirstchoiceOthersNm"
                schoolChoiceOthersAddrField="shsSchoolFirstchoiceOthersAddr"
                selectedSchool={studentEntity.shsSchoolFirstChoice}
                selectedTrack={studentEntity.shsTrackFirstChoice}
                selectedStrandSpec={studentEntity.shsStrSpecFirstChoice}
                schoolChoiceOthersNm={
                  studentEntity.shsSchoolFirstChoiceOthersNm
                }
                schoolChoiceOthersAddr={
                  studentEntity.shsSchoolFirstChoiceOthersAddr
                }
                studentEntity={studentEntity}
                setStudentEntity={setStudentEntity}
                disabled={lrnStat === LrnStatus.InSystemNotRegisteredCurrently}
                errorDisplay={
                  errors.firstChoiceTrack && errors.firstChoiceTrack
                }
              />
            </div>

            <div className="form-inputs">
              <label className="form-label">Second Choice</label>
              <br />
              <TrackDisplay
                displayIsFirstChoice="false"
                schoolField="shsSchoolSecondChoice"
                trackField="shsTrackSecondChoice"
                strandSpecField="shsStrSpecSecondChoice"
                schoolChoiceOthersNmField="shsSchoolSecondchoiceOthersNm"
                schoolChoiceOthersAddrField="shsSchoolSecondchoiceOthersAddr"
                selectedSchool={studentEntity.shsSchoolSecondChoice}
                selectedTrack={studentEntity.shsTrackSecondChoice}
                selectedStrandSpec={studentEntity.shsStrSpecSecondChoice}
                schoolChoiceOthersNm={
                  studentEntity.shsSchoolSecondChoiceOthersNm
                }
                schoolChoiceOthersAddr={
                  studentEntity.shsSchoolSecondChoiceOthersAddr
                }
                studentEntity={studentEntity}
                setStudentEntity={setStudentEntity}
                disabled={lrnStat === LrnStatus.InSystemNotRegisteredCurrently}
                errorDisplay={
                  errors.secondChoiceTrack && errors.secondChoiceTrack
                }
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SeniorHighRegForm;

import React, { useEffect, useState } from "react";
import SchoolYearsAndSemesters from "../../components/Dropdowns/SchoolYearsAndSemesters";
import TextBoxWithLabel from "../../components/InputBoxes/TextBoxWithLabel";
import ConfigEntity from "../../components/LocalData/ConfigEntity";
import Confirm from "../../components/Modals/Confirm";
import ConfigService from "../../services/ConfigService";

import "./Configuration.css";
import ConfigurationValidator from "./ConfigurationValidator";

function Configuration() {
  const [schoolYear, setSchoolYear] = useState("");
  const [currentSem, setCurrentSem] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [regDate, setRegDate] = useState("");
  const [enrollDate, setEnrollDate] = useState("");
  const [principal, setPrincipal] = useState("");
  const [principalLevel, setPrincipalLevel] = useState("");

  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const [userConfirmed, setUserConfirmed] = useState(false);
  const [settingsChanged, setSettingsChanged] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    ConfigService.getSharesConfiguration().then((response) => {
      if (response.data !== null) {
        const configs = response.data;
        configs.forEach((config) => {
          switch (config.cfMinor) {
            case "CSY":
              setSchoolYear(config.cfGeneral1);
              break;
            case "SME":
              setCurrentSem(config.cfGeneral1);
              break;
            case "SCN":
              setSchoolName(config.cfGeneral1);
              break;
            case "SAR":
              setSchoolAddress(config.cfGeneral1);
              break;
            case "DOR":
              setRegDate(config.cfGeneral1);
              break;
            case "DOE":
              setEnrollDate(config.cfGeneral1);
              break;
            case "PRN":
              setPrincipal(config.cfGeneral1);
              break;
            case "PRL":
              setPrincipalLevel(config.cfGeneral1);
              break;
            default:
          }
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && !userConfirmed && settingsChanged) {
      setDisplayConfirmation(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, settingsChanged]);

  useEffect(() => {
    if (userConfirmed && settingsChanged && Object.keys(errors).length === 0) {
      const csy = ConfigEntity.intialize();
      csy.cfMajor = "CFG";
      csy.cfMinor = "CSY";
      csy.cfGeneral1 = schoolYear;
      ConfigService.updateConfiguration(csy).then((response) => {});

      const sme = ConfigEntity.intialize();
      sme.cfMajor = "CFG";
      sme.cfMinor = "SME";
      sme.cfGeneral1 = currentSem;
      ConfigService.updateConfiguration(sme).then((response) => {});

      const scn = ConfigEntity.intialize();
      scn.cfMajor = "CFG";
      scn.cfMinor = "SCN";
      scn.cfGeneral1 = schoolName;
      ConfigService.updateConfiguration(scn).then((response) => {});

      const sar = ConfigEntity.intialize();
      sar.cfMajor = "CFG";
      sar.cfMinor = "SAR";
      sar.cfGeneral1 = schoolYear;
      ConfigService.updateConfiguration(sar).then((response) => {});

      const dor = ConfigEntity.intialize();
      dor.cfMajor = "CFG";
      dor.cfMinor = "DOR";
      dor.cfGeneral1 = regDate;
      ConfigService.updateConfiguration(dor).then((response) => {});

      const doe = ConfigEntity.intialize();
      doe.cfMajor = "CFG";
      doe.cfMinor = "DOE";
      doe.cfGeneral1 = enrollDate;
      ConfigService.updateConfiguration(doe).then((response) => {});

      const prn = ConfigEntity.intialize();
      prn.cfMajor = "CFG";
      prn.cfMinor = "PRN";
      prn.cfGeneral1 = principal;
      ConfigService.updateConfiguration(prn).then((response) => {});

      const prl = ConfigEntity.intialize();
      prl.cfMajor = "CFG";
      prl.cfMinor = "PRL";
      prl.cfGeneral1 = principalLevel;
      ConfigService.updateConfiguration(prl).then((response) => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userConfirmed]);

  const handleOnClickUpdate = (e) => {
    e.preventDefault();

    setSettingsChanged(true);

    setErrors(
      ConfigurationValidator(
        schoolYear,
        currentSem,
        schoolName,
        schoolAddress,
        regDate,
        enrollDate,
        principal,
        principalLevel
      )
    );
  };

  const handleSection = (e) => {
    e.preventDefault();
    window.location.href = "/configSection";
  };

  const handleAssignStudentsToSection = (e) => {
    e.preventDefault();
    window.location.href = "/configAssignStudentsToSections";
  };

  const onHandleUpdateUsers = (e) => {
    e.preventDefault();
  };

  return (
    <div className="form-container config">
      <Confirm
        header="Configuration"
        message={`Changing the settings will affect the system-wide behavior, please confirm.`}
        displayConfirmation={displayConfirmation}
        setDisplayConfirmation={setDisplayConfirmation}
        setUserConfirmed={setUserConfirmed}
      />
      <div className="list-content">
        <div className="list-row">
          <div className="list-column-1">
            <h2>Settings</h2>
            <div className="form-inputs-config">
              <SchoolYearsAndSemesters
                selectedValue1={schoolYear}
                setSelectedValue1={setSchoolYear}
                errorDisplay1={errors.schoolYear && errors.schoolYear}
                selectedValue2={currentSem}
                setSelectedValue2={setCurrentSem}
                errorDisplay2={errors.currentSem && errors.currentSem}
              />
            </div>
            <div className="form-inputs-config">
              <TextBoxWithLabel
                inputId="schoolName"
                nameLabel="schoolName"
                labelDisplay="Name of School"
                inputPlaceHolder="Enter name of school"
                textValue={schoolName}
                setTextValue={setSchoolName}
                errorDisplay={errors.schoolName && errors.schoolName}
              />
            </div>
            <div className="form-inputs-config">
              <TextBoxWithLabel
                inputId="schoolAddress"
                nameLabel="schoolAddress"
                labelDisplay="School Address"
                inputPlaceHolder="Enter address of school"
                textValue={schoolAddress}
                setTextValue={setSchoolAddress}
                errorDisplay={errors.schoolAddress && errors.schoolAddress}
              />
            </div>
            <div className="form-inputs-config">
              <TextBoxWithLabel
                inputId="regDate"
                nameLabel="regDate"
                labelDisplay="Date of Registration"
                inputPlaceHolder="Enter registration date (yyyy-mm-dd)"
                textValue={regDate}
                setTextValue={setRegDate}
                errorDisplay={errors.regDate && errors.regDate}
              />
            </div>
            <div className="form-inputs-config">
              <TextBoxWithLabel
                inputId="enrollDate"
                nameLabel="enrollDate"
                labelDisplay="Date of Enrollment"
                inputPlaceHolder="Enter enrollment date (yyyy-mm-dd)"
                textValue={enrollDate}
                setTextValue={setEnrollDate}
                errorDisplay={errors.enrollDate && errors.enrollDate}
              />
            </div>
            <div className="form-inputs-config">
              <TextBoxWithLabel
                inputId="principal"
                nameLabel="principal"
                labelDisplay="Principal"
                inputPlaceHolder="Enter name of principal"
                textValue={principal}
                setTextValue={setPrincipal}
                errorDisplay={errors.principal && errors.principal}
              />
            </div>
            <div className="form-inputs-config">
              <TextBoxWithLabel
                inputId="principalLevel"
                nameLabel="principalLevel"
                labelDisplay="Principal Level"
                inputPlaceHolder="Enter name of principal level"
                textValue={principalLevel}
                setTextValue={setPrincipalLevel}
                errorDisplay={errors.principalLevel && errors.principalLevel}
              />
            </div>
            <div className="form-inputs-config">
              <button
                className="userdets-btn-add-update"
                onClick={handleOnClickUpdate}
              >
                <i className="fas fa-save"> Update</i>
              </button>
            </div>
          </div>
          <div className="list-column-2">
            <h2>Enrollment</h2>
            <div className="btn-container">
              <button className="btn-config" onClick={handleSection}>
                <i className="fas fa-users"> Grade and Sections</i>
              </button>
            </div>
            <div
              className="btn-container"
              onClick={handleAssignStudentsToSection}
            >
              <button className="btn-config">
                <i className="fas fa-layer-group">
                  {" "}
                  Assign Students to Sections
                </i>
              </button>
            </div>
            <h2>Sys Users</h2>
            <div className="btn-container">
              <button
                className="btn-config"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/userdetail/-1";
                }}
              >
                <i className="fas fa-user-plus"> Add New User</i>
              </button>
            </div>
            <div
              className="btn-container"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/users";
              }}
            >
              <button className="btn-config" onClick={onHandleUpdateUsers}>
                <i className="fas fa-users-cog"> Update Users</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Configuration;

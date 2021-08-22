import React, { useEffect, useState } from "react";
import StudentService from "../../services/StudentService";
import { LrnStatus } from "../Enums/LrnStatus";
import "./ValidateLRN.css";

const ValidateLRNEnrollment = ({
  configSchoolYear,
  setStudentLRN,
  displayValidateLrnEnrollModal,
  setDisplayValidateLrnEnrollModal,
  forProcessing,
  setForProcessing,
  lrnStat,
  setLrnStat,
}) => {
  const [validationLRN, setValidationLRN] = useState("");
  const [btnProcess, setBtnProcess] = useState("Validate");
  const [btnCancel, setBtnCancel] = useState("Cancel");
  const [valMsg, setValMsg] = useState("Learner's Reference Number:");
  const [shouldShake, setShouldShake] = useState(false);

  useEffect(() => {
    if (displayValidateLrnEnrollModal) {
      if (btnProcess === "Validate") {
        switch (lrnStat) {
          case LrnStatus.NotSet:
            setValMsg("LRN is empty. Please enter LRN.");
            break;
          case LrnStatus.Invalid:
            setValMsg("Your LRN is not valid. Please enter another LRN.");
            break;
          case LrnStatus.InSystemCurrentlyRegistered:
            setValMsg(
              `Your LRN was already registered for school year ${configSchoolYear}. Do you wish to enroll this LRN for this school year?`
            );
            setBtnProcess("Proceed");
            setForProcessing(true);
            setShouldShake(true);
            break;
          case LrnStatus.CurrentlyEnrolled:
            window.location.href = `/enrollmentinfo/${validationLRN}`;
            /*setValMsg(
              `Your LRN is currently enrolled for school year ${configSchoolYear}. Please enter another LRN.`
            );*/
            break;
          case LrnStatus.InSystemNotRegisteredCurrently:
            setValMsg(
              `Your LRN seems to be in the system where it has been previously registered, please register it first for school year ${configSchoolYear}`
            );
            break;
          case LrnStatus.Graduated:
            setValMsg("Student already graduated. Please enter another LRN.");
            break;
          case LrnStatus.Transferred:
            setValMsg("Student already transferred. Please enter another LRN.");
            break;
          case LrnStatus.KickedOut:
            setValMsg("Student was kicked-out. Please enter another LRN.");
            break;
          case LrnStatus.Dropout:
            setValMsg("Student is a dropout. Please enter another LRN.");
            break;
          case LrnStatus.ValidButNotInSystem:
            setValMsg(
              `Your LRN is not yet in the system, you need to register this LRN for school year ${configSchoolYear}`
            );
            break;
          default:
            setValMsg(
              "We cannot determine your LRN. Please enter another LRN."
            );
            break;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    configSchoolYear,
    displayValidateLrnEnrollModal,
    lrnStat,
    btnProcess,
    setForProcessing,
  ]);

  useEffect(() => {
    if (shouldShake) {
      setInterval(() => {
        setShouldShake(false);
      }, 1000);
    }
  }, [shouldShake]);

  const setModalToInitialState = () => {
    setValMsg("Learner's Reference Number:");
    setForProcessing(false);
    setBtnProcess("Validate");
    setBtnCancel("Cancel");
    setLrnStat(LrnStatus.NotSet);
  };

  const setStudentLRNHandler = (e) => {
    e.preventDefault();

    setShouldShake(true);

    if (forProcessing) {
      if (btnProcess === "Proceed") {
        //Close the modal and begin the enrollment entry
        setStudentLRN(validationLRN);
        setDisplayValidateLrnEnrollModal(false);
      } else if (btnProcess === "Yes") {
        //User is canceling the enrollment. Set the modal to initial state
        setStudentLRN("");
        setValidationLRN("");
        setModalToInitialState();
      }
    } else {
      if (btnProcess === "Yes") {
        //Close the modal, the user doesn't want to enroll
        setStudentLRN("");
        setDisplayValidateLrnEnrollModal(false);
        setModalToInitialState();
      } else ValidateLrn();
    }
  };

  const closeXbuttonHandler = () => {
    setStudentLRN("");
    setValidationLRN("");
    setDisplayValidateLrnEnrollModal(false);
    setModalToInitialState();
  };

  const cancelButtonHandler = () => {
    if (forProcessing) {
      if (btnCancel === "Cancel") {
        setValMsg("Do you want to cancel this LRN entry?");
        setBtnProcess("Yes");
        setBtnCancel("No");
      } else if (btnCancel === "No") {
        setValMsg(
          `Do you wish to register this LRN for school year ${configSchoolYear}?`
        );
        setBtnProcess("Proceed");
        setBtnCancel("Cancel");
      }
    } else {
      if (btnCancel === "Cancel") {
        setValMsg("This will exit the registration?");
        setBtnProcess("Yes");
        setBtnCancel("No");
      } else if (btnCancel === "No") {
        setModalToInitialState();
      }
    }
  };

  const onInputHandler = (e) => {
    //TODO: bug when non-numeric is inserted in between. Also the 12 digit limit
    const temp = e.target.value;
    const tmpLastChar = temp.substr(temp.length - 1);
    if (isNaN(tmpLastChar)) {
      setValidationLRN(temp.substring(0, temp.length - 1));
    } else {
      setValidationLRN(temp);
    }
  };

  const ValidateLrn = () => {
    if (validationLRN === "") {
      setLrnStat(LrnStatus.NotSet);
    } else {
      if (validationLRN.length > 12 || validationLRN.length < 12)
        setLrnStat(LrnStatus.Invalid);
      else {
        StudentService.getStudentStatusFromShares(validationLRN).then(
          (response) => {
            switch (response.data) {
              case "NR":
                setLrnStat(LrnStatus.InSystemNotRegisteredCurrently);
                break;
              case "AR":
                setLrnStat(LrnStatus.InSystemCurrentlyRegistered);
                break;
              case "DE":
                setLrnStat(LrnStatus.ValidButNotInSystem);
                break;
              case "CE":
                //handle already enrolled
                setLrnStat(LrnStatus.CurrentlyEnrolled);
                break;
              case "GR":
                //handle already graduated
                setLrnStat(LrnStatus.Graduated);
                break;
              case "TR":
                //handle transferred students
                setLrnStat(LrnStatus.Transferred);
                break;
              case "KO":
                //handle kicked-outs
                setLrnStat(LrnStatus.KickedOut);
                break;
              case "DR":
                //handle dropouts
                setLrnStat(LrnStatus.Dropout);
                break;
              default:
                //Handle undefined here (UD)
                setLrnStat(LrnStatus.Undeterminable);
            }
          }
        );
      }
    }
  };

  return (
    <div
      id="simpleModal"
      className={displayValidateLrnEnrollModal ? "modal" : "hidden"}
    >
      <div className="modal-content">
        <div className="modal-header">
          <span onClick={closeXbuttonHandler} className="closeBtn">
            &times;
          </span>
          <h2>LRN</h2>
        </div>
        <div className="modal-body">
          <label
            htmlFor="mdlLRN"
            className={`modal-label-input ${
              shouldShake ? "animated shake" : ""
            }`}
          >
            {valMsg}
          </label>
          <input
            type="text"
            name="mdlLRN"
            className={
              lrnStat === LrnStatus.InSystemCurrentlyRegistered
                ? "modal-input-ok"
                : "modal-input-error"
            }
            placeholder="Learner's Reference Number"
            value={validationLRN}
            disabled={forProcessing}
            onInput={onInputHandler}
          />
          <div className="text-align-center">
            <button
              onClick={setStudentLRNHandler}
              className="modal-body-ok-button"
            >
              {btnProcess}
            </button>
            <button className="cancel-button" onClick={cancelButtonHandler}>
              {btnCancel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidateLRNEnrollment;

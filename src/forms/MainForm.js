import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import Home from "../components/About/Home";
import ConfigService from "../services/ConfigService";
import SeniorHighRegForm from "./registration/SeniorHighRegForm";
import SeniorHighRegFormInfo from "./registration/SeniorHighRegFormInfo";
import Login from "./administration/Login";
import Logout from "./administration/Logout";
import SeniorHighEnrollment from "./enrollment/SeniorHighEnrollment";
import Configuration from "./administration/Configuration";
import Users from "./administration/Users";
import Update from "./administration/Update";
import UserDetails from "./administration/UserDetails";
import SeniorHighEnrollmentInfo from "./enrollment/SeniorHighEnrollmentInfo";
import ConfigAssignStudentsToSection from "./administration/ConfigAssignStudentsToSection";
import ConfigSection from "./administration/ConfigSection";
import ConfigSectionDetails from "./administration/ConfigSectionDetails";
import ConfigAssignStudentToSectionDetails from "./administration/ConfigAssignStudentToSectionDetails";
import ConfigSectionStudents from "./administration/ConfigSectionStudents";

import "./registration/SeniorHighRegForm.css";
import StudentRegistryReport from "../reports/StudentRegistryReport";

const MainForm = () => {
  const [configCurrentSem, setConfigCurrentSem] = useState("Nnn");
  const [configSchoolYear, setConfigSchoolYear] = useState("yyyy-yyyy");
  const [configRegDate, setConfigRegDate] = useState("yyyy-mm-dd");
  const [configEnrollDate, setConfigEnrollDate] = useState("yyyy-mm-dd");

  useEffect(() => {
    ConfigService.getSharesConfiguration()
      .then((response) => {
        if (response.data !== "") {
          console.log(process.env.NODE_ENV);
          console.log(response);
          const configs = response.data;
          configs.forEach((config) => {
            switch (config.cfMinor) {
              case "CSY":
                setConfigSchoolYear(config.cfGeneral1);
                break;
              case "SME":
                setConfigCurrentSem(config.cfGeneral1);
                break;
              case "DOR":
                setConfigRegDate(config.cfGeneral1);
                break;
              case "DOE":
                setConfigEnrollDate(config.cfGeneral1);
                break;
              default:
            }
          });
        }
      })
      .catch((err) => {
        console.log("Exception Below:");
        console.log(err);
      });
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Logout} />
      <Route path="/registrationinfo/:id" component={SeniorHighRegFormInfo} />
      <Route
        exact
        path="/register"
        render={() => (
          <SeniorHighRegForm
            configSchoolYear={configSchoolYear}
            configCurrentSem={configCurrentSem}
            configRegDate={configRegDate}
          />
        )}
      />
      <Route path="/enrollmentinfo/:id" component={SeniorHighEnrollmentInfo} />
      <Route
        exact
        path="/enroll"
        render={() => (
          <SeniorHighEnrollment
            configSchoolYear={configSchoolYear}
            configCurrentSem={configCurrentSem}
            configEnrollDate={configEnrollDate}
          />
        )}
      />

      <ProtectedRoute exact path="/users" component={Users} />
      <ProtectedRoute path="/userdetail/:id" component={UserDetails} />
      <ProtectedRoute exact path="/update" component={Update} />
      <ProtectedRoute exact path="/configuration" component={Configuration} />
      <ProtectedRoute exact path="/configSection" component={ConfigSection} />
      <ProtectedRoute
        path="/configSectionDetail/:id"
        component={ConfigSectionDetails}
      />
      <ProtectedRoute
        exact
        path="/configAssignStudentsToSections"
        component={ConfigAssignStudentsToSection}
      />
      <ProtectedRoute
        exact
        path="/configAssignStudentToSectionDetails/:id"
        component={ConfigAssignStudentToSectionDetails}
      />
      <ProtectedRoute
        exact
        path="/configSectionStudents/:id"
        component={ConfigSectionStudents}
      />
      <ProtectedRoute
        exact
        path="/studentRegistryReport"
        component={StudentRegistryReport}
      />
    </Switch>
  );
};

export default MainForm;

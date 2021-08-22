import React from "react";

import "./Home.css";

function Home() {
  let umak = require("../../logos/Umak.png");
  let mhs = require("../../logos/MHS.png");
  let umakCCAPS = require("../../logos/UmakCCAPS.png");
  let javaOracle = require("../../logos/JavaOracle.png");
  let springBoot = require("../../logos/SpringBoot.png");
  let reactJs = require("../../logos/React.png");
  let mySql = require("../../logos/MySql.png");

  return (
    <div className="home-container">
      <div className="home-content">
        <br />
        <h2>
          DEVELOPMENT OF S.H.A.R.E.S.: SENIOR HIGH AUTOMATED REGISTRATION AND
          ENROLLMENT SYSTEM
        </h2>
        <br />
        <h3>
          <i>A Dissertation</i>
        </h3>
        <br />
        <h3>
          Presented to the Faculty of the <i>Graduate Programs</i> College of
          Continuing, Advanced and Professional Studies University of Makati
        </h3>
        <h3>
          In Partial Fulfillment of the Requirements for the Degree{" "}
          <i>DOCTOR OF EDUCATION MAJOR IN INNOVATIVE EDUCATIONAL MANAGEMENT</i>
        </h3>
        <h3>by</h3>
        <h3>SHARON GAYE C. LAPUT</h3>
        <h4>Copyright © July 2020</h4>
        <br />
        <h3>ABSTRACT</h3>
        <p>
          The study SHARES: Senior High Automated Registration and Enrollment
          System is an online application which will act as an alternative tool
          to improve student registration and enrollment in Makati High School
          (MHS) specifically for Grade 10, 11 and 12 students. Its advantage
          towards the existing and the manual student’s registration and
          enrollment system is that it is portable, reliable and more
          specialized for Makati High School’s Guidance Office. The developed
          registration and enrollment system can be utilized thru cloud
          technology. SHARES: Senior High Automated Registration and Enrollment
          System is composed of four major modules or accounts namely: 1) School
          Administrators that will administer users, maintain configurations,
          and students’ information; 2) Students that will register and enroll
          new and old senior high students their personal and school information
          as well as corresponding subjects; 3) Report Generation that will
          allow students to print registration forms using their Learners
          Reference Number, and administrators to print updated students’
          record; 4) Database Management for the students that can add, delete,
          search and edit the information of the students regarding to their
          record. SHARES was built using various technologies including the
          latest version of JAVA, React JS, Springboot, MySQL. The developed
          study was tested and was evaluated by School Administrators and
          selected students using ISO 9126 and gathered reviews mostly with an
          “Excellent” remark.
        </p>
        <p>
          <i>
            KEYWORDS: Senior High Automated Registration and Enrollment System,
            MHS, Guidance Office, Students’ Record, Database Management
          </i>
        </p>
        <div className="home-div">
          <img src={mhs.default} alt="logo" />
          <img src={umakCCAPS.default} alt="logo" />
          <img src={umak.default} alt="logo" />
        </div>
        <div className="home-div">
          <img src={javaOracle.default} alt="logo" />
          <img src={mySql.default} alt="logo" />
        </div>
        <div className="home-div">
          <img src={springBoot.default} alt="logo" />
          <img src={reactJs.default} alt="logo" />
        </div>
      </div>
    </div>
  );
}

export default Home;

export default function SeniorHighEnrollmentValidator(studentEntity) {
  let violations = {};

  if (studentEntity.sdtStudentOtherInfo === null) {
    violations.religion = "This entry is required";
    violations.dialectSpoken = "This entry is required";
    violations.fathersName = "This entry is required";
    violations.fathersOccupation = "This entry is required";
    violations.fathersContactNo = "This entry is required";
    violations.mothersName = "This entry is required";
    violations.mothersOccupation = "This entry is required";
    violations.mothersContactNo = "This entry is required";
    violations.guardianName = "This entry is required";
    violations.guardianRelation = "This entry is required";
    violations.guardianOccupation = "This entry is required";
    violations.guardianContactNo = "This entry is required";
    violations.guardianAddress = "This entry is required";
  } else {
    if (!studentEntity.sdtStudentOtherInfo.religion.trim()) {
      violations.religion = "This entry is required";
    }

    if (!studentEntity.sdtStudentOtherInfo.dialectSpoken.trim()) {
      violations.dialectSpoken = "This entry is required";
    }

    if (!studentEntity.sdtStudentOtherInfo.fathersName.trim()) {
      violations.fathersName = "This entry is required";
    }

    if (!studentEntity.sdtStudentOtherInfo.fathersOccupation.trim()) {
      violations.fathersOccupation = "This entry is required";
    }

    if (!studentEntity.sdtStudentOtherInfo.fathersContactNo.trim()) {
      violations.fathersContactNo = "This entry is required";
    }

    if (!studentEntity.sdtStudentOtherInfo.mothersName.trim()) {
      violations.mothersName = "This entry is required";
    }

    if (!studentEntity.sdtStudentOtherInfo.mothersOccupation.trim()) {
      violations.mothersOccupation = "This entry is required";
    }

    if (!studentEntity.sdtStudentOtherInfo.mothersContactNo.trim()) {
      violations.mothersContactNo = "This entry is required";
    }

    if (!studentEntity.sdtStudentOtherInfo.guardianName.trim()) {
      violations.guardianName = "This entry is required";
    }

    if (!studentEntity.sdtStudentOtherInfo.guardianRelation.trim()) {
      violations.guardianRelation = "This entry is required";
    }

    if (!studentEntity.sdtStudentOtherInfo.guardianOccupation.trim()) {
      violations.guardianOccupation = "This entry is required";
    }

    if (!studentEntity.sdtStudentOtherInfo.guardianContactNo.trim()) {
      violations.guardianContactNo = "This entry is required";
    }

    if (!studentEntity.sdtStudentOtherInfo.guardianAddress.trim()) {
      violations.guardianAddress = "This entry is required";
    }
  }

  if (
    studentEntity.addrHouseNo === null ||
    !studentEntity.addrHouseNo.trim() === ""
  ) {
    violations.addrHouseNo = "This entry is required";
  }

  if (studentEntity.addrStreet === null || !studentEntity.addrStreet.trim()) {
    violations.addrStreet = "This entry is required";
  }

  if (studentEntity.addrMakatiResident === null) {
    violations.addrMakatiResident = "This entry is required";
  } else {
    if (studentEntity.addrMakatiResident.trim() === "") {
      violations.addrMakatiResident = "This entry is required";
    } else if (studentEntity.addrMakatiResident.trim() === "Y") {
      if (studentEntity.addrMakatiResidentBarangay === null) {
        violations.addrMakatiResidentBarangay = "This entry is required";
      } else if (studentEntity.addrMakatiResidentBarangay.code.trim() === "") {
        violations.addrMakatiResidentBarangay = "This entry is required";
      }
    } else if (studentEntity.addrMakatiResident.trim() === "N") {
      if (studentEntity.addrBarangay === null) {
        violations.addrBarangay = "This entry is required";
      } else if (studentEntity.addrBarangay.trim() === "") {
        violations.addrBarangay = "This entry is required";
      }
    }

    if (
      studentEntity.addrCityMunicipality === null ||
      !studentEntity.addrCityMunicipality.trim()
    ) {
      violations.addrCityMunicipality = "This entry is required";
    }
  }

  if (!studentEntity.lastSchoolAttended.trim()) {
    violations.lastSchoolAttended = "This entry is required";
  }

  if (!studentEntity.lastSchoolAddress.trim()) {
    violations.lastSchoolAddress = "This entry is required";
  }

  if (!studentEntity.lastSchoolAverage.trim()) {
    violations.lastSchoolAverage = "This entry is required";
  }

  if (!studentEntity.lastSchoolYearSection.trim()) {
    violations.lastSchoolYearSection = "This entry is required";
  }

  if (!studentEntity.lastSchoolAdviser.trim()) {
    violations.lastSchoolAdviser = "This entry is required";
  }

  if (!studentEntity.lastSchoolSy.trim()) {
    violations.lastSchoolSy = "This entry is required";
  }

  if (studentEntity.shsTrackEnrolled.code.trim() === "") {
    violations.shsTrackEnrolled = "[Track/Strand/Specialization] are required";
  }

  if (studentEntity.shsStrSpecEnrolled.code.trim() === "") {
    violations.shsTrackEnrolled = "[Track/Strand/Specialization] are required";
  }

  return violations;
}

import moment from "moment";

export default function ConfigurationValidator(
  schoolYear,
  currentSem,
  schoolName,
  schoolAddress,
  regDate,
  enrollDate,
  principal,
  principalLevel
) {
  let violations = {};

  if (!schoolYear.trim()) {
    violations.schoolYear = "School Year is required";
  }

  if (!currentSem.trim()) {
    violations.currentSem = "Semester is required";
  }

  if (!schoolName.trim()) {
    violations.schoolName = "School name is required";
  }

  if (!schoolAddress.trim()) {
    violations.schoolAddress = "School address is required";
  }

  if (!regDate.trim()) {
    violations.regDate = "Registration date is required";
  }

  if (regDate.trim()) {
    if (!moment(regDate.trim(), "YYYY-MM-DD", true).isValid()) {
      violations.regDate = "Registration date is invalid";
    }
  }

  if (!enrollDate.trim()) {
    violations.enrollDate = "Enrollment date is required";
  }

  if (enrollDate.trim()) {
    if (!moment(enrollDate.trim(), "YYYY-MM-DD", true).isValid()) {
      violations.enrollDate = "Enrollment date is invalid";
    }
  }

  if (!principal.trim()) {
    violations.principal = "Principal is required";
  }

  if (!principalLevel.trim()) {
    violations.principalLevel = "Pricipal level is required";
  }

  return violations;
}

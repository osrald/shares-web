import moment from "moment";

export default function SeniorHighRegFormValidator(studentEntity) {
  let violations = {};

  if (!studentEntity.lastname.trim()) {
    violations.lastname = "This entry is required";
  }

  if (!studentEntity.firstname.trim()) {
    violations.firstname = "This entry is required";
  }

  if (!studentEntity.dob.trim()) {
    violations.dob = "This entry is required";
  }

  if (studentEntity.dob.trim()) {
    if (!moment(studentEntity.dob.trim(), "YYYY-MM-DD", true).isValid()) {
      violations.dob = "Date is invalid";
    }
  }

  if (!studentEntity.gender.trim()) {
    violations.gender = "This entry is required";
  }

  if (!studentEntity.birthplace.trim()) {
    violations.birthplace = "This entry is required";
  }

  if (!studentEntity.nationality.trim()) {
    violations.nationality = "This entry is required";
  }

  if (!studentEntity.elemName.trim()) {
    violations.elemName = "This entry is required";
  }

  if (!studentEntity.elemSchoolAddr.trim()) {
    violations.elemSchoolAddr = "This entry is required";
  }

  if (
    !studentEntity.elemCompMonth.trim() ||
    !studentEntity.elemCompYear.trim()
  ) {
    violations.elemCompMonthYear = "This entry is required";
  }

  if (!studentEntity.elemRegion.code.trim()) {
    violations.elemRegion = "This entry is required";
  }

  if (!studentEntity.elemPeptPasser.trim()) {
    violations.elemPeptPasser = "This entry is required";
  }

  if (studentEntity.elemPeptPasser.trim() === "Y") {
    if (
      !studentEntity.elemPeptMonth.trim() ||
      !studentEntity.elemPeptYear.trim()
    ) {
      violations.elemPeptMonthYear = "This entry is required";
    }
  }

  if (!studentEntity.elemAePasser.trim()) {
    violations.elemAePasser = "This entry is required";
  }

  if (studentEntity.elemAePasser.trim() === "Y") {
    if (!studentEntity.elemAeMonth.trim() || !studentEntity.elemAeYear.trim()) {
      violations.elemAeMonthYear = "This entry is required";
    }
  }

  if (!studentEntity.jhsName.trim()) {
    violations.jhsName = "This entry is required";
  }

  if (!studentEntity.jhsAddr.trim()) {
    violations.jhsAddr = "This entry is required";
  }

  if (!studentEntity.jhsCompMonth.trim() || !studentEntity.jhsCompYear.trim()) {
    violations.jhsCompMonthYear = "This entry is required";
  }

  if (!studentEntity.jhsRegion.code.trim()) {
    violations.jhsRegion = "This entry is required";
  }

  if (!studentEntity.jhsPeptPasser.trim()) {
    violations.jhsPeptPasser = "This entry is required";
  }

  if (studentEntity.jhsPeptPasser.trim() === "Y") {
    if (
      !studentEntity.jhsPeptMonth.trim() ||
      !studentEntity.jhsPeptYear.trim()
    ) {
      violations.jhsPeptMonthYear = "This entry is required";
    }
  }

  if (!studentEntity.jhsAePasser.trim()) {
    violations.jhsAePasser = "This entry is required";
  }

  if (studentEntity.jhsAePasser.trim() === "Y") {
    if (!studentEntity.jhsAeMonth.trim() || !studentEntity.jhsAeYear.trim()) {
      violations.jhsAeMonthYear = "This entry is required";
    }
  }

  if (!studentEntity.shsSchoolFirstChoice.code.trim()) {
    violations.firstChoiceTrack =
      "First choice track entries [School/Track/Strand/Specialization] are required";
  }

  if (!studentEntity.shsTrackFirstChoice.code.trim()) {
    violations.firstChoiceTrack =
      "First choice track entries [School/Track/Strand/Specialization] are required";
  }

  if (!studentEntity.shsStrSpecFirstChoice.code.trim()) {
    violations.firstChoiceTrack =
      "First choice track entries [School/Track/Strand/Specialization] are required";
  }

  if (
    studentEntity.shsSchoolFirstChoice.code.trim() !== "" &&
    studentEntity.shsSchoolFirstChoice.code.trim() === "999"
  ) {
    if (!studentEntity.shsSchoolFirstChoiceOthersNm.trim()) {
      violations.firstChoiceTrack =
        "You have chosen other school, please provide the details [Name and Address].";
    }

    if (!studentEntity.shsSchoolFirstChoiceOthersNm.trim()) {
      violations.firstChoiceTrack =
        "You have chosen other school, please provide the details [Name and Address].";
    }
  }

  if (studentEntity.shsSchoolSecondChoice !== null) {
    if (
      studentEntity.shsSchoolSecondChoice.code.trim() !== "" &&
      studentEntity.shsSchoolSecondChoice.code.trim() === "999"
    ) {
      if (!studentEntity.shsSchoolSecondChoiceOthersNm.trim()) {
        violations.secondChoiceTrack =
          "You have chosen other school, please provide the other school details [Name and Address].";
      }

      if (!studentEntity.shsSchoolSecondChoiceOthersAddr.trim()) {
        violations.secondChoiceTrack =
          "You have chosen other school, please provide the other school details [Name and Address].";
      }

      if (!studentEntity.shsTrackSecondChoice.code.trim()) {
        violations.secondChoiceTrack =
          "You have chosen other school where Track, Strand and Specialization are required";
      }

      if (!studentEntity.shsStrSpecSecondChoice.code.trim()) {
        violations.secondChoiceTrack =
          "You have chosen other school where Track, Strand and Specialization are required";
      }
    }

    if (
      studentEntity.shsSchoolSecondChoice.code.trim() !== "" &&
      studentEntity.shsSchoolSecondChoice.code.trim() !== "999"
    ) {
      if (!studentEntity.shsTrackSecondChoice.code.trim()) {
        violations.secondChoiceTrack =
          "You have chosen school where Track, Strand and Specialization are required";
      }

      if (!studentEntity.shsStrSpecSecondChoice.code.trim()) {
        violations.secondChoiceTrack =
          "You have chosen school where Track, Strand and Specialization are required";
      }
    }
  }

  return violations;
}

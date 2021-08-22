export default function ConfigAssignStudentToSectionDetailsValidator(
  studentEntity
) {
  let violations = {};

  if (studentEntity.section === null) {
    violations.gradeSection = "There is no grade/section selected";
  } else if (!studentEntity.section.name.trim()) {
    violations.gradeSection = "There is no grade/section selected";
  }

  return violations;
}

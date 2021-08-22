export default function ConfigSectionDetailsValidator(sectionEntity) {
  let violations = {};

  if (!sectionEntity.name.trim()) {
    violations.name = "Section name is required";
  }

  if (!sectionEntity.desc.trim()) {
    violations.desc = "Section desc is required";
  }

  if (!sectionEntity.gradeLevel.code.trim()) {
    violations.gradeLevel = "Grade Level is required";
  }

  if (!sectionEntity.adviser.id.trim()) {
    violations.adviser = "Class adviser is required";
  }

  if (
    Number(sectionEntity.sectionLimit) <= 0 ||
    Number(sectionEntity.sectionLimit) > 255
  ) {
    violations.sectionLimit = "Section limit is must be between 1 and 255";
  }

  return violations;
}

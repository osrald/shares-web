export default function UserDetailsValidator(userEntity) {
  let violations = {};

  if (!userEntity.userName.trim()) {
    violations.userName = "Username is required";
  }

  if (!userEntity.password.trim()) {
    violations.password = "Password is required";
  }

  if (!userEntity.fullName.trim()) {
    violations.fullName = "Fullname is required";
  }

  if (!userEntity.designation.id === 0) {
    violations.designation = "Designation is required";
  }

  if (!userEntity.accessLevel.trim()) {
    violations.accessLevel = "Access level is required";
  }

  return violations;
}

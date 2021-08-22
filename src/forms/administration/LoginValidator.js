export default function LoginValidator(userName, userPassword) {
  let violations = {};

  if (!userName.trim()) {
    violations.userName = "Username is required";
  } else {
    if (userName.toLowerCase() === "anonymous") {
      violations.userName = "Invalid username or password";
      violations.userPassword = "Invalid username or password";
    }
  }

  if (!userPassword.trim()) {
    violations.userPassword = "Password is required";
  }

  return violations;
}

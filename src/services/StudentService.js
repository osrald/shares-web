import axios from "axios";
import Auth from "../Auth";

const REST_API_PROD_URL = "https://shares-system.com/SharesApi/";
const REST_API_DEV_URL = "http://localhost:9191/";

class StudentService {
  studentDoesExist(lrn) {
    return axios.get(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }studentDoesExist/${lrn}`,
      Auth.getHeaderConf()
    );
  }

  getStudentById(id) {
    return axios.get(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }studentById/${id}`,
      Auth.getHeaderConf()
    );
  }

  getStudentByLRN(lrn) {
    return axios.get(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }studentByLRN/${lrn}`,
      Auth.getHeaderConf()
    );
  }

  getStudentStatusFromShares(lrn) {
    return axios.get(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }studentRegistrationStatus/${lrn}`,
      Auth.getHeaderConf()
    );
  }

  getAllCurrentlyEnrolledStudents() {
    return axios.get(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }sdtStudentsGetAllCurrentlyEnrolled`,
      Auth.getHeaderConf()
    );
  }

  getAllCurrentlyRegisteredStudents() {
    return axios.get(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }sdtGuidanceEarlyRegistrationReport`,
      Auth.getHeaderConf()
    );
  }

  getAllCurrentlyEnrolledStudentsSection(sectionId) {
    return axios.get(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }sdtStudentsGetSection/${sectionId}`,
      Auth.getHeaderConf()
    );
  }

  registerNewStudent(studentEntity) {
    return axios.post(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }studentRegisterNew`,
      studentEntity,
      Auth.getHeaderConf()
    );
  }

  registerExistingStudent(studentEntity) {
    return axios.put(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }studentRegisterExisting/${studentEntity.id}`,
      studentEntity,
      Auth.getHeaderConf()
    );
  }

  enrollStudent(studentEntity) {
    return axios.put(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }studentEnroll`,
      studentEntity,
      Auth.getHeaderConf()
    );
  }

  assignStudentToSection(studentEntity) {
    return axios.put(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }assignStudentToSection`,
      studentEntity,
      Auth.getHeaderConf()
    );
  }

  batchAssignStudentsToSection(students) {
    return axios.put(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }batchAssignStudentsToSection`,
      students,
      Auth.getHeaderConf()
    );
  }
}

export default new StudentService();

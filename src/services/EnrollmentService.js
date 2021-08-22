import axios from "axios";
import Auth from "../Auth";

const REST_API_PROD_URL = "https://shares-system.com/SharesApi/";
const REST_API_DEV_URL = "http://localhost:9191/";

class EnrollmentService {
  getAllCurrentlyEnrolledStudentsForSectionAssigment() {
    return axios.get(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }enrGetAllStudentsForSectionAssigment`,
      Auth.getHeaderConf()
    );
  }

  getAllSections() {
    return axios.get(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }enrSectionsGetAll`,
      Auth.getHeaderConf()
    );
  }

  getSectionById(id) {
    return axios.get(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }enrSectionGetByID/${id}`,
      Auth.getHeaderConf()
    );
  }

  addNewSection(sectionEntity) {
    return axios.post(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }enrSectionAddNew`,
      sectionEntity,
      Auth.getHeaderConf()
    );
  }

  updateSection(sectionEntity) {
    return axios.put(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }enrSectionUpdate`,
      sectionEntity,
      Auth.getHeaderConf()
    );
  }
}

export default new EnrollmentService();

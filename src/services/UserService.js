import axios from "axios";
import Auth from "../Auth";

const REST_API_PROD_URL = "https://shares-system.com/SharesApi/";
const REST_API_DEV_URL = "http://localhost:9191/";

class UserService {
  getUsersAll() {
    return axios.get(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }userGetAll`,
      Auth.getHeaderConf()
    );
  }

  getTeachersAll() {
    return axios.get(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }userGetAllTeachers`,
      Auth.getHeaderConf()
    );
  }

  getUserById(id) {
    return axios.get(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }userById/${id}`,
      Auth.getHeaderConf()
    );
  }

  addNewSystemUser(systemUserEntity) {
    return axios.post(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }userAddNew`,
      systemUserEntity,
      Auth.getHeaderConf()
    );
  }

  updateSystemUser(systemUserEntity) {
    return axios.put(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }userUpdate`,
      systemUserEntity,
      Auth.getHeaderConf()
    );
  }
}

export default new UserService();

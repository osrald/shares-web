import axios from "axios";
import Auth from "../Auth";

const REST_API_PROD_URL = "https://shares-system.com/SharesApi/";
const REST_API_DEV_URL = "http://localhost:9191/";

class ConfigService {
  getSharesConfiguration() {
    return axios.get(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }SharesAllConfig`
    );
  }

  getSharesConfigurationByTypeMajor(cfMajor) {
    return axios.get(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }SharesConfigByType/${cfMajor}`,
      Auth.getHeaderConf()
    );
  }

  getSharesConfigurationByTypeMajorMinor(cfMajor, cfMinor) {
    return axios.get(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }SharesConfigByType/${cfMajor}/${cfMinor}`,
      Auth.getHeaderConf()
    );
  }

  updateConfiguration(configEntity) {
    return axios.put(
      `${
        process.env.NODE_ENV === "production"
          ? REST_API_PROD_URL
          : REST_API_DEV_URL
      }configUpdate`,
      configEntity,
      Auth.getHeaderConf()
    );
  }
}

export default new ConfigService();

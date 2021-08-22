class ConfigEntity {
  intialize() {
    return {
      primarykey: 0,
      cfMajor: "",
      cfMinor: "",
      cfName: "",
      cfDesc: "",
      cfGeneral1: "",
      cfGeneral2: null,
    };
  }
}

export default new ConfigEntity();

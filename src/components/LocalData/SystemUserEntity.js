class SystemUserEntity {
  intialize() {
    return {
      id: null,
      userName: "",
      password: "",
      accessLevel: "",
      designation: {
        id: 0,
        code: "",
        name: "",
        desc: "",
        entDate: null,
        modDate: null,
      },
      apiKey: "",
      fullName: "",
      entDate: null,
      modDate: null,
    };
  }
}

export default new SystemUserEntity();

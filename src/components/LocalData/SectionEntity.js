class SectionEntity {
  intialize() {
    return {
      id: 0,
      name: "",
      desc: "",
      gradeLevel: {
        id: 0,
        code: "",
        name: "",
        desc: "",
        entDate: null,
        modDate: null,
      },
      adviser: {
        id: "",
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
      },
      sectionLimit: 0,
      shsSy: "",
      shsSem: "",
      entDate: null,
      modDate: null,
    };
  }
}
export default new SectionEntity();

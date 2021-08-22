import { CfgSchools } from "../components/LocalData/CfgSchools";
import { CfgStrandSpecs } from "../components/LocalData/CfgStrandSpecs";
import { CfgTracks } from "../components/LocalData/CfgTracks";

class StudentsRegistryStats {
  getStatistics(tableData) {
    if (this._isTableDataProcessable(tableData)) {
      let totalMaleOpt1 = 0;
      let totalFemaleOpt1 = 0;
      let ordinal = 1;

      const statData = [
        {
          Field1: "Content Type",
          Field2: "Code",
          Field3: "Preferences (option 1)",
          Field4: "Count",
          Field5: "Option",
          Field6: "Ordinal",
        },
      ];

      for (const [, cfgSchool] of CfgSchools.entries()) {
        let totalSchool = 0;
        statData.push({
          Field1: "School",
          Field2: cfgSchool.code,
          Field3: cfgSchool.name,
          Field4: totalSchool,
          Field5: 1,
          Field6: ordinal,
        });
        ordinal++;

        for (const [, cfgTrack] of CfgTracks.entries()) {
          let totalTrack = 0;
          if (cfgTrack.chId === cfgSchool.id) {
            statData.push({
              Field1: "Track",
              Field2: cfgTrack.code,
              Field3: cfgTrack.name,
              Field4: totalTrack,
              Field5: 1,
              Field6: ordinal,
            });
            ordinal++;

            for (const [, cfgStrandSpec] of CfgStrandSpecs.entries()) {
              let totalStrandSpec = 0;

              if (
                cfgStrandSpec.chId === cfgSchool.id &&
                cfgStrandSpec.ctId === cfgTrack.id
              ) {
                for (const [, repRecord] of tableData.entries()) {
                  if (
                    repRecord.fcSchoolCode === cfgSchool.code &&
                    repRecord.fcTrackCode === cfgTrack.code &&
                    repRecord.fcStrndSpecCode === cfgStrandSpec.code
                  ) {
                    totalSchool++;
                    totalTrack++;
                    totalStrandSpec++;

                    if (repRecord.gender === "M") {
                      totalMaleOpt1++;
                    } else {
                      totalFemaleOpt1++;
                    }
                  }
                }
                statData.push({
                  Field1: "Strand/Specialization",
                  Field2: cfgStrandSpec.code,
                  Field3: cfgStrandSpec.name,
                  Field4: totalStrandSpec,
                  Field5: 1,
                  Field6: ordinal,
                });
                ordinal++;
              }
            }
          }
        }
      }

      statData.push({
        Field1: "Total Male (Option 1)",
        Field2: "M",
        Field3: "Male",
        Field4: totalMaleOpt1,
        Field5: 1,
        Field6: ordinal,
      });
      ordinal++;

      statData.push({
        Field1: "Total Female (Option 1)",
        Field2: "F",
        Field3: "Female",
        Field4: totalFemaleOpt1,
        Field5: 1,
        Field6: ordinal,
      });
      ordinal++;

      console.log(statData);

      return statData;
    }

    return [];
  }

  _isTableDataProcessable(tableData) {
    if (tableData === null || typeof tableData === "undefined") {
      return false;
    } else {
      return true;
    }
  }
}

export default new StudentsRegistryStats();

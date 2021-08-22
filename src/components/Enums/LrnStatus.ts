/*Return Codes
 * UD - Error Undefined
 * NR - Not Registered for current school year/semester
 * AR - Already registered for current school year/semester
 * DE - Student record does not exist
 * CE - Student is already enrolled for current school year/semester
 * GR - Student already a graduated
 * TR - Student was transferred
 * KO - Student was kicked-out
 * DR - Student is a drop-out
 */

export enum LrnStatus {
  Undeterminable = 0, //UD
  NotSet = 1,
  Invalid = 2,
  ValidButNotInSystem = 3, //DE
  InSystemCurrentlyRegistered = 4, //AR
  InSystemNotRegisteredCurrently = 5, //NR
  CurrentlyEnrolled = 6, //CE
  Graduated = 7, // GR
  Transferred = 8, //TR
  KickedOut = 9, //KO
  Dropout = 10, //DR
}

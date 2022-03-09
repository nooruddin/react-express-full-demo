const helper = require("../helper/helper");
const path = require("path");
// json data to read and write
const studentsJSONFile = path.join(__dirname, "../data/students.json");
let students = require(studentsJSONFile);

// Student Object Constructor
class Student {
  constructor(name, course, email) {
    this.id = helper.getNewId();
    this.name = name;
    this.course = course;
    this.email = email;
  }

  static getStudents = () => {
    return students;
  };

  static findById = (id) => {
    return students.some((student) => student.id === id);
  };

  static getStudentById = (id) => {
    return students.filter((student) => student.id === id);
  };

  static addStudent = (studentObj) => {
    students.push(studentObj);
    helper.writeJSONFile(studentsJSONFile, students);
    return this.getStudents();
  };

  static updateStudentById = (studentId, updateValues) => {
    const updatedStudents = students.map((student) =>
      student.id === studentId ? { ...student, ...updateValues } : student
    );
    helper.writeJSONFile(studentsJSONFile, updatedStudents);
    return updatedStudents;
  };

  static deleteStudentById = (studentId) => {
    const studentsAfterDeletion = students.filter(
      (student) => student.id !== studentId
    );
    helper.writeJSONFile(studentsJSONFile, studentsAfterDeletion);
    return studentsAfterDeletion;
  };
}

module.exports = Student;

// load model
const Student = require("../models/Student");

const listStudents = (_req, res) => {
  res.json(Student.getStudents());
};

const getStudentById = (req, res) => {
  // res.send(req.params.id);
  const found = Student.findById(req.params.id);
  if (found) {
    res.json(Student.getStudentById(req.params.id));
  } else {
    res
      .status(400)
      .json({ errorMessage: `Student with ID:${req.params.id} not found` });
  }
};

const addStudent = (req, res) => {
  const newStudent = new Student(
    req.body.name,
    req.body.course,
    req.body.email
  );
  if (!newStudent.name || !newStudent.email || !newStudent.course) {
    return res.status(400).json({
      errorMessage: "Please provide name, email and course for new student",
    });
  }

  const students = Student.addStudent(newStudent);

  res.status(201).json(students);
};

const updateStudentById = (req, res) => {
  const found = Student.findById(req.params.id);
  if (found) {
    const updatedStudents = Student.updateStudentById(req.params.id, {
      ...req.body,
    });
    res.json({ msg: "Student Updated", students: updatedStudents });
  } else {
    res
      .status(404)
      .json({ errorMessage: `Student with ID: ${req.params.id} not found` });
  }
};

const deleteStudentById = (req, res) => {
  const found = Student.findById(req.params.id);
  if (found) {
    const studentsAfterDeletion = Student.deleteStudentById(req.params.id);
    res.json({
      msg: `Student with ID: ${req.params.id} Deleted`,
      students: studentsAfterDeletion,
    });
  } else {
    res
      .status(404)
      .json({ errorMessage: `Student with ID: ${req.params.id} not found` });
  }
};

module.exports = {
  listStudents,
  getStudentById,
  addStudent,
  deleteStudentById,
  updateStudentById,
};

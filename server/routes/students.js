const router = require("express").Router();
const studentsController = require("../controllers/studentsController");

//  Get all students
router.get("/", studentsController.listStudents);

//  Get student with :id
// req.params.id -> when url is /api/students/123
// req.params.id
// req.query.id -> when url has ? in it.
// e.g /students?sort=desc&color=blue -> req.query.sort, req.query.color
// req.body.id -> data is coming from post request
router.get("/:id", studentsController.getStudentById);

//  Create new Student
router.post("/", studentsController.addStudent);

// update student with :id
router.patch("/:id", studentsController.updateStudentById);

router.delete("/:id", studentsController.deleteStudentById);

module.exports = router;

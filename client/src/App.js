import axios from "axios";
import { useEffect, useState } from "react";
import StudentsList from "./StudentsList";

// const BACK_END = "http://localhost:5500";
const BACK_END = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const { data } = await axios.get(`${BACK_END}/api/students`);
      setStudents(data);
    };

    fetchStudents();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newStudent = {
      name: event.target.studentName.value,
      email: event.target.studentEmail.value,
      course: event.target.studentCourse.value,
    };
    axios.post(`${BACK_END}/api/students`, newStudent).then((response) => {
      setStudents(response.data);
    });
    event.target.reset();
  };

  const handleEdit = (event, studentId) => {
    event.preventDefault();
    setEditId(studentId);
  };

  const handleUpdate = (event, studentId) => {
    event.preventDefault();
    const updatedStudent = {
      name: event.target.studentName.value,
      email: event.target.studentEmail.value,
      course: event.target.studentCourse.value,
    };
    axios
      .patch(`${BACK_END}/api/students/${studentId}`, updatedStudent)
      .then((response) => {
        setStudents(response.data.students);
        setEditId(null);
      });
  };

  const handleDelete = (event, studentId) => {
    event.preventDefault();
    axios.delete(`${BACK_END}/api/students/${studentId}`).then((response) => {
      setStudents(response.data.students);
    });
  };

  console.log(process.env.REACT_APP_BACKEND_URL);
  return (
    <div className="App">
      <h1>App</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="studentName">
          Name:
          <input type="text" name="studentName" />
        </label>
        <hr />
        <label htmlFor="studentEmail">
          Email:
          <input type="text" name="studentEmail" />
        </label>
        <hr />
        <label htmlFor="studentCourse">
          Course:
          <input type="text" name="studentCourse" />
        </label>
        <hr />
        <button type="submit">Add Student</button>
      </form>
      <hr />
      <hr />
      <StudentsList
        students={students}
        handleEdit={handleEdit}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        editId={editId}
      />
    </div>
  );
}

export default App;

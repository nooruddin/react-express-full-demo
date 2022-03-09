import React from "react";

const StudentsList = ({
  students,
  editId,
  handleEdit,
  handleUpdate,
  handleDelete,
}) => {
  return students.map((student) => {
    return (
      <div key={student.id}>
        <form onSubmit={(event) => handleUpdate(event, student.id)}>
          <input
            type="text"
            name="studentName"
            defaultValue={student.name}
            disabled={editId !== student.id}
          />
          <input
            type="text"
            name="studentCourse"
            defaultValue={student.course}
            disabled={editId !== student.id}
          />
          <input
            type="text"
            name="studentEmail"
            defaultValue={student.email}
            disabled={editId !== student.id}
          />
          {editId === student.id ? (
            <button type="submit">Update</button>
          ) : (
            <button
              type="button"
              onClick={(event) => handleEdit(event, student.id)}
            >
              Edit
            </button>
          )}
        </form>
        <button onClick={(event) => handleDelete(event, student.id)}>
          Delete
        </button>
        <hr />
      </div>
    );
  });
};

export default StudentsList;

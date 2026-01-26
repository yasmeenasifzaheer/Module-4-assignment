import { useState, useEffect } from "react";

const TaskForm = ({ onSubmit, selectedTask, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // If editing, preload task data
  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
    }
  }, [selectedTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Task title is required");
      return;
    }

    onSubmit({
      title,
      description,
    });

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>{selectedTask ? "Edit Task" : "Add Task"}</h3>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <br /><br />

      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <button type="submit">
        {selectedTask ? "Update Task" : "Add Task"}
      </button>

      {selectedTask && (
        <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default TaskForm;

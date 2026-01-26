import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 🔹 Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchTasks();
    }
  }, []);

  // 🔹 Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Add new task
  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/tasks",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks([...tasks, res.data]);
      setTitle("");
    } catch (err) {
      console.error(err);
      alert("Failed to add task");
    }
  };

  // 🔹 Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  };

  // 🔹 Start editing task
  const startEdit = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
  };

  // 🔹 Submit edited task
  const submitEdit = async (e) => {
    e.preventDefault();
    if (!editTitle.trim()) return;

    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${editId}`,
        { title: editTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(tasks.map((t) => (t._id === editId ? res.data : t)));
      setEditId(null);
      setEditTitle("");
    } catch (err) {
      console.error(err);
      alert("Failed to update task");
    }
  };

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}>
      <h1>Task Dashboard</h1>

      <button
        onClick={handleLogout}
        style={{ marginBottom: "20px", padding: "6px 12px" }}
      >
        Logout
      </button>

      {/* 🔹 Loading */}
      {loading && <p>Loading tasks...</p>}

      {/* 🔹 Add Task */}
      {!editId && (
        <form onSubmit={addTask} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Enter new task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: "6px", width: "70%" }}
          />
          <button type="submit" style={{ padding: "6px 12px", marginLeft: "6px" }}>
            Add
          </button>
        </form>
      )}

      {/* 🔹 Edit Task */}
      {editId && (
        <form onSubmit={submitEdit} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={{ padding: "6px", width: "70%" }}
          />
          <button type="submit" style={{ padding: "6px 12px", marginLeft: "6px" }}>
            Update
          </button>
          <button
            type="button"
            onClick={() => setEditId(null)}
            style={{ padding: "6px 12px", marginLeft: "6px" }}
          >
            Cancel
          </button>
        </form>
      )}

      {/* 🔹 Task List */}
      {!loading && tasks.length === 0 && <p>No tasks available</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              border: "1px solid #ccc",
              padding: "8px 12px",
              borderRadius: "5px",
            }}
          >
            {task.title}
            <div>
              <button
                onClick={() => startEdit(task)}
                style={{
                  background: "orange",
                  color: "white",
                  border: "none",
                  padding: "4px 8px",
                  marginRight: "5px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task._id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "4px 8px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

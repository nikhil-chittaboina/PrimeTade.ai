import { useEffect, useState } from "react";
import "./Tasks.css";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("token");

  async function fetchTasks() {
    const res = await fetch("http://localhost:5000/api/v1/tasks", {
      headers: { Authorization: "Bearer " + token },
    });
    const data = await res.json();
    setTasks(data);
  }

  async function createTask() {
    if (!title) return;
    await fetch("http://localhost:5000/api/v1/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    fetchTasks();
  }

  async function deleteTask(id) {
    await fetch(`http://localhost:5000/api/v1/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    });
    fetchTasks();
  }

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div className="tasks-container">
      <h2>Tasks</h2>
      <div className="task-input">
        <input placeholder="New task" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button onClick={createTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}
            <button className="delete-btn" onClick={() => deleteTask(task._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

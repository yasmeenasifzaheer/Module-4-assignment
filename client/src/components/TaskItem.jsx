export default function TaskItem({ task, onDelete }) {
  return (
    <div>
      <span>{task.title}</span>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
}

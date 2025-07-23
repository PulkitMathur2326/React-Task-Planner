import '../../styles/components/_task-item.scss';
import TaskItem from '../TaskItem/TaskItem';
 
export default function TaskList({ tasks, onEdit, onDelete, onStateChange }) {
  if (tasks.length === 0) {
    return <div className="task-list__empty">No tasks yet</div>;
  }
 
  return (
    <div className="task-list">
{tasks.map(task => (
        <TaskItem
key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStateChange={onStateChange}
        />
      ))}
    </div>
  );
}
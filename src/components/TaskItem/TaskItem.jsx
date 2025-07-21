import { useState } from 'react';
import './_task-item.scss';
 
export default function TaskItem({ task, onEdit, onDelete, onStateChange }) {
  const [isEditing, setIsEditing] = useState(task.isEditing || false);
  const [desc, setDesc] = useState(task.description);
 
  const handleEdit = () => {
    if (isEditing) {
      onEdit(task.id, desc);
    }
    setIsEditing(!isEditing);
  };
 
  return (
    <>
    <div className="task-item">
      {isEditing ? (
        <input
          className="task-item__desc-input"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          onKeyDown={(e) => {if (e.key === 'Enter') handleEdit()}}
        />
      ) : (
        <p className="task-item__desc">{task.description}</p>
      )}
 
      <div className="task-item__actions">
        <button onClick={handleEdit}>{isEditing ? 'Done' : 'Edit'}</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
 
      <div className="task-item__states">
        {['To-Do', 'In-Progress', 'Done'].map(state => (
          <label key={state}>
            <input
              type="checkbox"
              checked={task.state === state}
              onChange={() => onStateChange(task.id, state)}
            />
            {state}
          </label>
        ))}
      </div>
    </div>
    </>
  );
}
 
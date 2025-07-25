import { useState } from 'react';
import './_task-item.scss';
 
export default function TaskItem({ task, onEdit, onDelete, onStateChange }) {
  const [isEditing, setIsEditing] = useState(task.isEditing || false);
  const [desc, setDesc] = useState(task.description);
  
  const handleEdit = () => {
    if (isEditing && desc.trim()) {
      onEdit(task.id, desc.trim());
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
                handleEdit();
            }
            else if (e.key === 'Escape') {
                setIsEditing(false);
            }
          }}
          autofocus
        />
      ) : (
        <p className="task-item__desc">{task.description}</p>
      )}
 
      <div className="task-item__actions">
        <button className = "task-item__button" onClick={handleEdit}>{isEditing ? 'Done' : 'Edit'}</button>
        <button className = "task-item__button" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
 
      <div className="task-item__states">
        {['To-Do', 'In-Progress', 'Done'].map(state => (
          <label key={state} className="task-item__state-label">
            <input
              type="checkbox"
              className="task-item__checkbox"
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
 
import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import TaskList from './components/TaskList/TaskList';
 
const STORAGE_KEY = 'task-planner-tasks';
 
export default function App() {
  const [tasks, setTasks] = useState([]);
 
  // Load tasks from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);
 
  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);
 
  const addTask = () => {
    const newTask = {
id: Date.now(),
      description: 'New Task',
      state: 'To-Do',
    };
    setTasks([...tasks, newTask]);
  };
 
  const updateTask = (id, newDesc) => {
setTasks(tasks.map(task =>
task.id === id ? { ...task, description: newDesc } : task
    ));
  };
 
  const deleteTask = (id) => {
setTasks(tasks.filter(task => task.id !== id));
  };
 
  const changeState = (id, newState) => {
    if (newState === 'Done') {
setTasks(tasks.filter(task => task.id !== id));
    } else {
setTasks(tasks.map(task =>
task.id === id ? { ...task, state: newState } : task
      ));
    }
  };
 
  return (
    <div className="app">
      <Header onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onEdit={updateTask}
        onDelete={deleteTask}
        onStateChange={changeState}
      />
    </div>
  );
}
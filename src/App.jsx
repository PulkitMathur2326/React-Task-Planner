import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import TaskList from './components/TaskList/TaskList';

const STORAGE_KEY = 'task-planner-tasks';

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setTasks(JSON.parse(stored));
            setHasLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (hasLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        }
    }, [tasks]);

    const addTask = () => {
        const newTask = {
            id: Date.now(),
            description: 'New Task',
            state: 'To-Do',
            isEditing: true
        };
        setTasks([...tasks, newTask]);
    };

    const updateTask = (id, newDesc) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, description: newDesc, isEditing: false } : task
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
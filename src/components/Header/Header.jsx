import '../../styles/components/_header.scss';

export default function Header({onAddTask}) {
    return (
        <header className="header">
            <h1 className="header__title">Task Planner</h1>
            <div className="header__sub">
                <h2 className="header__sub-title">All Tasks</h2>
                <button className="header__add-btn" onClick={onAddTask}>+</button>
            </div>
        </header>
    )
}
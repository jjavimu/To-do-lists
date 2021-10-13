import React, { useContext } from 'react'
import { ListContext } from './ListContext'

function Todo({ tlistIndex, tIndex }) {
    const [lists, , , , deleteTask] = useContext(ListContext)

    const callDeleteTask = (e) => {
        e.preventDefault()
        if (window.confirm('Are you sure you wish to delete this task?'))
            deleteTask(tlistIndex, tIndex);
    }

    return (
        <div>
            <h4 className={lists[tlistIndex].todos[tIndex].todoDone ? "todo" : "todo done"}>{lists[tlistIndex].todos[tIndex].todoName}</h4>
            <div className="opt-btns">
                <button className="do-btn" > Do </button>
                <button className="edit-btn" > Edit </button>
                <button className="del-btn" onClick={callDeleteTask} > Delete </button>
            </div>
        </div>

    )
}
export default Todo

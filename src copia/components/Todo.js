import React, { useContext, useState } from 'react'
import { ListContext } from './ListContext'
import "./Todo.css"

function Todo({ tlistIndex, tIndex, isEditing, setIsEditing }) {
    const [lists, , , , , deleteTask, doTask, changePriority, editTask] = useContext(ListContext)
    const currentTask = lists[tlistIndex].todos[tIndex];
    const [edit, setEdit] = useState(false); //Edit=true => boton pone end
    const [editName, setEditName] = useState(currentTask.todoName);
    const [editDate, setEditDate] = useState(currentTask.todoDeadline);
    const [editList, setEditList] = useState(tlistIndex);


    const pastTime = () => {
        return new Date().getTime() > new Date(currentTask.todoDeadline + ":00Z").getTime();
    }

    const callDeleteTask = (e) => {
        e.preventDefault()
        if (window.confirm('Are you sure you wish to delete this task?')) {
            deleteTask(tlistIndex, tIndex);
            if (edit) { // Si se estaba editando la cierro de editr
                setEdit(!edit);
                setIsEditing(false);
            }
        }
    }

    const callDoTask = e => {
        e.preventDefault();
        doTask(tlistIndex, tIndex);
    }

    const prettyDate = str => {
        var arr = str.split('T');
        var day = arr[0].split('-').reverse();
        return day.map(e => e + '/').join('').slice(0, -1) + " at " + arr[1];
    }

    const callChangePriority = e => {
        e.preventDefault();
        if (isEditing)
            return;
        changePriority(tlistIndex, tIndex);
    }

    const updateName = (e) => {
        setEditName(e.target.value);
    }
    const updateDate = (e) => {
        setEditDate(e.target.value);
    }
    const updateEditList = (e) => {
        setEditList(e.target.value);
    }

    const editButton = (e) => {
        e.preventDefault();
        // Si no hay otra tarea editandose y pulsa "Edit"
        if (!isEditing && !edit) {
            setEdit(true);
            setIsEditing(true);
            setEditName(currentTask.todoName);
            setEditDate(currentTask.todoDeadline);
        }
        else if (isEditing && edit) {
            setIsEditing(false);
            setEdit(false);
            editTask(tlistIndex, tIndex, editName, editDate, editList);
        }
    }

    // const debug = () => {

    // }


    return (
        <div className="todo-container">
            <div className="opt-btns">
                <button className="do-btn" onClick={callDoTask} > {currentTask.todoDone ? "Undo" : "Do"} </button>
                <button className="edit-btn" onClick={editButton} > {edit ? "End" : "Edit"} </button>
                <button className="del-btn" onClick={callDeleteTask} > Delete </button>
                {/* <button className="del-btn" onClick={debug} > Debug </button> */}
            </div>

            {edit ?
                <div className="edit-options">
                    <label> Move task to list: </label>
                    <select name="select-list" id="select-list" value={editList} onChange={updateEditList}>
                        {lists.map((l, index) => (<option key={index} value={index}> {l.listName} </option>))}
                    </select>
                    <br />
                    <label> Rename task: </label>
                    <input className="todo-edit" type="text" placeholder={currentTask.todoName} autoComplete="off" onChange={updateName} />
                    <br />
                    <label> New deadline: </label>
                    <input type="datetime-local" placeholder={new Date()} autoComplete="off" onChange={updateDate} />
                </div>

                : <div>
                    <h4 className={currentTask.todoDone ? "todo-done" : "todo"}>{currentTask.todoName}</h4>
                    <p className={pastTime() ? "deadline-past" : "deadline"} > &#128337; &nbsp; {prettyDate(currentTask.todoDeadline)}</p>
                </div>
            }

            <p className="prior" onClick={callChangePriority}> {"🔥".repeat(currentTask.todoPriority)} </p>
        </div >

    )
}
export default Todo

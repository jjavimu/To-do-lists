import React, { useState, useContext } from 'react'
import { ListContext } from "./ListContext"
import "./AddTaskForm.css"

function AddTaskForm(props) {
    const [nameInput, setNameInput] = useState('');
    const [dateInput, setDateInput] = useState('');
    const [toList, setToList] = useState(0);
    const [priorityInput, setPriorityInput] = useState(0);
    const [lists, , , , addTask, , , ,] = useContext(ListContext);

    const closeForm = () => {
        props.setTrigger(false);
    }

    const updateName = (e) => {
        setNameInput(e.target.value);
    }
    const updateDate = (e) => {
        setDateInput(e.target.value);
    }

    const updatePriority = e => {
        setPriorityInput(e.target.value);
    }

    const updateToList = (e) => {
        setToList(e.target.value);
        //console.log(e.target.value);
    }

    const callAddTaskToList = (e) => {
        e.preventDefault();
        // console.log('name: ' + nameInput + 'date: ' + dateInput + 'p: ' + priorityInput + 'indexList: ' + toList)
        // Creamos la nueva lista
        if (!nameInput || !dateInput) {
            window.alert("You need to put a name and a deadline!")
            return;
        }
        const newTask = {
            todoName: nameInput,
            todoDone: false,
            todoDeadline: dateInput,
            todoPriority: priorityInput
        }
        // Llamamos a añadir task con el método del context
        addTask(newTask, toList);
        // Ocultamos el form y limpiamos inputs
        props.setTrigger(false);
        setDateInput('');
        setNameInput('');
    }

    return (props.trigger) ? (
        <div className="add-task">
            <button className="close-btn" onClick={closeForm}>
                X
            </button>
            <form className="add-task-form" onSubmit={callAddTaskToList}>
                <input type="text" placeholder="Add a new task" value={nameInput} name="text" className="name-input" onChange={updateName} autoComplete="off" />
                <br />
                <input type="datetime-local" placeholder="Task deadline" value={dateInput} name="date" className="date-input" onChange={updateDate} autoComplete="off" />
                <br />
                <select name="select-priority" id="select-priority" onChange={updatePriority}>
                    <option value="3">Alta</option>
                    <option value="2">Media</option>
                    <option value="1">Baja</option>
                </select>
                <select name="select-list" id="select-list" value={toList} onChange={updateToList}>
                    {lists.map((l, index) => (<option key={index} value={index}> {l.listName} </option>))}
                </select>

                <button className="done-btn">
                    Done
                </button>

            </form>
        </div >
    ) : (<button className="add-task-btn" onClick={() => { props.setTrigger(true) }}>Add task to list</button>);
}

export default AddTaskForm

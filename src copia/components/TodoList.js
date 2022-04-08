import React, { useContext, useState } from 'react'
import { ListContext } from './ListContext';
import Todo from './Todo';
import "./TodoList.css"

function TodoList({ listIndex }) {
    const [lists, , deleteList, modifyList, addTask, , , ,] = useContext(ListContext);
    const [isTaskEditing, setIsTaskEditing] = useState(false);
    // Observación: esto permite que no se puedan modificar dos tareas de la misma lista a la vez
    // pero deja que en varias listas sí, pero va regular cuando cambias de listas xd
    // y tambien va mal cuando eliminas una lista mientras se está editando 

    const currentList = lists[listIndex]
    const [modify, setModify] = useState(false); //Edit=true => boton pone end
    const [modifyName, setModifyName] = useState(currentList.listName);
    const [modifyDesc, setModifyDesc] = useState(currentList.listDesc);

    const callDeleteList = (e) => {
        e.preventDefault();
        if (window.confirm('Are you sure you wish to delete this list?' + listIndex.toString())) {
            deleteList(listIndex);
            // ahora va con que el id es el siguiente del ultimo
        }
    }

    const modifyButton = (e) => {
        e.preventDefault();
        // Si no hay otra tarea editandose y pulsa "Edit"
        if (!modify) {
            setModify(true);
            setModifyName(currentList.listName);
            setModifyDesc(currentList.listDesc);
        }
        else {
            setModify(false);
            modifyList(listIndex, modifyName, modifyDesc);
        }
    }
    const callAddTaskHere = () => {
        addTask({
            todoName: "New task",
            todoDone: false,
            todoDeadline: "1970-01-01T00:00",
            todoPriority: 3
        }, listIndex);
    }

    const updateName = (e) => {
        setModifyName(e.target.value);
    }
    const updateDesc = (e) => {
        setModifyDesc(e.target.value);
    }
    return (
        <div className="list">
            <div className="list-btns">
                <button className="add-btn" onClick={callAddTaskHere}> Add task here</button>
                <button className="mdf-btn" onClick={modifyButton} > {modify ? "Confirm" : "Modify"} </button>
                <button className="del-btn" onClick={callDeleteList} > Delete </button>
            </div>

            {modify ?
                <div className="modify-options">
                    <label> Rename list: </label>
                    <br />
                    <input type="text" placeholder={currentList.listName} autoComplete="off" onChange={updateName} />
                    <br />
                    <label> New list description: </label>
                    <br />
                    <input className="input-desc" type="text" placeholder={currentList.listDesc} autoComplete="off" onChange={updateDesc} />

                </div>
                : <div>
                    <h3 className="list-name">{lists[listIndex].listName}</h3>
                    <p className="list-desc">{lists[listIndex].listDesc}</p>
                </div>}

            <ul>
                {lists[listIndex].todos.map((todo, index) => (
                    <li className="todo-div" key={index}>
                        <Todo tlistIndex={listIndex} tIndex={index} isEditing={isTaskEditing} setIsEditing={setIsTaskEditing} />
                    </li>)
                )}
            </ul>
        </div>
    );
}

export default TodoList

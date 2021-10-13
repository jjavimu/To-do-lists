import React, { useContext } from 'react'
import { ListContext } from './ListContext';
import Todo from './Todo';
import "./TodoList.css"

function TodoList({ listIndex }) {
    const [lists, , deleteList, ,] = useContext(ListContext);

    const callDeleteList = (e) => {
        e.preventDefault();
        if (window.confirm('Are you sure you wish to delete this list?' + listIndex.toString())) {
            deleteList(listIndex);
            // ahora va con que el id es el siguiente del ultimo
        }
    }

    return (
        <div className="list">
            <div className="list-btns">
                <button className="add-btn" > To do</button>
                <button className="mdf-btn" onClick={() => console.log(lists)} > Modify </button>
                <button className="del-btn" onClick={callDeleteList} > Delete </button>
            </div>

            <h3 className="list-name">{lists[listIndex].listName}</h3>
            <p className="list-desc">{lists[listIndex].listDesc}</p>

            <ul>
                {lists[listIndex].todos.map((todo, index) => (
                    <li className="todo-div" key={index}>
                        <Todo tlistIndex={listIndex} tIndex={index} />
                    </li>)
                )}
            </ul>
        </div>
    );
}

export default TodoList

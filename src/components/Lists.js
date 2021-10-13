import React, { useContext } from 'react'
import { ListContext } from './ListContext';
import TodoList from './TodoList';
import "./Lists.css"

function Lists() {
    const [lists, , , ,] = useContext(ListContext);
    return (
        <div className="list-container">
            {lists.map((list, index) => (
                <TodoList key={index} listIndex={index} />
            )
            )}
        </div>
    );
}

export default Lists

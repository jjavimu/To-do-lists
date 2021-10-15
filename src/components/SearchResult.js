import React from 'react'
import "./SearchResult.css"

function SearchResult({ t, l }) {
    const prettyDate = str => {
        var arr = str.split('T');
        var day = arr[0].split('-').reverse();
        return day.map(e => e + '/').join('').slice(0, -1) + " at " + arr[1];
    }
    const pastTime = () => {
        return new Date().getTime() > new Date(t.todoDeadline + ":00Z").getTime();
    }

    return (
        <div className="search-result">
            <li className="todo-div">
                <h4 className={t.todoDone ? "todo-done" : "todo"}>{t.todoName}</h4>
                <p className={pastTime() ? "deadline-past" : "deadline"} > &#128337; &nbsp; {prettyDate(t.todoDeadline)}</p>
                <p className="prior" > {"🔥".repeat(t.todoPriority)} </p>
            </li>
            <h5> in list: {l.listName}</h5>
        </div >
    )
}

export default SearchResult

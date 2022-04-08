import React, { useContext, useState } from 'react'
import { ListContext } from "./ListContext"
import SearchResult from './SearchResult';
import "./Search.css"

function Search() {

    const [, , , , , , , , , search] = useContext(ListContext);
    const [keywords, setKeywords] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [priority, setPriority] = useState(0);
    const [filteredTasks, setFilteredTasks] = useState([]);

    const updateKeywords = (e) => {
        setKeywords(e.target.value);
    }
    const updateStartDate = (e) => {
        setStartDate(e.target.value);
    }
    const updateEndDate = (e) => {
        setEndDate(e.target.value);
    }
    const updatePriority = (e) => {
        setPriority(parseInt(e.target.value));
    }
    const handleSearchChange = (e) => {
        e.preventDefault();
        var arrAux = search(keywords, startDate, endDate, priority);
        setFilteredTasks(arrAux.map(l =>
            l.todos.map(t => ({ task: t, inList: l }))
        ).flat()
        );

    }

    return (
        <div className="component-search">
            <h3> Search tasks:</h3>
            <div className="search-bar">
                <input type="text" placeholder={"Put some keywords..."} value={keywords} onChange={updateKeywords} />
                <input type="datetime-local" value={startDate} onChange={updateStartDate} />
                <input type="datetime-local" value={endDate} onChange={updateEndDate} />
                <select value={priority} onChange={updatePriority}>
                    <option value="0"> Priority... </option>
                    <option value="3">Alta</option>
                    <option value="2">Media</option>
                    <option value="1">Baja</option>
                </select>
                <button className="search-button" onClick={handleSearchChange}>
                    Search
                </button>
            </div>
            <div className="results">
                {filteredTasks.map((f, index) => (
                    <SearchResult key={index} t={f.task} l={f.inList} />
                ))}
            </div>
        </div >

    );
}

export default Search

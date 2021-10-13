import React, { useState, createContext } from "react";

export const ListContext = createContext();

export const ListProvider = (props) => {
    const [lists, setLists] = useState([
        {
            listName: "Mi primera lista",
            listDesc: "Esta es mi primera lista",
            todos: [
                {
                    todoName: "TFG",
                    todoDone: false,
                },
                {
                    todoName: "TFG2",
                    todoDone: false,
                }
            ]

        },
        {
            listName: "Mi segunda lista",
            listDesc: "Esta es mi \nsegunda lista",
            todos: [
                {
                    todoName: "Patatas",
                    todoDone: false,
                },
                {
                    todoName: "Tomates",
                    todoDone: false,
                }
            ]

        }
    ]);

    const addList = (list) => {
        setLists(prevLists => [...prevLists, list]);
    }

    const deleteList = (listIndex) => {
        setLists(prevLists => prevLists.filter(l => l !== lists[listIndex]));
    }

    const addTask = (task, listIndex) => {
        const addNewTask = [...lists];
        console.log(addNewTask[listIndex].todos);
        addNewTask[listIndex].todos.push(task);
        setLists(addNewTask);
    }

    const deleteTask = (listIndex, taskIndex) => {
        const removeList = [...lists];
        removeList[listIndex].todos.splice(taskIndex, 1);
        setLists(removeList);
    }



    return (
        <ListContext.Provider value={[lists, addList, deleteList, addTask, deleteTask]}>
            {props.children}
        </ListContext.Provider>
    );

}

import React, { useState, createContext } from "react";

export const ListContext = createContext();

export const ListProvider = (props) => {
    const [lists, setLists] = useState([
        {
            listName: "Cosas del TFG",
            listDesc: "En esta lista apunto todas las cosas del TFG que tengo que aprender ",
            todos: [
                {
                    todoName: "Blockchain",
                    todoDone: true,
                    todoDeadline: "2021-10-10T23:59",
                    todoPriority: 3,
                },
                {
                    todoName: "React",
                    todoDone: false,
                    todoDeadline: "2021-10-15T23:59",
                    todoPriority: 2,
                },
                {
                    todoName: "Twitter",
                    todoDone: false,
                    todoDeadline: "2021-10-25T23:59",
                    todoPriority: 1,
                }
            ]

        },
        {
            listName: "Lista de la compra",
            listDesc: "Cosas que comprar para el finde",
            todos: [
                {
                    todoName: "Patatas",
                    todoDone: false,
                    todoDeadline: "2021-09-10T23:59",
                    todoPriority: 1,
                },
                {
                    todoName: "Tomates",
                    todoDone: false,
                    todoDeadline: "2021-09-10T23:59",
                    todoPriority: 1,
                }
            ]

        },
    ]);



    const search = (keywords, startDate, endDate, priority) => {

        var prueba = [];
        for (const l of lists) {
            prueba.push({
                listName: l.listName,
                listDesc: l.listDesc,
                todos: l.todos.filter(t => {
                    // compruebo
                    var incluir = true;
                    if (keywords !== '')
                        incluir = incluir && t.todoName.toLowerCase().includes(keywords.toLowerCase());
                    if (startDate !== '' && endDate !== '')
                        incluir = incluir && new Date(startDate).getTime() <= new Date(t.todoDeadline).getTime() &&
                            new Date(t.todoDeadline).getTime() <= new Date(endDate).getTime();
                    if (priority !== 0)
                        incluir = incluir && priority === t.todoPriority;
                    return incluir;
                }
                )
            });
            console.log(prueba);
        }


        return prueba;


        // var filteredTasks = [];
        // for (const l of lists) {
        //     for (const t of l.todos) {

        //         if (keywords !== '' && t.todoName.toLowerCase().includes(keywords.toLowerCase())) {
        //             filteredTasks.push({ task: t, inList: l });
        //         }
        //         if (startDate !== '' && endDate !== '' &&
        //             new Date(startDate).getTime() <= new Date(t.todoDeadline).getTime() &&
        //             new Date(t.todoDeadline).getTime() <= new Date(endDate).getTime()) {
        //             filteredTasks.push({ task: t, inList: l });
        //         }
        //         if (priority !== 0 && priority === t.todoPriority) {
        //             filteredTasks.push({ task: t, inList: l });
        //         }
        //     }
        // }
        // return filteredTasks;

    }

    const addList = (list) => {
        setLists(prevLists => [...prevLists, list]);
    }

    const deleteList = (listIndex) => {
        setLists(prevLists => prevLists.filter(l => l !== lists[listIndex]));
    }

    const modifyList = (listIndex, newName, newDesc) => {
        const cp = [...lists];
        cp[listIndex].listName = newName;
        cp[listIndex].listDesc = newDesc;
        setLists(cp);
    }

    const addTask = (task, listIndex) => {
        const addNewTask = [...lists];
        //console.log(addNewTask[listIndex].todos);
        addNewTask[listIndex].todos.push(task);
        addNewTask[listIndex].todos.sort((a, b) => b.todoPriority - a.todoPriority)
        setLists(addNewTask);
    }

    const deleteTask = (listIndex, taskIndex) => {
        const removeList = [...lists];
        removeList[listIndex].todos.splice(taskIndex, 1);
        setLists(removeList);
    }

    const doTask = (listIndex, taskIndex) => {
        const doTaskList = [...lists];
        doTaskList[listIndex].todos[taskIndex].todoDone = !doTaskList[listIndex].todos[taskIndex].todoDone;
        setLists(doTaskList);
    }

    const changePriority = (listIndex, taskIndex) => {
        const cp = [...lists];
        cp[listIndex].todos[taskIndex].todoPriority = (cp[listIndex].todos[taskIndex].todoPriority % 3) + 1;
        cp[listIndex].todos.sort((a, b) => b.todoPriority - a.todoPriority);
        setLists(cp);
    }

    const editTask = (listIndex, taskIndex, editName, editDate, editList) => {
        const cp = [...lists];
        cp[listIndex].todos[taskIndex].todoName = editName;
        cp[listIndex].todos[taskIndex].todoDeadline = editDate;
        if (editList !== listIndex) {
            const task = cp[listIndex].todos[taskIndex];
            deleteTask(listIndex, taskIndex);
            addTask(task, editList);
        }
        setLists(cp);
    }

    return (
        <ListContext.Provider value={[lists, addList, deleteList, modifyList, addTask, deleteTask, doTask, changePriority, editTask, search]}>
            {props.children}
        </ListContext.Provider>
    );

}


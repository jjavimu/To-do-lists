import React, { useState, useContext } from 'react'
import { ListContext } from './ListContext';
import "./AddListForm.css"

function AddListForm(props) {
    // Para usar el conexto de todas las listas
    const [, addList, , , , , , , ,] = useContext(ListContext);
    // Para las entradas del form
    const [nameInput, setNameInput] = useState('');
    const [descInput, setDescInput] = useState('');

    // Actualizar las varaibles donde vamos a guardar el nombre y la descripción
    // al escribir en los inputs
    const updateName = (e) => {
        setNameInput(e.target.value);
    }
    const updateDesc = (e) => {
        setDescInput(e.target.value);
    }

    const closeForm = () => {
        props.setTrigger(false);
    }

    const callAddList = (e) => {
        e.preventDefault();
        // Creamos la nueva lista
        if (!nameInput) {
            window.alert("You need to put a name to your list!")
            return;
        }
        const newLista = {
            listName: nameInput,
            listDesc: descInput,
            todos: []
        }
        // Llamamos a añadir lista con el método del context
        addList(newLista);
        //console.log(lists);
        // Ocultamos el form y limpiamos inputs
        props.setTrigger(false);
        setDescInput('');
        setNameInput('');
    }


    return (props.trigger) ? (
        <div className="add-list">
            <button className="close-btn" onClick={closeForm}>
                X
            </button>
            <form className="add-list-form" onSubmit={callAddList}>
                <input type="text" placeholder="Add a new list" value={nameInput} name="text" className="name-input" onChange={updateName} autoComplete="off" />
                <input type="text" placeholder="List description" value={descInput} name="desc" className="desc-input" onChange={updateDesc} autoComplete="off" />
                <br />
                <button className="done-btn">
                    Done
                </button>

            </form>
        </div >
    ) : (<button className="add-list-btn" onClick={() => { props.setTrigger(true); }}>Add list</button>);
}

export default AddListForm

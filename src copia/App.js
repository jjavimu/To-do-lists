import React, { useState } from 'react';
import './App.css';
import AddListForm from './components/AddListForm';
import AddTaskForm from './components/AddTaskForm';
import Header from './components/Header';
import { ListProvider } from './components/ListContext';
import Lists from './components/Lists';
import Search from './components/Search';

function App() {
  // Hook para visualizar/cerrar AddListForm y AddTaskForm
  const [showAddListForm, setShowAddListForm] = useState(false);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);


  return (
    <ListProvider>
      <div className="App">
        <Header />
        <Search />
        <div className="buttons">
          <AddListForm trigger={showAddListForm} setTrigger={setShowAddListForm} />
          <AddTaskForm trigger={showAddTaskForm} setTrigger={setShowAddTaskForm} />
        </div>
        <Lists />


      </div>
    </ListProvider>
  );
}

export default App;

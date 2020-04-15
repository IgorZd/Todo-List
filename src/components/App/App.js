import React from "react";

import TodoList from "../TodoList/TodoList.js";
import AppHeader from "../AppHeader/AppHeader.js";
import SearchPanel from "../SearchPanel/SearchPanel.js";
import ItemStatusFilter from "../ItemStatusFilter/itemStatusFilter.js";

import "./App.css";
const App = () => {
  const todoData = [
    { label: "Drink Coffee", important: false, id: 1 },
    { label: "Build App", important: true, id: 2 },
    { label: "Sing Song", important: false, id: 3 },
  ];
  return (
    <div>
      <AppHeader toDo={1} done={3} />
      <div className="top-panel d-flex">
        <SearchPanel />
        <ItemStatusFilter />
      </div>
      <TodoList todos={todoData} />
    </div>
  );
};
export default App;

import React from "react";

import TodoList from "../TodoList/TodoList.js";
import AppHeader from "../AppHeader/AppHeader.js";
import SearchPanel from "../SearchPanel/SearchPanel.js";
import ItemStatusFilter from "../ItemStatusFilter/itemStatusFilter.js";
import ItemAddForm from "../ItemAddForm/ItemAddForm.js";

import "./App.css";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.maxId = 100;
    this.createTodoItem = (label) => {
      return {
        label,
        important: false,
        done: false,
        id: this.maxId++,
      };
    };
    this.state = {
      todoData: [
        this.createTodoItem("Drink Coffee"),
        this.createTodoItem("Build App"),
        this.createTodoItem("Sing Song"),
      ],
      term: "",
      filter: "active", // all, active, done
    };
    this.deleteItem = (id) => {
      this.setState(({ todoData }) => {
        const indx = todoData.findIndex((el) => el.id === id);
        // todoData.splice(indx, 1); - здесь происходит изменение состояния, а это недопустимо в React!!!
        const beforeDeletedItem = todoData.slice(0, indx);
        const afterDeletedItem = todoData.slice(indx + 1);
        const newArrayState = [...beforeDeletedItem, ...afterDeletedItem];
        return {
          todoData: newArrayState,
        };
      });
    };

    this.addItem = (text) => {
      //generate id
      const newItem = this.createTodoItem(text);
      // add element in array
      this.setState(({ todoData }) => {
        const newArr = [...todoData, newItem];
        return {
          todoData: newArr,
        };
      });
    };

    this.toggleProperty = (arr, id, propName) => {
      const indx = arr.findIndex((el) => el.id === id),
        oldItem = arr[indx],
        newItem = { ...oldItem, [propName]: !oldItem[propName] },
        beforeDeletedItem = arr.slice(0, indx),
        afterDeletedItem = arr.slice(indx + 1);
      return [...beforeDeletedItem, newItem, ...afterDeletedItem];
    };
    this.onToggleImportant = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, "important"),
        };
      });
    };
    this.onToggleDone = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, "done"),
        };
      });
    };
  }
  search = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  };
  onSearchChange = (term) => {
    this.setState({ term });
  };
  filter = (items, filter) => {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.done);
      case "done":
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };
  onFilterChange = (filter) => {
    this.setState({ filter });
  };
  render() {
    const visibleItems = this.filter(
        this.search(this.state.todoData, this.state.term),
        this.state.filter
      ),
      doneCount = this.state.todoData.filter((el) => el.done).length,
      todoCount = this.state.todoData.length - doneCount;
    return (
      <div>
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={this.state.filter}
            onFilterChange={this.onFilterChange}
          />
        </div>
        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}

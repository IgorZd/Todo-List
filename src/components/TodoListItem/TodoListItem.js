import React from "react";

import "./TodoListItem.css";

export default class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { label, done, important } = this.props;
    let classNames = "todo-list-item";
    if (done) {
      classNames += " done";
    }
    if (important) {
      classNames += " important";
    }
    return (
      <span className={classNames}>
        <span
          className="todo-list-item-label"
          onClick={this.props.onToggleDone}
        >
          {label}
        </span>
        <button
          type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={this.props.onToggleImportant}
        >
          <i className="fa fa-exclamation"></i>
        </button>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={this.props.onDeleted}
        >
          <i className="fa fa-trash-o"></i>
        </button>
      </span>
    );
  }
}

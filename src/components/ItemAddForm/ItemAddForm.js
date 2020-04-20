import React from "react";

import "./ItemAddForm.css";

export default class ItemAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
    };
  }
  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };
  onSubmit = (event) => {
    event.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: "",
    });
  };
  render() {
    return (
      <form className="item-add-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control"
          onChange={this.onLabelChange}
          value={this.state.label}
          placeholder="What needs to be done"
        />
        <button className="btn btn-outline-secondary">Add Item</button>
      </form>
    );
  }
}

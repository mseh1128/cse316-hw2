import React, { Component } from "react";
import ListHeading from "./ListHeading";
import ListItemsTable from "./ListItemsTable";
import PropTypes from "prop-types";
import ListTrash from "./ListTrash";
import addItemIcon from "../../images/AddItem.png";

export class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listName: this.getListName(),
      listOwner: this.getListOwner()
    };
    this.handleChange = this.handleChange.bind(this);
    this.oldString = "";
    this.newString = "";
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({ [name]: target.value });
  }

  // handleNameSubmit(event) {
  //   alert('Your favorite flavor is: ' + this.state.value);
  //   event.preventDefault();
  // }

  getListName() {
    if (this.props.todoList) {
      let name = this.props.todoList.name;
      return this.props.todoList.name;
    } else return "";
  }

  getListOwner() {
    if (this.props.todoList) {
      let owner = this.props.todoList.owner;
      return this.props.todoList.owner;
    }
  }

  handleOutFocus() {
    
    this.oldString = this.newString;
    this.newString = this.state.listName;
    this.props.addNameChangeTransaction(this.oldString, this.newString);
  }

  render() {
    const { listName, listOwner } = this.state;
    const {addNewItem} = this.props;
    return (
      <div id="todo_list">
        <ListHeading goHome={() => this.props.goHome(listName, listOwner)} />
        <ListTrash removeList={this.props.removeList} />
        <div id="list_details_container">
          <div id="list_details_name_container" className="text_toolbar">
            <span id="list_name_prompt">Name:</span>
            <input
              name="listName"
              value={this.state.listName}
              type="text"
              id="list_name_textfield"
              onChange={this.handleChange}
              onBlur={this.handleOutFocus.bind(this)}
            />
          </div>
          <div id="list_details_owner_container" className="text_toolbar">
            <span id="list_owner_prompt">Owner:</span>
            <input
              name="listOwner"
              value={this.state.listOwner}
              type="text"
              id="list_owner_textfield"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <ListItemsTable
          todoList={this.props.todoList}
          removeItem={this.props.removeItem}
          sortTasksHeader={this.props.sortTasksHeader}
          moveUpBtn={this.props.moveUpBtn}
          moveDownBtn={this.props.moveDownBtn}
          goToItem={this.props.goToItem}
        />
        <div className="list_item_create_new_item_container" onClick={addNewItem}>
        <img
        src={addItemIcon}
        alt="Add New Item"
        className="list_item_add_card"
      />
        </div>
      </div>
    );
  }
}

export default ListScreen;

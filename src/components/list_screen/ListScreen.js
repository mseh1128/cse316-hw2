import React, { Component } from 'react';
import ListHeading from './ListHeading';
import ListItemsTable from './ListItemsTable';
import PropTypes from 'prop-types';
import ListTrash from './ListTrash';
import addItemIcon from '../../images/AddItem.png';
import Str from '../../jtps/Str';

export class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listName: this.getListName(),
      listOwner: this.getListOwner()
    };
    this.handleChange = this.handleChange.bind(this);
    this.oldListName = new Str();
    this.oldListName.setStr(this.getListName());
    this.oldListOwner = new Str();
    this.oldListOwner.setStr(this.getListOwner());
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    if (name === 'listName') this.state.listName.setStr(target.value);
    else this.state.listOwner.setStr(target.value);
    this.forceUpdate();
  }

  getListName() {
    if (this.props.todoList) {
      let name = this.props.todoList.name;
      let initStr = new Str();
      initStr.setStr(name);
      return initStr;
    } else return new Str();
  }

  getListOwner() {
    if (this.props.todoList) {
      let owner = this.props.todoList.owner;
      let initOwner = new Str();
      initOwner.setStr(owner);
      return initOwner;
    } else return new Str();
  }

  handleOutFocus(field) {
    if (field === 'name') {
      const { listName } = this.state;
      this.props.addStrChangeTransaction(this.oldListName.getStr(), listName);
      this.oldListName.setStr(listName.getStr());
    } else {
      const { listOwner } = this.state;
      this.props.addStrChangeTransaction(this.oldListOwner.getStr(), listOwner);
      this.oldListOwner.setStr(listOwner.getStr());
    }
  }

  render() {
    const { listName, listOwner } = this.state;
    console.log(listName);
    console.log(listOwner);
    // console.log('STATE CHANGED');
    // console.log(listName);
    // console.log(listName.getStr());
    const { addNewItem } = this.props;
    return (
      <div id="todo_list">
        <ListHeading
          goHome={() =>
            this.props.goHome(listName.getStr(), listOwner.getStr())
          }
        />
        <ListTrash removeList={this.props.removeList} />
        <div id="list_details_container">
          <div id="list_details_name_container" className="text_toolbar">
            <span id="list_name_prompt">Name:</span>
            <input
              name="listName"
              value={this.state.listName.getStr()}
              type="text"
              id="list_name_textfield"
              onChange={this.handleChange}
              onBlur={this.handleOutFocus.bind(this, 'name')}
            />
          </div>
          <div id="list_details_owner_container" className="text_toolbar">
            <span id="list_owner_prompt">Owner:</span>
            <input
              name="listOwner"
              value={this.state.listOwner.getStr()}
              type="text"
              id="list_owner_textfield"
              onChange={this.handleChange}
              onBlur={this.handleOutFocus.bind(this, 'owner')}
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
        <div
          className="list_item_create_new_item_container"
          onClick={addNewItem}
        >
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

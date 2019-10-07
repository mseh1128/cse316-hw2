import React, { Component } from 'react';
import ListItemCard from './ListItemCard';

export class ListItemsTable extends Component {
  render() {
    console.log('IN ITEMS TABLE');
    console.log(this.props.removeItem);
    const finalItemIdx = this.props.todoList.items.length - 1;
    const testArray = this.props.todoList.items.map((todoItem, idx) => {
      let upDisabled = false;
      let downDisabled = false;
      if (idx === 0) upDisabled = true;
      if (finalItemIdx === idx) downDisabled = true;
      return (
        <ListItemCard
          key={todoItem.key}
          listItem={todoItem}
          upDisabled={upDisabled}
          downDisabled={downDisabled}
          removeItem={this.props.removeItem}
        />
      );
    });
    return (
      <div id="list_items_container">
        <div className="list_item_header_card">
          <div
            className="list_item_task_header"
            onClick={() => this.props.sortByTask()}
          >
            Task
          </div>
          <div className="list_item_due_date_header">Due Date</div>
          <div className="list_item_status_header">Status</div>
        </div>
        {testArray}
      </div>
    );
  }
}

export default ListItemsTable;

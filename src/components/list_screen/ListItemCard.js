import React, { Component } from 'react';
import moveUpIcon from '../../images/MoveUp.png';
import moveDownIcon from '../../images/MoveDown.png';
import removeItemIcon from '../../images/RemoveItem.png';

export class ListItemCard extends Component {
  render() {
    // console.log(`LIST ITEM:`);
    // console.log(this.props.listItem);
    // console.log(this.props.upDisabled);
    // console.log(this.props.downDisabled);
    const { listItem, upDisabled, downDisabled, removeItem, moveUpBtn, moveDownBtn} = this.props;
    const completedDiv = listItem.completed ? (
      <div className="list_item_card_completed">Completed</div>
    ) : (
      <div className="list_item_card_not_completed">Pending</div>
    );
    const upButton = (
      <img
        src={moveUpIcon}
        alt="Up Button"
        className={`list_item_up_btn ${upDisabled ? 'disabled' : null}`}
        onClick={() => moveUpBtn(listItem)}
      />
    );
    const downButton = (
      <img
        src={moveDownIcon}
        alt="Down Button"
        className={`list_item_down_btn ${downDisabled ? 'disabled' : null}`}
        onClick={() => moveDownBtn(listItem)}
      />
    );

    return (
      <div className="new_item_div_container">
        <div className="list_item_card">
          <div className="list_item_card_description">
            {listItem.description}
          </div>
          <div className="list_item_card_assigned_to">
            Assigned To: <strong>{listItem.assigned_to}</strong>
          </div>
          <div className="list_item_card_due_date">{listItem.due_date}</div>
          {completedDiv}
        </div>
        <div className="list_item_btn_container">
          {upButton}
          {downButton}
          <img
            src={removeItemIcon}
            alt="Remove Item"
            className="list_item_up_btn"
            onClick={() => removeItem(listItem)}
          />
        </div>
      </div>
    );
  }
}

export default ListItemCard;

import React, { Component } from "react";
import PropTypes from "prop-types";

export class ItemScreen extends Component {
  constructor(props) {
    super(props);
    let assigned_to, completed, description, due_date;
    if(this.props.todoItem) {
      // if edit item, not add item
      ({assigned_to, completed, description, due_date} = this.props.todoItem);
    } else {
      // if add item
      completed = false; // just incase user left it null
    }
        this.state = {
          assigned_to,
          completed,
          description,
          due_date
        };

    this.handleInputChange = this.handleInputChange.bind(this);
  }


  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  submitChanges = () => {};

  render() {
    console.log("IN ITEM SCREEN");
    console.log("STATE (ITEM SCREEN)");
    console.log(this.state)
    console.log("PROPS (ITEM SCREEN)");
    console.log(this.props)

    const { assigned_to, completed, description, due_date } = this.state;
    const { loadListFromItem, editItem } = this.props;
    return (
      <div id="edit_item_container">
        <div id="item_heading">Item</div>
        <div id="item_form_container">
          <div
            className="item_form_values_container"
            id="item_description_container"
          >
            <p className="item_prompts" id="item_description_prompt">
              Description:
            </p>
            <div className="item_field_container">
              <input
                type="text"
                id="item_description_textfield"
                name="description"
                value={description}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div
            className="item_form_values_container"
            id="item_assigned_to_container"
          >
            <p className="item_prompts" id="item_assigned_to_prompt">
              Assigned to:
            </p>
            <div className="item_field_container">
              <input
                type="text"
                id="item_assigned_to_textfield"
                name="assigned_to"
                value={assigned_to}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div
            className="item_form_values_container"
            id="item_due_date_container"
          >
            <p className="item_prompts" id="item_due_date_prompt">
              Due Date:
            </p>
            <div className="item_field_container">
              <input
                type="date"
                id="item_due_date_picker"
                name="due_date"
                value={due_date}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div
            className="item_form_values_container"
            id="item_completed_container"
          >
            <p className="item_prompts" id="item_completed_prompt">
              Completed:
            </p>
            <div id="checkbox_field_container" className="item_field_container">
              <input
                type="checkbox"
                id="item_completed_checkbox"
                name="completed"
                checked={completed}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div id="item_completed_container">
            <input
              type="submit"
              id="item_form_submit_button"
              value="Submit"
              name="submit"
              onClick={() => editItem(this.state)}
              // onClick={() => console.log(editItem)}
            />
            <input
              type="submit"
              id="item_form_cancel_button"
              value="Cancel"
              name="cancel"
              onClick={() => loadListFromItem()}
            />
          </div>
        </div>
      </div>
    );
  }
}

ItemScreen.propTypes = {
  currentScreen: PropTypes.string.isRequired
};

export default ItemScreen;

import React, { Component } from "react";

export class ListModal extends Component {
  constructor(props) {
    super(props);
    this.state = { modalClassName: "is_visible" };
  }

  deleteList = false;

  closeModal = () => {
    this.setState({ modalClassName: "is_visible modal_slide_out" });
  };

  render() {
    return (
      <div
        id="modal_yes_no_dialog"
        onAnimationEnd={() => {
          if (this.state.modalClassName === "is_visible modal_slide_out") {
            this.props.removeModal(this.deleteList);
          }
        }}
        className={this.state.modalClassName}
      >
        <div className="modal_content">
          <p id="delete_text">Delete list?</p>
          <p id="delete_confirm_text">
            Are you sure you want to delete this list?
          </p>
          <div id="yes_no_btns">
            <button
              id="yes_modal_button"
              onClick={() => {
                this.deleteList = true;
                this.closeModal();
              }}
            >
              Yes
            </button>
            <button id="no_modal_button" onClick={this.closeModal}>
              No
            </button>
          </div>
          <p id="delete_warning">The list will not be retrievable.</p>
        </div>
      </div>
    );
  }
}

export default ListModal;

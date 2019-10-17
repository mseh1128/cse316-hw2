import React, { Component } from "react";

import ListModal from "./ListModal";

export class ListTrash extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  removeModal = deleteList => {
    this.setState({ showModal: false });
    if (deleteList) {
      this.props.removeList();
    }
  };

  render() {
    const { showModal } = this.state;
    let modalToShow = null;
    if (showModal)
      modalToShow = <ListModal removeModal={this.removeModal.bind(this)} />;
    return (
      <div>
        {modalToShow}
        <div id="list_trash" onClick={() => this.setState({ showModal: true })}>
          &#128465;
        </div>
      </div>
    );
  }
}

export default ListTrash;

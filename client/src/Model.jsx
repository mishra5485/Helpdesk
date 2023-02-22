import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Launch Modal
        </Button>

        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>My Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>This is the body of the modal.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default MyModal;

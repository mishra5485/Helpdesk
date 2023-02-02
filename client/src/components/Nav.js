import React, { Component } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default class Nav extends Component {
  constructor() {
    super();
    this.state = {
      showNav: false,
      modal: false,
      Subject: "",
      Body: "",
      Department: "",
    };
  }

  toggleShow = () => this.setState({ modal: !this.state.modal });

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/create-ticket", {
          subject: this.state.Subject,
          body: this.state.Body,
          department_id: this.state.Department,
          user_id: "20",
          status: "Pending",
        })
        .then((response) => {
          console.log(response.data);
        });
    } catch (err) {
      console.log(err);
    }
    this.setState({ modal: false });
  };

  handleLogout = () => {
    localStorage.clear();
  };

  render() {
    return (
      <>
        <MDBNavbar expand="lg" light bgColor="light">
          <MDBContainer fluid>
            <MDBNavbarBrand>
              <MDBNavbarLink>
                <Link to="/dashboard">SlashRtc</Link>
              </MDBNavbarLink>
            </MDBNavbarBrand>
            <MDBNavbarToggler
              type="button"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => this.setState({ showNav: !this.state.showNav })}
            >
              <MDBIcon icon="bars" fas />
            </MDBNavbarToggler>
            <MDBCollapse navbar show={this.state.showNav}>
              <MDBNavbarNav style={{ justifyContent: "end" }}>
                <MDBNavbarItem>
                  <MDBNavbarLink onClick={this.toggleShow}>
                    Create Ticket
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink>UserName</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink>
                    <Link to="/" onClick={this.handleLogout}>
                      LogOut
                    </Link>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>

        <MDBModal
          show={this.state.modal}
          setShow={!this.state.modal}
          tabIndex="-1"
        >
          <MDBModalDialog>
            <Form onSubmit={this.handleSubmit}>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Create-Ticket</MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={this.toggleShow}
                  ></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <FloatingLabel
                    controlId="floatingTextarea1"
                    label="Subject"
                    className="mb-3"
                  >
                    <Form.Control
                      as="textarea"
                      required
                      placeholder="Leave a comment here"
                      style={{ height: "60px", resize: "none" }}
                      onChange={(e) =>
                        this.setState({ Subject: e.target.value })
                      }
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingTextarea2"
                    label="Body"
                    className="mb-3"
                  >
                    <Form.Control
                      as="textarea"
                      required
                      placeholder="Leave a comment here"
                      style={{ height: "150px", resize: "none" }}
                      onChange={(e) => this.setState({ Body: e.target.value })}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingSelectGrid"
                    label="Department"
                  >
                    <Form.Control
                      as="select"
                      required
                      aria-label="Floating label select example"
                      onChange={(e) =>
                        this.setState({ Department: e.target.value })
                      }
                    >
                      <option>please select Department</option>
                      <option value="L1">L1</option>
                      <option value="L2">L2</option>
                      <option value="L3">L3</option>
                    </Form.Control>
                  </FloatingLabel>
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn color="secondary" onClick={this.toggleShow}>
                    Close
                  </MDBBtn>
                  <MDBBtn>Submit</MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </Form>
          </MDBModalDialog>
        </MDBModal>
      </>
    );
  }
}

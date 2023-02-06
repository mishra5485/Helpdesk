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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default class Nav extends Component {
  constructor() {
    super();
    this.state = {
      showNav: false,
      modal: false,
      name: "",
      email: "",
      password: "",
      department_name: "",
    };
  }

  toggleShow = () => this.setState({ modal: !this.state.modal });

  handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/employees/register", {
        name: this.state.name,
        email: this.state.name,
        password: this.state.name,
        department_name: this.state.name,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });

    this.setState({ modal: false });
  };

  handleLogout = () => {
    localStorage.clear();
  };

  render() {
    return (
      <>
        <div className="form-group">
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="dark"
          />
        </div>
        <MDBNavbar expand="lg" light bgColor="light">
          <MDBContainer fluid>
            <MDBNavbarBrand>SlashRTC</MDBNavbarBrand>
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
                    Create Employee
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <Link to="/admin/employee/table">
                    <MDBNavbarLink>Manage Employees</MDBNavbarLink>
                  </Link>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <Link to="/admin/ticket/table">
                    <MDBNavbarLink>Tickets</MDBNavbarLink>
                  </Link>
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
                  <MDBModalTitle>Create-Employee</MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={this.toggleShow}
                  ></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Employee Name"
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      type="text"
                      placeholder="name@example.com"
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      type="email"
                      placeholder="name@example.com"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Password"
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      type="password"
                      placeholder="Password"
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
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
                        this.setState({ department_name: e.target.value })
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

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
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import toast, { Toaster } from "react-hot-toast";

export default class Nav extends Component {
  constructor() {
    super();
    this.state = {
      showNav: false,
      showModal: false,
      Subject: "",
      Body: "",
      Department: "",
      username: "",
    };
  }

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const Usertoken = localStorage.getItem("token");
    const localusername = await localStorage.getItem("username");
    this.setState({ username: localusername });

    const config = {
      headers: { Authorization: `Bearer ${Usertoken}` },
    };
    const data = {
      subject: this.state.Subject,
      body: this.state.Body,
      department_name: this.state.Department,
      user_id: 21,
    };

    try {
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/tickets/create-ticket`,
          data,
          config
        )
        .then((response) => {
          if (response.status === 200) {
            toast.success(response.data);
            this.handleClose();
          } else {
            if (response.status === 400) {
              toast.error(response.data);
            }
          }
        });
    } catch (err) {
      console.log(err);
    }
    this.setState({ modal: false });
  };

  handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successfully");
  };

  activeStyle = {
    background: "lightblue",
    color: "black",
    padding: "10px",
    borderRadius: "10px",
  };

  linkstyle = {
    color: "black",
  };

  render() {
    return (
      <>
        <Toaster position="top-center" />
        <MDBNavbar expand="lg" light bgColor="light">
          <MDBContainer fluid>
            <MDBNavbarBrand>SlashRtc</MDBNavbarBrand>
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
                  <MDBNavbarLink onClick={this.handleShow}>
                    Create Ticket
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink>
                    <NavLink
                      style={({ isActive }) =>
                        isActive ? this.activeStyle : this.linkstyle
                      }
                      to="/employee/departmenttickets"
                    >
                      My Department-Tickets
                    </NavLink>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink>
                    <NavLink
                      style={({ isActive }) =>
                        isActive ? this.activeStyle : this.linkstyle
                      }
                      to="/employee/alltickets"
                    >
                      All-Tickets
                    </NavLink>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink>
                    <NavLink
                      style={({ isActive }) =>
                        isActive ? this.activeStyle : this.linkstyle
                      }
                      to="/employee/mytickets"
                    >
                      My-Tickets
                    </NavLink>
                  </MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <MDBNavbarLink>
                    <NavLink
                      style={({ isActive }) =>
                        isActive ? this.activeStyle : this.linkstyle
                      }
                      to="/employee/profile"
                    >
                      <PersonIcon />
                      {`${localStorage.getItem("username")}`}
                    </NavLink>
                  </MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <MDBDropdown>
                    <MDBDropdownToggle
                      tag="a"
                      className="nav-link"
                      role="button"
                    >
                      Profile & LogOut
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem link>
                        <NavLink
                          style={({ isActive }) =>
                            isActive ? this.activeStyle : this.linkstyle
                          }
                          to="/employee/profile"
                        >
                          <PersonIcon />
                          {`${localStorage.getItem("username")}`}
                        </NavLink>
                      </MDBDropdownItem>
                      <MDBDropdownItem link>
                        <NavLink to="/" onClick={this.handleLogout}>
                          LogOut
                        </NavLink>
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Create-Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                  onChange={(e) => this.setState({ Subject: e.target.value })}
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
              <FloatingLabel controlId="floatingSelectGrid" label="Department">
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
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                type="button"
                onClick={this.handleClose}
              >
                Close
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={this.handleSubmit}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
}

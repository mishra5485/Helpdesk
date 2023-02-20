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
import PersonIcon from "@mui/icons-material/Person";
import toast, { Toaster } from "react-hot-toast";

export default class Nav extends Component {
  constructor() {
    super();
    this.state = {
      showNav: false,
      modal: false,
      username: "",
      email: "",
      password: "",
      department: "",
    };
  }

  toggleShow = () => this.setState({ modal: !this.state.modal });

  handleSubmit = async (e) => {
    e.preventDefault();
    const Usertoken = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${Usertoken}` },
    };
    const data = {
      name: this.state.username,
      password: this.state.password,
      department_name: this.state.department,
      email: this.state.email,
    };

    try {
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/employees/register`,
          data,
          config
        )
        .then((response) => {
          console.log(response);
          toast.success(response.data);
        });
    } catch (err) {
      toast.error(err);
    }
    this.setState({ modal: false });
  };

  handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successfully");
  };

  render() {
    return (
      <>
        <Toaster position="top-right" />
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
                  <MDBNavbarLink>
                    <Link to="/admin/tickettable">Manage Tickets</Link>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink onClick={this.toggleShow}>
                    Create Employee
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink>
                    <Link to="/admin/employeetable">Manage Employee</Link>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <MDBNavbarLink>{`${localStorage.getItem(
                    "username"
                  )}`}</MDBNavbarLink>
                  <PersonIcon />
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
                    label="UserName"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="name@example.com"
                      autoComplete="off"
                      onChange={(e) =>
                        this.setState({ username: e.target.value })
                      }
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      autoComplete="off"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Password"
                    className="mb-3"
                  >
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      autoComplete="off"
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
                        this.setState({ department: e.target.value })
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

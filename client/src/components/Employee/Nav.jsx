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
                  <MDBNavbarLink>
                    <NavLink
                      style={({ isActive }) =>
                        isActive ? this.activeStyle : this.linkstyle
                      }
                      onClick={this.handleLogout}
                      to="/"
                    >
                      LogOut
                    </NavLink>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      </>
    );
  }
}

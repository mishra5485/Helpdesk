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

import PersonIcon from "@mui/icons-material/Person";
import toast, { Toaster } from "react-hot-toast";

export default class Nav extends Component {
  constructor() {
    super();
    this.state = {
      showNav: false,
      showModal: false,
      username: "",
    };
  }

  handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successfully");
    this.props.navigate("/");
  };

  activeStyle = {
    background: "lightblue",
    color: "black",
    padding: "10px",
    borderRadius: "10px",
    marginleft: "2px",
    marginright: "2px",
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
                <MDBNavbarItem
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <NavLink
                    style={({ isActive }) =>
                      isActive ? this.activeStyle : this.linkstyle
                    }
                    to="/user/usertickets"
                  >
                    My Tickets
                  </NavLink>
                </MDBNavbarItem>
                <MDBNavbarItem
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <NavLink
                    style={({ isActive }) =>
                      isActive ? this.activeStyle : this.linkstyle
                    }
                    to="/user/profile"
                  >
                    <PersonIcon />
                    {`${localStorage.getItem("username")}`}
                  </NavLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink>
                    <NavLink to="/" onClick={this.handleLogout}>
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

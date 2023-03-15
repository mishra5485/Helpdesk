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
import { connect } from "react-redux";
import { LoginData } from "../../action/Action";

const mapStatetoProps = (props) => {
  return {
    log: props.LoginUserData,
  };
};

const DispatchToProps = (dispatch) => {
  return {
    LoggedIn: (logindata) => dispatch(LoginData(logindata)),
  };
};

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      department: "",
    };
  }

  handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successfully");
    this.props.navigate("/");
    this.props.LoggedIn(null);
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
                      to="/admin/ticketstable"
                    >
                      Manage Tickets
                    </NavLink>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink>
                    <NavLink
                      style={({ isActive }) =>
                        isActive ? this.activeStyle : this.linkstyle
                      }
                      to="/admin/employeetable"
                    >
                      Manage Employee
                    </NavLink>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink>
                    <NavLink
                      style={({ isActive }) =>
                        isActive ? this.activeStyle : this.linkstyle
                      }
                      to="/admin/departments"
                    >
                      Departments
                    </NavLink>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <NavLink
                    to="/admin/profile"
                    style={({ isActive }) =>
                      isActive ? this.activeStyle : this.linkstyle
                    }
                  >
                    <PersonIcon />
                    {this.props.log.username}
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

export default connect(mapStatetoProps, DispatchToProps)(Nav);

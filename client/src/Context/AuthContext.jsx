import React, { Component } from "react";
const AuthContext = React.createContext();

export class AuthProvider extends Component {
  state = {
    username: "harsh",
    picture: "lkjjhghftgchjbkj",
    departmentname: "L2",
    access: "employee",
    id: "2165116515",
    token: "vghkjhgjhbwfkjehriekhglwhgkjwngkjwehkjewnvjknewlkjvnjk",
    isAuthenticated: false,
  };

  login = (data) => {
    const { username, picture, departmentname, access, id, token } = data;
    this.setState({
      username: username,
      picture: picture,
      departmentname: departmentname,
      access: access,
      id: id,
      token: token,
      isAuthenticated: true,
    });
  };

  logout = () => {
    this.setState({
      username: "",
      picture: "",
      departmentname: "",
      access: "",
      id: "",
      token: "",
      isAuthenticated: false,
    });
  };

  render() {
    const {
      username,
      picture,
      departmentname,
      access,
      id,
      token,
      isAuthenticated,
    } = this.state;
    const { login, logout } = this;
    return (
      <AuthContext.Provider
        value={{
          username,
          picture,
          departmentname,
          access,
          id,
          token,
          isAuthenticated,
          login,
          logout,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContext;

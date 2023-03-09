import React, { Component } from "react";
const AuthContext = React.createContext();

export class AuthProvider extends Component {
  state = {
    username: "",
    isAuthenticated: false,
  };

  login = () => {
    this.setState({
      username: "Bob",
      isAuthenticated: true,
    });
  };

  logout = () => {
    this.setState({
      username: "",
      isAuthenticated: false,
    });
  };

  render() {
    const { username, isAuthenticated } = this.state;
    const { login, logout } = this;
    return (
      <AuthContext.Provider
        value={{
          username,
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

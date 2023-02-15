import React, { Component } from "react";

const AuthContext = React.createContext();

export class AuthProvider extends Component {
  state = {
    username: "",
    token: "",
    accesslvl: "",
    isAuthenticated: false,
  };

  logIn = () => {
    this.setState({
      username: "HarshMishra",
      token: "",
      accesslvl: "User",
      isAuthenticated: true,
    });
  };

  logOut = () => {
    this.setState({
      username: "HarshMishra",
      token: "",
      accesslvl: "User",
      isAuthenticated: false,
    });
  };
  render() {
    const { username, token, accesslvl, isAuthenticated } = this.state;
    const { logIn, logOut } = this;
    return (
      <AuthContext.Provider
        value={{
          username,
          isAuthenticated,
          token,
          accesslvl,
          logIn,
          logOut,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContext;

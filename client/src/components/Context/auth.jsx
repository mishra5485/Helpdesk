import React, { createContext, useContext, Component } from "react";

const AuthContext = createContext(null);

class AuthProvider extends Component {
  state = {
    user: null,
    token: null,
  };

  login = (user) => {
    this.setState({ user });
  };

  logout = () => {
    this.setState({ user: null });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          user: this.state.user,
          token: this.state.token,
          login: this.login,
          logout: this.logout,
          setUser: (user) => this.setState({ user }),
          setToken: (token) => this.setState({ token }),
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };

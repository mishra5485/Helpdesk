import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class RequireAuth extends Component {
  state = {
    TokenValue: localStorage.getItem("token"),
  };

  render() {
    if (!this.state.TokenValue) {
      return <Navigate to="/" />;
    }

    return this.props.children;
  }
}

export default RequireAuth;

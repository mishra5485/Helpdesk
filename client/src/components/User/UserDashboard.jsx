import React, { Component } from "react";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";

export default class UserDashBoard extends Component {
  render() {
    return (
      <>
        <Nav />
        <Outlet />
      </>
    );
  }
}

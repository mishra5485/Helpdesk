import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

export default class EmployeeDashboard extends Component {
  render() {
    return (
      <>
        <Nav />
        <Outlet />
      </>
    );
  }
}

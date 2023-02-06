import React, { Component } from "react";
import Nav from "./Nav";
import UserTickets from "./UserTickets";
export default class DashBoard extends Component {
  render() {
    return (
      <>
        <Nav />
        <UserTickets />
      </>
    );
  }
}

import React, { Component } from "react";
import Nav from "./Nav";
import TicketsTable from "./TicketsTable";

export default class DashBoard extends Component {
  render() {
    return (
      <>
        <Nav />
        <TicketsTable />
      </>
    );
  }
}

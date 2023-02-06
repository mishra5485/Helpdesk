import React, { Component } from "react";
import Navbar from "./Navbar";
import TicketsTable from "./TicketsTable";

export default class DashBoard extends Component {
  render() {
    return (
      <>
        <Navbar />
        <TicketsTable />
      </>
    );
  }
}

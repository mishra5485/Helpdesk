import React, { Component } from "react";
import Nav from "./Nav";
import Smptable from "./Smptable";

export default class DashBoard extends Component {
  render() {
    return (
      <>
        <Nav />
        <Smptable />
      </>
    );
  }
}

import React, { Component } from "react";
class Reset extends Component {
  componentDidMount() {
    const objid = this.props.match.params.token;
    console.log(objid);
  }
  state = {};
  render() {
    return "hi";
  }
}

export default Reset;

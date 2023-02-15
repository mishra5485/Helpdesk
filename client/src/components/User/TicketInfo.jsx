import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import axios from "axios";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class TicketInfo extends Component {
  state = {
    userid: "",
    subject: "",
    body: "",
    departmentname: "",
    status: "",
    CreatedAt: "",
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.getdata(id);
  }

  getdata = async (id) => {
    const Usertoken = localStorage.getItem("token");
    console.log(Usertoken);
    const config = {
      headers: { Authorization: `Bearer ${Usertoken}` },
    };

    try {
      let resp = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/tickets/${id}`,
        config
      );
      console.log(resp.data);
      this.setState({
        userid: resp.data.user_id,
        subject: resp.data.subject,
        body: resp.data.body,
        departmentname: resp.data.department_name,
        status: resp.data.status,
        CreatedAt: resp.data.createdDate,
      });
    } catch (err) {
      console.log(err);
    }
  };

  handlesubmit = (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <MDBContainer fluid>
        <form onSubmit={this.handlesubmit}>
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol col="12">
              <MDBCard
                className="bg-white my-5 mx-auto"
                style={{ borderRadius: "1rem", maxWidth: "1100px" }}
              >
                <MDBCardBody className="p-5 w-100 d-flex flex-column">
                  <h4>
                    Ticket Id
                    <MDBBadge className="ms-2">{this.state.userid}</MDBBadge>
                  </h4>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>
    );
  }
}

export default withRouter(TicketInfo);

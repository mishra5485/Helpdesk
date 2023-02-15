import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBBtn,
  MDBCardFooter,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import moment from "moment";

class TicketInfo extends Component {
  state = {
    userid: "",
    subject: "",
    body: "",
    departmentname: "",
    status: "",
    CreatedAt: "",
    msg: "",
  };
  ticketmsg = [
    {
      content: "enquiry22",
      createdBy: "Employee",
      userName: "amitsin",
      createdAt: 1676456339,
    },
    {
      content: "enquiry22",
      createdBy: "User",
      userName: "HarshM",
      createdAt: 1676456339,
    },
    {
      content: "enquiry22",
      createdBy: "Employee",
      userName: "amitsin",
      createdAt: 1676456339,
    },
    {
      content: "enquiry22",
      createdBy: "Employee",
      userName: "amitsin",
      createdAt: 1676456339,
    },
    {
      content: "enquiry22",
      createdBy: "User",
      userName: "HarshM",
      createdAt: 1676456339,
    },
    {
      content: "enquiry22",
      createdBy: "User",
      userName: "HarshM",
      createdAt: 1676456339,
    },
    {
      content: "enquiry22",
      createdBy: "Employee",
      userName: "amitsin",
      createdAt: 1676456339,
    },
    {
      content: "enquiry22",
      createdBy: "User",
      userName: "HarshM",
      createdAt: 1676456339,
    },
    {
      content: "enquiry22",
      createdBy: "Employee",
      userName: "amitsin",
      createdAt: 1676456339,
    },
    {
      content: "enquiry22",
      createdBy: "User",
      userName: "HarshM",
      createdAt: 1676456339,
    },
    {
      content: "enquiry22",
      createdBy: "User",
      userName: "HarshM",
      createdAt: 1676456339,
    },
    {
      content: "enquiry22",
      createdBy: "Employee",
      userName: "amitsin",
      createdAt: 1676456339,
    },
    {
      content: "enquiry22",
      createdBy: "User",
      userName: "HarshM",
      createdAt: 1676456339,
    },
    {
      content: "enquiry22",
      createdBy: "Employee",
      userName: "amitsin",
      createdAt: 1676456339,
    },
    {
      content: "enquiry22",
      createdBy: "Employee",
      userName: "amitsin",
      createdAt: 1676456339,
    },
    {
      content: "enquiry22",
      createdBy: "User",
      userName: "HarshM",
      createdAt: 1676456339,
    },
    {
      content: "enquiry22",
      createdBy: "User",
      userName: "HarshM",
      createdAt: 1676456339,
    },
    {
      content: "enquiry22",
      createdBy: "Employee",
      userName: "amitsin",
      createdAt: 1676456339,
    },
    {
      content: "enquiry22",
      createdBy: "User",
      userName: "HarshM",
      createdAt: 1676456339,
    },
    {
      content: "enquiry22",
      createdBy: "Employee",
      userName: "amitsin",
      createdAt: 1676456339,
    },
  ];
  componentDidMount() {
    const id = this.props.match.params.id;
    this.getdata(id);
  }

  getdata = async (id) => {
    const Usertoken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${Usertoken}` },
    };

    try {
      let resp = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/tickets/${id}`,
        config
      );
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
    alert(this.state.msg);
  };
  render() {
    return (
      <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
        <MDBRow className="d-flex justify-content-center">
          <MDBCol md="8" lg="10" xl="10">
            <MDBCard>
              <div>
                <p className="mt-5">
                  <Link to="users/dashboard" className="text-dark-50 fw-bold">
                    Back to Table
                  </Link>
                </p>
              </div>
              <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
                <MDBContainer>
                  <MDBRow between className="mt-3">
                    <MDBCol size="4">
                      <MDBRow className="mt-3">
                        <MDBCol size="6" style={{ fontWeight: "bold" }}>
                          TicketId:
                        </MDBCol>
                        <MDBCol size="6">#{this.state.userid}</MDBCol>
                      </MDBRow>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow between className="mt-3">
                    <MDBCol size="4">
                      <MDBRow className="mt-3">
                        <MDBCol size="6" style={{ fontWeight: "bold" }}>
                          CreatedOn:
                        </MDBCol>
                        <MDBCol size="6">{this.state.CreatedAt}</MDBCol>
                      </MDBRow>
                    </MDBCol>
                    <MDBCol size="4">
                      <MDBRow className="mt-3">
                        <MDBCol size="6" style={{ fontWeight: "bold" }}>
                          AssignedTo:
                        </MDBCol>
                        <MDBCol size="6">{this.state.departmentname}</MDBCol>
                      </MDBRow>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow between className="mt-3">
                    <MDBCol size="4">
                      <MDBRow className="mt-3">
                        <MDBCol size="6" style={{ fontWeight: "bold" }}>
                          Status:
                        </MDBCol>
                        <MDBCol size="6">{this.state.status}</MDBCol>
                      </MDBRow>
                    </MDBCol>
                    <MDBCol size="4">
                      <MDBRow className="mt-3">
                        <MDBCol size="6" style={{ fontWeight: "bold" }}>
                          Userid:
                        </MDBCol>
                        <MDBCol size="6">{this.state.userid}</MDBCol>
                      </MDBRow>
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
              </MDBCardHeader>
              <MDBContainer fluid>
                <MDBRow className="mt-3 d-flex p-2 ml-10">
                  <MDBCol size="2" style={{ fontWeight: "bold" }}>
                    Subject:
                  </MDBCol>
                  <MDBCol size="10">{this.state.subject}</MDBCol>
                </MDBRow>

                <MDBRow className="mt-3 d-flex p-2 ml-10">
                  <MDBCol size="2" style={{ fontWeight: "bold" }}>
                    Body:
                  </MDBCol>
                  <MDBCol size="10">{this.state.body}</MDBCol>
                </MDBRow>
              </MDBContainer>
              <hr />
              <MDBCardBody>
                {this.ticketmsg.map((elem, key) => {
                  return (
                    <>
                      {elem.createdBy === "Employee" ? (
                        <>
                          <div className="d-flex justify-content-between">
                            <p className="small mb-1">{elem.userName}</p>
                            <p className="small mb-1 text-muted">
                              {moment
                                .unix(elem.createdAt)
                                .format("MMMM Do YYYY, h:mm:ss a")}
                            </p>
                          </div>
                          <div className="d-flex flex-row justify-content-start">
                            <img
                              src="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
                              alt="avatar 1"
                              style={{ width: "45px", height: "100%" }}
                            />
                            <div>
                              <p
                                className="small p-2 ms-3 mb-3 rounded-3"
                                style={{ backgroundColor: "#9FA6B2" }}
                              >
                                {elem.content}
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="d-flex justify-content-between">
                            <p className="small mb-1 text-muted">
                              {moment
                                .unix(elem.createdAt)
                                .format("MMMM Do YYYY, h:mm:ss a")}
                            </p>
                            <p className="small mb-1">{elem.userName}</p>
                          </div>
                          <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                            <div>
                              <p className="small p-2 me-3 mb-3 text-white rounded-3 bg-info">
                                {elem.content}
                              </p>
                            </div>
                            <img
                              src="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
                              alt="avatar 1"
                              style={{ width: "45px", height: "100%" }}
                            />
                          </div>
                        </>
                      )}
                    </>
                  );
                })}
              </MDBCardBody>
              <form onSubmit={this.handlesubmit}>
                <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
                  <MDBInputGroup className="mb-0">
                    <textarea
                      className="form-control"
                      placeholder="Type message"
                      type="text"
                      style={{ height: "60px", resize: "none" }}
                      onChange={(e) => this.setState({ msg: e.target.value })}
                      required
                    />

                    <MDBBtn color="primary" style={{ paddingTop: ".55rem" }}>
                      Send
                    </MDBBtn>
                  </MDBInputGroup>
                </MDBCardFooter>
              </form>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default withRouter(TicketInfo);

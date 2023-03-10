import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBBtn,
  MDBCardBody,
} from "mdb-react-ui-kit";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { withRouter } from "../withRouter";

class EmployeeTicketinfo extends Component {
  state = {
    ticketNumber: "",
    user: {},
    subject: "",
    body: "",
    departmentname: "",
    status: "",
    CreatedAt: "",
    msg: "",
    assigned: {},
    file: null,
    resmsg: [],
    toggle: true,
  };

  componentDidMount() {
    const objid = this.props.params.id;
    this.getdata(objid);
  }

  getdata = async (objid) => {
    const Usertoken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${Usertoken}` },
    };

    try {
      let resp = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/tickets/${objid}`,
        config
      );
      if (resp.status === 200) {
        this.setState({
          user: resp.data.user,
          TicketNumber: resp.data.ticketNumber,
          subject: resp.data.subject,
          body: resp.data.body,
          departmentname: resp.data.department_name,
          status: resp.data.status,
          CreatedAt: resp.data.createdDate,
          resmsg: resp.data.comments,
          assigned: resp.data.assigned,
        });
        toast.success("Ticket Fetched Successfully ");
      } else {
        if (resp.status === 404) {
          toast.error(resp.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  handlesubmit = async (e) => {
    e.preventDefault();
    const objid = this.props.match.params.id;
    const Usertoken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${Usertoken}` },
    };
    const data = {
      id: objid,
      content: this.state.msg,
      createdBy: localStorage.getItem("access"),
      userName: localStorage.getItem("username"),
      type: "text",
    };
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/tickets/comment`, data, config)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Msg sent successfully");
          this.getdata(objid);
          this.setState({ msg: "" });
        } else {
          if (response.status === 400) {
            toast.error(response.data);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid response");
      });
  };

  handleFileSubmit = async (e) => {
    e.preventDefault();
    const objid = this.props.match.params.id;

    const Usertoken = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${Usertoken}` },
    };

    const formData = new FormData();
    formData.append("avatar", this.state.file);
    formData.append("id", objid);
    formData.append("createdBy", localStorage.getItem("access"));
    formData.append("userName", localStorage.getItem("username"));
    formData.append("type", "image");

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/tickets/comment`,
        formData,
        config
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("File Sent Successfully");
          this.getdata(objid);
        } else {
          if (res.status === 400) {
            toast.error(res.data);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ClaimTicket = async (e) => {
    const objid = this.props.params.id;
    const Usertoken = localStorage.getItem("token");
    const UserId = localStorage.getItem("id");
    const username = localStorage.getItem("username");
    const config = {
      headers: { Authorization: `Bearer ${Usertoken}` },
    };
    const data = {
      assigned: {
        user_name: username,
        user_id: UserId,
      },
    };
    console.log(data);
    try {
      let resp = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/tickets/claim/${objid}`,
        data,
        config
      );
      if (resp.status === 200) {
        toast.success("Ticket Claimed Successfully ");
        this.getdata();
      } else {
        if (resp.status === 404) {
          toast.error(resp.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <>
        <Toaster position="top-center" />
        <MDBContainer
          fluid
          className="py-5"
          style={{ backgroundColor: "#eee", height: "100vh" }}
        >
          <MDBRow className="d-flex justify-content-center p-5 ">
            <MDBCol sm="10" md="10" lg="10" xl="8">
              <MDBCard>
                <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
                  <MDBContainer fluid>
                    <MDBRow className="mt-3">
                      <MDBCol
                        style={{
                          textAlign: "end",
                          fontSize: "1.5rem",
                          textAlign: "start",
                        }}
                      >
                        <label className="fw-bold"> Ticket Number:</label>
                        <label className="mx-3">
                          {this.state.TicketNumber}
                        </label>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow className="mt-3">
                      <MDBCol
                        sm="12"
                        md="12"
                        lg="6"
                        className="my-3 font"
                        style={{
                          textAlign: "end",
                          fontSize: "1.2rem",
                          textAlign: "start",
                        }}
                      >
                        <label className="fw-bold">CreatedOn:</label>&nbsp;
                        <label className="mx-3">{this.state.CreatedAt}</label>
                      </MDBCol>
                      <MDBCol
                        sm="12"
                        md="12"
                        lg="6"
                        className="my-3"
                        style={{
                          textAlign: "end",
                          fontSize: "1.2rem",
                          textAlign: "start",
                        }}
                      >
                        <label className="fw-bold">AssignedTo:</label>&nbsp;
                        <label className="mx-3">
                          {this.state.departmentname}
                        </label>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="mt-3">
                      <MDBCol
                        sm="12"
                        md="12"
                        lg="6"
                        className="my-3"
                        style={{
                          textAlign: "end",
                          fontSize: "1.2rem",
                          textAlign: "start",
                        }}
                      >
                        <label className="fw-bold">Status:</label>
                        <label className="mx-3">{this.state.status}</label>
                      </MDBCol>
                      <MDBCol
                        sm="12"
                        md="12"
                        lg="6"
                        className="my-3"
                        style={{
                          textAlign: "end",
                          fontSize: "1.2rem",
                          textAlign: "start",
                        }}
                      >
                        <label className="fw-bold">UserName:</label>
                        <label className="mx-3">
                          {this.state.user.user_name}
                        </label>
                      </MDBCol>
                    </MDBRow>
                    {this.state.assigned.user_id ? (
                      <MDBRow className="mt-3">
                        <MDBCol
                          style={{
                            textAlign: "end",
                            fontSize: "1.2rem",
                            textAlign: "start",
                          }}
                        >
                          <label className="fw-bold">Claimed By:</label>
                          <label className="mx-3">
                            {this.state.assigned.user_name}
                          </label>
                        </MDBCol>
                      </MDBRow>
                    ) : null}
                  </MDBContainer>
                </MDBCardHeader>
                <MDBCardBody>
                  <MDBContainer fluid>
                    <MDBRow className="mt-3">
                      <MDBCol
                        className="my-3"
                        style={{
                          textAlign: "end",
                          fontSize: "1.2rem",
                          textAlign: "start",
                        }}
                      >
                        <label className="fw-bold">Subject:</label>
                        <label className="mx-3">{this.state.subject}</label>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="mt-3">
                      <MDBCol
                        className="my-3"
                        style={{
                          textAlign: "end",
                          fontSize: "1.2rem",
                          textAlign: "start",
                        }}
                      >
                        <label className="fw-bold"> Body:</label>
                        <label className="mx-3">{this.state.body}</label>
                      </MDBCol>
                    </MDBRow>
                    {this.state.assigned.user_id === null ? (
                      <MDBRow
                        className="mt-3 d-flex "
                        style={{ justifyContent: "end" }}
                      >
                        <MDBCol size="2">
                          <MDBBtn
                            className="me-1"
                            color="primary"
                            onClick={this.ClaimTicket}
                          >
                            Claim
                          </MDBBtn>
                        </MDBCol>
                      </MDBRow>
                    ) : null}
                  </MDBContainer>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    );
  }
}

export default withRouter(EmployeeTicketinfo);

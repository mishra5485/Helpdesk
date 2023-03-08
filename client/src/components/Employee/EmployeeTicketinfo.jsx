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
  MDBBadge,
} from "mdb-react-ui-kit";
import axios from "axios";
import moment from "moment";
import SendIcon from "@mui/icons-material/Send";
import toast, { Toaster } from "react-hot-toast";
import ModalImage from "react-modal-image";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MessageIcon from "@mui/icons-material/Message";
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
      console.log(resp.data);
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
        {console.log(this.state.assigned)}
        <Toaster position="top-center" />
        <MDBContainer
          fluid
          className="py-5"
          style={{ backgroundColor: "#eee", height: "100vh" }}
        >
          <MDBRow className="d-flex justify-content-center p-5 ">
            <MDBCol sm="8" md="8" lg="8" xl="8">
              <MDBCard>
                <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
                  <MDBContainer fluid>
                    <MDBRow between className="mt-3">
                      <MDBCol size="12">
                        <MDBRow className="mt-3">
                          <MDBCol
                            size="2"
                            style={{
                              fontWeight: "bold",
                              textAlign: "end",
                              fontSize: "1.5rem",
                            }}
                          >
                            TicketId:
                          </MDBCol>
                          <MDBCol
                            size="4"
                            style={{
                              fontWeight: "bolder",
                              fontSize: "1.5rem",
                              textAlign: "start",
                            }}
                          >
                            #{this.state.TicketNumber}
                          </MDBCol>
                        </MDBRow>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow between className="mt-3">
                      <MDBCol size="6">
                        <MDBRow className="mt-3">
                          <MDBCol size="3" style={{ fontWeight: "bold" }}>
                            CreatedOn:
                          </MDBCol>
                          <MDBCol size="6">{this.state.CreatedAt}</MDBCol>
                        </MDBRow>
                      </MDBCol>
                      <MDBCol size="6">
                        <MDBRow className="mt-3">
                          <MDBCol size="3" style={{ fontWeight: "bold" }}>
                            AssignedTo:
                          </MDBCol>
                          <MDBCol size="6">{this.state.departmentname}</MDBCol>
                        </MDBRow>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow between className="mt-3">
                      <MDBCol size="6">
                        <MDBRow className="mt-3">
                          <MDBCol size="3" style={{ fontWeight: "bold" }}>
                            Status:
                          </MDBCol>
                          <MDBCol size="6">{this.state.status}</MDBCol>
                        </MDBRow>
                      </MDBCol>
                      <MDBCol size="6">
                        <MDBRow className="mt-3">
                          <MDBCol size="3" style={{ fontWeight: "bold" }}>
                            UserName:
                          </MDBCol>
                          <MDBCol size="6">{this.state.user.userName}</MDBCol>
                        </MDBRow>
                      </MDBCol>
                    </MDBRow>
                    {this.state.assigned.user_id === !null ? (
                      <MDBRow between className="mt-3">
                        <MDBCol size="6">
                          <MDBRow className="mt-3">
                            <MDBCol size="3" style={{ fontWeight: "bold" }}>
                              Claimed By:
                            </MDBCol>
                            <MDBCol size="6">
                              {this.state.assigned.user_name}
                            </MDBCol>
                          </MDBRow>
                        </MDBCol>
                      </MDBRow>
                    ) : null}
                  </MDBContainer>
                </MDBCardHeader>
                <MDBContainer fluid style={{ padding: "20px" }}>
                  <MDBRow className="mt-3 d-flex px-2 py-2 ml-10">
                    <MDBCol size="1" style={{ fontWeight: "bold" }}>
                      Subject:
                    </MDBCol>
                    <MDBCol size="10">{this.state.subject}</MDBCol>
                  </MDBRow>
                  <MDBRow className="mt-3 d-flex p-2 ml-10">
                    <MDBCol size="1" style={{ fontWeight: "bold" }}>
                      Body:
                    </MDBCol>
                    <MDBCol size="10">{this.state.body}</MDBCol>
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
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    );
  }
}

export default withRouter(EmployeeTicketinfo);

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
import Form from "react-bootstrap/Form";
import toast, { Toaster } from "react-hot-toast";
import ModalImage from "react-modal-image";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MessageIcon from "@mui/icons-material/Message";
import { withRouter } from "../withRouter";
import { connect } from "react-redux";

const mapStatetoProps = (props) => {
  return {
    log: props.LoginUserData,
  };
};

class MyTicketsinfo extends Component {
  state = {
    ticketNumber: "",
    userid: "",
    subject: "",
    body: "",
    departmentname: "",
    priority: "",
    status: "",
    CreatedAt: "",
    msg: "",
    file: null,
    department_list: [],
    resmsg: [],
    toggle: true,
    user: {},
  };

  componentDidMount() {
    const objid = this.props.params.id;
    this.getdata(objid);
    this.getDepartments();
  }

  getDepartments = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/departments/getdepartment`)
      .then((response) => {
        this.setState({ department_list: response.data });
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  getdata = async (objid) => {
    const config = {
      headers: { Authorization: `Bearer ${this.props.log.token}` },
    };

    try {
      let resp = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/tickets/${objid}`,
        config
      );
      console.log(resp.data);
      if (resp.status === 200) {
        this.setState({
          userid: resp.data.user_id,
          TicketNumber: resp.data.ticketNumber,
          subject: resp.data.subject,
          body: resp.data.body,
          departmentname: resp.data.department_name,
          priority: resp.data.priority,
          status: resp.data.status,
          CreatedAt: resp.data.createdDate,
          resmsg: resp.data.comments,
          user: resp.data.user,
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
    const objid = this.props.params.id;

    const config = {
      headers: { Authorization: `Bearer ${this.props.log.token}` },
    };
    const data = {
      id: objid,
      content: this.state.msg,
      createdBy: this.props.log.access_level,
      userName: this.props.log.username,
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
    const objid = this.props.params.id;

    const config = {
      headers: { Authorization: `Bearer ${this.props.log.token}` },
    };

    const formData = new FormData();
    formData.append("avatar", this.state.file);
    formData.append("id", objid);
    formData.append("createdBy", this.props.log.access_level);
    formData.append("userName", this.props.log.username);
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

  empUpdate = async (e) => {
    e.preventDefault();

    const objid = this.props.params.id;
    console.log(objid);

    const config = {
      headers: { Authorization: `Bearer ${this.props.log.token}` },
    };

    const data = {
      department_name: this.state.departmentname,
      status: this.state.status,
      priority: this.state.priority,
    };

    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/tickets/update/${objid}`,
        data,
        config
      )

      .then((response) => {
        if (response.status === 200) {
          toast.success("Tickets detail updated");
        } else {
          if (response.status === 400) {
            toast.error(response.data);
          } else {
            if (response.status === 500) {
              toast.error(response.data);
            }
          }
        }
      })
      .catch((err) => {
        toast.error("Invalid response");
      });
  };

  render() {
    return (
      <>
        {console.log(this.state.user)}
        <Toaster position="top-center" />
        <MDBContainer
          fluid
          className="py-5"
          style={{ backgroundColor: "#eee" }}
        >
          <MDBRow className="d-flex justify-content-center ">
            <MDBCol sm="10" md="10" lg="10" xl="10">
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
                            {this.state.TicketNumber}
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
                            CreatedBy:
                          </MDBCol>
                          <MDBCol size="6">{this.state.user.userName}</MDBCol>
                        </MDBRow>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow between className="mt-3">
                      <MDBCol size="6">
                        <MDBRow className="mt-3">
                          <MDBCol size="3" style={{ fontWeight: "bold" }}>
                            Priority:
                          </MDBCol>
                          <MDBCol size="6">
                            <Form.Select
                              aria-label="Default select example"
                              onChange={(e) =>
                                this.setState({ priority: e.target.value })
                              }
                              value={this.state.priority}
                            >
                              <option disabled>Select option</option>
                              <option value="Low">Low</option>
                              <option value="Medium">Medium</option>
                              <option value="High">High</option>
                            </Form.Select>
                          </MDBCol>
                        </MDBRow>
                      </MDBCol>
                      <MDBCol size="6">
                        <MDBRow className="mt-3">
                          <MDBCol size="3" style={{ fontWeight: "bold" }}>
                            Status:
                          </MDBCol>
                          <MDBCol size="6">
                            <Form.Select
                              aria-label="Default select example"
                              onChange={(e) =>
                                this.setState({ status: e.target.value })
                              }
                              value={this.state.status}
                            >
                              <option disabled>Select option</option>
                              <option value="Open"> Open</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Resolved">Resolved</option>
                            </Form.Select>
                          </MDBCol>
                        </MDBRow>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow between className="mt-3">
                      <MDBCol size="6">
                        <MDBRow className="mt-3">
                          <MDBCol size="3" style={{ fontWeight: "bold" }}>
                            Transfer:
                          </MDBCol>
                          <MDBCol size="6">
                            <Form.Select
                              aria-label="Default select example"
                              onChange={(e) =>
                                this.setState({
                                  departmentname: e.target.value,
                                })
                              }
                              defaultValue="Select Department"
                            >
                              <option disabled>Select Department</option>
                              {this.state.department_list.map((elem, key) => {
                                return (
                                  <option key={key} value={elem}>
                                    {elem}
                                  </option>
                                );
                              })}
                            </Form.Select>
                          </MDBCol>
                        </MDBRow>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow
                      className="mt-3 d-flex "
                      style={{ justifyContent: "end" }}
                    >
                      <MDBCol size="2">
                        <MDBBtn
                          className="me-1"
                          color="primary"
                          onClick={this.empUpdate}
                        >
                          Update
                        </MDBBtn>
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>
                </MDBCardHeader>
                <MDBContainer fluid>
                  <MDBRow className="mt-3 d-flex p-2 ml-10">
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
                </MDBContainer>
                <hr />
                <MDBCardBody>
                  {this.state.resmsg.map((elem, key) => {
                    return (
                      <>
                        {elem.createdBy === "user" ? (
                          <>
                            <div className="d-flex justify-content-between">
                              <p className="small mb-1">{elem.userName}</p>
                            </div>
                            <div className="d-flex flex-row justify-content-start">
                              <img
                                src="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
                                alt="avatar 1"
                                style={{ width: "45px", height: "100%" }}
                              />

                              <div>
                                {elem.type === "text" ? (
                                  <p className="small p-2 me-3 mb-3 text-white rounded-3 bg-info">
                                    {elem.content}
                                  </p>
                                ) : (
                                  <MDBCard style={{ width: "250px" }}>
                                    <ModalImage
                                      small={`http://localhost:5000/uploads/${elem.content}`}
                                      large={`http://localhost:5000/uploads/${elem.content}`}
                                      hideZoom={false}
                                    />
                                    <p className="small mb-1 text-muted">
                                      {moment
                                        .unix(elem.createdAt)
                                        .format("MMMM Do YYYY")}
                                    </p>
                                  </MDBCard>
                                )}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                              <div>
                                {elem.type === "text" ? (
                                  <>
                                    <p className="small p-2 me-3 mb-3 text-white rounded-3 bg-info">
                                      {elem.content}
                                    </p>
                                    <p className="small mb-1 text-muted">
                                      {moment
                                        .unix(elem.createdAt)
                                        .format("MMMM Do YYYY")}
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <div>
                                      <MDBCard style={{ width: "250px" }}>
                                        <ModalImage
                                          small={`http://localhost:5000/uploads/${elem.content}`}
                                          large={`http://localhost:5000/uploads/${elem.content}`}
                                          hideZoom={true}
                                        />
                                      </MDBCard>

                                      <p className="small mb-1 text-muted text-end">
                                        {moment
                                          .unix(elem.createdAt)
                                          .format("MMMM Do YYYY")}
                                      </p>
                                    </div>
                                  </>
                                )}
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
                {this.state.toggle ? (
                  <form onSubmit={this.handlesubmit}>
                    <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
                      <MDBInputGroup className="mb-0">
                        <MDBBadge
                          className="mx-2"
                          color="dark"
                          light
                          onClick={() =>
                            this.setState({ toggle: !this.state.toggle })
                          }
                        >
                          <AttachFileIcon className="m-auto" />
                        </MDBBadge>
                        <textarea
                          className="form-control"
                          placeholder="Type message"
                          type="text"
                          value={this.state.msg}
                          style={{ height: "40px", resize: "none" }}
                          onChange={(e) =>
                            this.setState({ msg: e.target.value })
                          }
                          required
                        />

                        <MDBBtn
                          color="primary"
                          style={{
                            paddingTop: ".55rem",
                          }}
                        >
                          <SendIcon />
                        </MDBBtn>
                      </MDBInputGroup>
                    </MDBCardFooter>
                  </form>
                ) : (
                  <form onSubmit={this.handleFileSubmit}>
                    <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
                      <MDBInputGroup className="mb-3">
                        <MDBBadge
                          className="mx-2 "
                          color="dark"
                          light
                          onClick={() =>
                            this.setState({ toggle: !this.state.toggle })
                          }
                        >
                          <MessageIcon className="m-auto" />
                        </MDBBadge>
                        <input
                          className="form-control"
                          type="file"
                          name="file"
                          style={{ height: "40px", resize: "none" }}
                          onChange={(e) =>
                            this.setState({
                              file: e.target.files[0],
                            })
                          }
                        />
                        <MDBBtn
                          color="primary"
                          style={{ paddingTop: ".55rem" }}
                        >
                          <SendIcon />
                        </MDBBtn>
                      </MDBInputGroup>
                    </MDBCardFooter>
                  </form>
                )}
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    );
  }
}

export default connect(mapStatetoProps)(withRouter(MyTicketsinfo));

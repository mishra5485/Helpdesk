import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { withRouter } from "../withRouter";
import { connect } from "react-redux";

const mapStatetoProps = (props) => {
  return {
    log: props.LoginUserData,
  };
};

class Allticketsinfo extends Component {
  state = {
    ticketNumber: "",
    userid: "",
    subject: "",
    body: "",
    departmentname: "",
    status: "",
    CreatedAt: "",
    msg: "",
    file: null,
    resmsg: [],
    toggle: true,
  };

  componentDidMount() {
    const objid = this.props.params.id;
    this.getdata(objid);
  }

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
          Username: resp.data.user.userName,
          TicketNumber: resp.data.ticketNumber,
          subject: resp.data.subject,
          body: resp.data.body,
          departmentname: resp.data.department_name,
          status: resp.data.status,
          CreatedAt: resp.data.createdDate,
          resmsg: resp.data.comments,
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

  render() {
    return (
      <>
        <Toaster position="top-center" />
        <MDBContainer
          fluid
          className="py-5"
          style={{ backgroundColor: "#eee", height: "100vh" }}
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
                            Created By:
                          </MDBCol>
                          <MDBCol size="6">{this.state.Username}</MDBCol>
                        </MDBRow>
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
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    );
  }
}

export default connect(mapStatetoProps)(withRouter(Allticketsinfo));

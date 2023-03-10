import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBBtn,
} from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";
import axios from "axios";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";
import { withRouter } from "../withRouter";
import { connect } from "react-redux";

const mapStatetoProps = (props) => {
  return {
    log: props.LoginUserData,
  };
};

class EmployeeInfo extends Component {
  state = {
    empname: "",
    empid: "",
    empmail: "",
    empdepartmentname: "",
    empaccesslvl: "",
    empCreatedAt: "",
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
        `${process.env.REACT_APP_BASE_URL}/employees/${objid}`,
        config
      );
      if (resp.status === 200) {
        this.setState({
          empid: resp.data.employeeNumber,
          empname: resp.data.name,
          empmail: resp.data.email,
          empdepartmentname: resp.data.department_name,
          empaccesslvl: resp.data.access_level,
          empCreatedAt: resp.data.createdAt,
        });
        toast.success("Ticket Fetched Successfully");
      } else {
        if (resp.status == 404) {
          toast.error(resp.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  empUpdate = async (e) => {
    e.preventDefault();
    const objid = this.props.params.id;

    const config = {
      headers: { Authorization: `Bearer ${this.props.log.token}` },
    };
    const data = {
      name: this.state.empname,
      department_name: this.state.department,
    };

    try {
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/employees/update/${objid}`,
          data,
          config
        )
        .then((response) => {
          if (response.status === 200) {
            toast.success(response.data);
          } else {
            if (response.status === 500) {
              toast.error(response.data);
            }
          }
        });
    } catch (err) {
      toast.error(err);
    }
  };

  render() {
    return (
      <>
        <Toaster position="top-center" />
        <MDBContainer
          fluid
          className="py-5"
          style={{ backgroundColor: "#eee" }}
        >
          <MDBRow className="d-flex justify-content-center ">
            <MDBCol sm="10" md="10" lg="8" xl="8">
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
                            EmployeeId:
                          </MDBCol>
                          <MDBCol
                            size="4"
                            style={{
                              fontWeight: "bolder",
                              fontSize: "1.5rem",
                              textAlign: "start",
                            }}
                          >
                            {this.state.empid}
                          </MDBCol>
                        </MDBRow>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow between className="mt-3">
                      <MDBCol size="6">
                        <MDBRow className="mt-3">
                          <MDBCol size="3" style={{ fontWeight: "bold" }}>
                            EmployeeName:
                          </MDBCol>
                          <MDBCol size="6">
                            <Form.Control
                              type="text"
                              value={this.state.empname}
                              onChange={(e) =>
                                this.setState({ empname: e.target.value })
                              }
                            />
                          </MDBCol>
                        </MDBRow>
                      </MDBCol>
                      <MDBCol size="6">
                        <MDBRow className="mt-3">
                          <MDBCol size="3" style={{ fontWeight: "bold" }}>
                            Department:
                          </MDBCol>
                          <MDBCol size="6">
                            <Form.Select
                              aria-label="Default select example"
                              onChange={(e) =>
                                this.setState({ empdepartment: e.target.value })
                              }
                            >
                              <option> {this.state.empdepartmentname}</option>
                              <option value="1">L1</option>
                              <option value="2">L2</option>
                              <option value="3">L3</option>
                            </Form.Select>
                          </MDBCol>
                        </MDBRow>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow between className="mt-3">
                      <MDBCol size="6">
                        <MDBRow className="mt-3">
                          <MDBCol size="3" style={{ fontWeight: "bold" }}>
                            Email:
                          </MDBCol>
                          <MDBCol size="6">{this.state.empmail}</MDBCol>
                        </MDBRow>
                      </MDBCol>
                      <MDBCol size="6">
                        <MDBRow className="mt-3">
                          <MDBCol size="3" style={{ fontWeight: "bold" }}>
                            CreatedOn:
                          </MDBCol>
                          <MDBCol size="6">
                            {moment
                              .unix(this.state.empCreatedAt)
                              .format("MMMM Do YYYY")}
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
                <MDBCardBody></MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    );
  }
}

export default connect(mapStatetoProps)(withRouter(EmployeeInfo));

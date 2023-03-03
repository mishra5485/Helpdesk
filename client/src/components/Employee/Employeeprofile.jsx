import React, { Component } from "react";
import Nav from "./Nav";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, Modal } from "react-bootstrap";

import "./Profile.css";
export default class EmployeeProfile extends Component {
  state = {
    showModal: false,
    showpassword: false,
    id: "",
    name: "",
    department: "",
    email: "",
    joiningdate: "",
    password: "",
    newpassword: "",
    cnewpassword: "",
    forgetemail: "",
    forget: false,
  };

  componentDidMount() {
    this.getdata();
  }

  getdata = async () => {
    const Usertoken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${Usertoken}` },
    };
    const userid = localStorage.getItem("id");

    try {
      let resp = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/employees/employee/profile/${userid}`,
        config
      );
      if (resp.status === 200) {
        this.setState({
          id: resp.data.employeeNumber,
          name: resp.data.name,
          department: resp.data.department_name,
          email: resp.data.email,
          joiningdate: resp.data.createdAt,
        });
        toast.success("Employee Details Fetched Successfully ");
      } else {
        if (resp.status === 404) {
          toast.error(resp.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleClickShowPassword = () => {
    this.setState({ showpassword: !this.state.showpassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  handleReset = async () => {
    if (this.state.newpassword === this.state.cnewpassword) {
      const Usertoken = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${Usertoken}` },
      };
      const userid = localStorage.getItem("id");
      const data = {
        current_password: this.state.password,
        new_password: this.state.cnewpassword,
      };

      try {
        let resp = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/employees/reset/password/${userid}`,
          data,
          config
        );
        if (resp.status === 200) {
          toast.success(resp.data);
          this.handleClose();
        } else {
          if (resp.status === 403) {
            toast.error(resp.data);
          } else {
            if (resp.status === 400) {
              toast.error(resp.data);
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("Confirm Password and New password must be same");
    }
  };

  handleForget = async (e) => {
    e.preventDefault();
    const Usertoken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${Usertoken}` },
    };
    const data = {
      email: this.state.forgetemail,
    };
    try {
      let resp = await axios.post(
        `http://localhost:5000/employees/forgot`,
        data,
        config
      );

      if (resp.status === 200) {
        toast.success("Email sent successfully ");
        this.setState({ forget: false });
        this.setState({ forgetemail: "" });
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed Try After Sometime");
    }
  };

  render() {
    return (
      <>
        <Toaster position="top-center" />
        <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
          <MDBContainer className="py-2 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol
                lg="10"
                className="mb-4 mb-lg-0"
                style={{ height: "80vh" }}
              >
                <MDBCard
                  className=""
                  style={{ borderRadius: ".5rem", height: "inherit" }}
                >
                  <MDBRow className="g-0" style={{ height: "80vh" }}>
                    <MDBCol
                      md="4"
                      className="gradient-custom text-center text-white"
                      style={{
                        borderTopLeftRadius: ".5rem",
                        borderBottomLeftRadius: ".5rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <MDBContainer>
                        <MDBCardImage
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                          alt="Avatar"
                          className="my-5"
                          style={{ width: "80px" }}
                          fluid
                        />
                        <MDBTypography tag="h5">
                          {this.state.name}
                        </MDBTypography>
                        <MDBCardText>{this.state.department}</MDBCardText>
                      </MDBContainer>
                    </MDBCol>

                    <MDBCol md="8">
                      <MDBCardBody className="p-4">
                        <MDBTypography tag="h6">Employee Profile</MDBTypography>
                        <hr className="mt-0 mb-4" />
                        <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Id</MDBTypography>
                            <MDBCardText className="text-muted">
                              {this.state.id}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Name</MDBTypography>
                            <MDBCardText className="text-muted">
                              {this.state.name}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">
                              Department Name
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {this.state.department}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Email</MDBTypography>
                            <MDBCardText className="text-muted">
                              {this.state.email}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">
                              Joining Date:-
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {moment
                                .unix(this.state.joiningdate)
                                .format("MMMM Do YYYY")}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>

                        <hr className="mt-0 mb-4" />
                        <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <button
                              type="button"
                              class="btn btn-primary"
                              onClick={this.handleShow}
                            >
                              Reset Password
                            </button>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <button
                              type="button"
                              class="btn btn-primary"
                              onClick={() =>
                                this.setState({ forget: !this.state.forget })
                              }
                            >
                              Forget Password
                            </button>
                          </MDBCol>
                        </MDBRow>

                        {this.state.forget ? (
                          <>
                            <form onSubmit={this.handleForget}>
                              <MDBRow className="pt-1 d-flex ">
                                <MDBCol size="6">
                                  <MDBInput
                                    wrapperClass="mb-4 w-100"
                                    label="Email"
                                    id="formControl"
                                    type="email"
                                    autoComplete="off"
                                    size="lg"
                                    required="true"
                                    value={this.state.forgetemail}
                                    onChange={(e) =>
                                      this.setState({
                                        forgetemail: e.target.value,
                                      })
                                    }
                                  />
                                </MDBCol>
                              </MDBRow>
                              <MDBRow className="pt-1">
                                <MDBCol>
                                  <button type="submit" class="btn btn-primary">
                                    Send Email
                                  </button>
                                </MDBCol>
                              </MDBRow>
                            </form>
                          </>
                        ) : null}

                        <div className="d-flex justify-content-start mt-5">
                          <a href="#!">
                            <MDBIcon fab icon="facebook me-3" size="lg" />
                          </a>
                          <a href="#!">
                            <MDBIcon fab icon="twitter me-3" size="lg" />
                          </a>
                          <a href="#!">
                            <MDBIcon fab icon="instagram me-3" size="lg" />
                          </a>
                        </div>
                      </MDBCardBody>
                    </MDBCol>
                  </MDBRow>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Reset Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MDBRow className="pt-1">
              <MDBCol size="12" className="mb-3">
                <MDBTypography tag="h6">Old Password:-</MDBTypography>
                <MDBCardText className="text-muted">
                  <div class="form-outline">
                    <FormControl
                      sx={{ m: 1, width: "25ch" }}
                      variant="outlined"
                      style={{ width: "100%" }}
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Old Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={this.state.showpassword ? "text" : "password"}
                        value={this.state.password}
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={this.handleClickShowPassword}
                              edge="end"
                              val
                            >
                              {this.state.showpassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </div>
                </MDBCardText>
              </MDBCol>
            </MDBRow>
            <MDBRow className="pt-1">
              <MDBCol size="12" className="mb-3">
                <MDBTypography tag="h6">New Password:-</MDBTypography>
                <MDBCardText className="text-muted">
                  <div class="form-outline">
                    <FormControl
                      sx={{ m: 1, width: "25ch" }}
                      variant="outlined"
                      style={{ width: "100%" }}
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        New Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={this.state.showpassword ? "text" : "password"}
                        value={this.state.newpassword}
                        onChange={(e) =>
                          this.setState({ newpassword: e.target.value })
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={this.handleClickShowPassword}
                              edge="end"
                            >
                              {this.state.showpassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </div>
                </MDBCardText>
              </MDBCol>
            </MDBRow>
            <MDBRow className="pt-1">
              <MDBCol size="12" className="mb-3">
                <MDBTypography tag="h6">Confirm New Password:-</MDBTypography>
                <MDBCardText className="text-muted">
                  <div class="form-outline">
                    <FormControl
                      sx={{ m: 1, width: "25ch" }}
                      variant="outlined"
                      style={{ width: "100%" }}
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={this.state.showpassword ? "text" : "password"}
                        value={this.state.cnewpassword}
                        onChange={(e) =>
                          this.setState({ cnewpassword: e.target.value })
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={this.handleClickShowPassword}
                              edge="end"
                            >
                              {this.state.showpassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </div>
                </MDBCardText>
              </MDBCol>
            </MDBRow>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleReset}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

import React, { Component } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";
import { Link } from "react-router-dom";
import Logo from "../images/logo.svg";
import toast, { Toaster } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { withRouter } from "./withRouter";
import { LoginData } from "../action/Action";
import { connect } from "react-redux";

const mapStatetoProps = (props) => {
  return {
    log: props.LoginUserData,
  };
};

const DispatchToProps = (dispatch) => {
  return {
    LoggedIn: (logindata) => dispatch(LoginData(logindata)),
  };
};

class Login extends Component {
  state = {
    email: "",
    password: "",
    success: false,
    forget: false,
    forgetemail: "",
    token: localStorage.getItem("token"),
  };

  componentDidMount() {
    if (this.props.log.access_level === "user" && this.state.token) {
      window.location.href = "/user/usertickets";
    } else {
      if (this.props.log.access_level === "employee" && this.state.token) {
        window.location.href = "/employee/alltickets";
      } else {
        if (this.props.log.access_level === "admin" && this.state.token) {
          window.location.href = "/admin/ticketstable";
        }
      }
    }
  }

  responseMessage = async (response) => {
    const ssotoken = response.credential;
    const data = {
      token: ssotoken,
    };

    try {
      let resp = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/loginwithgoogle`,
        data
      );
      if (resp.status === 200) {
        this.props.LoggedIn(resp.data);
        this.props.navigate("/user/usertickets");
      } else {
        if (resp.status === 403) {
          toast.error(resp.data);
        }
      }
    } catch (err) {
      toast.error("User not registered. Please sign-up with Google first");
      console.log(err);
    }
  };

  errorMessage = (error) => {
    console.log(error);
  };

  handlesubmit = async (e) => {
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    e.preventDefault();

    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/login`, data)
      .then((response) => {
        if (response.status === 200) {
          this.props.LoggedIn(response.data);
          localStorage.setItem("token", response.data.token);

          if (this.props.log.access_level === "user") {
            this.props.navigate("/user/usertickets");
          } else {
            if (response.data.access_level === "employee") {
              this.props.navigate("/employee/alltickets");
            } else {
              this.props.navigate("/admin/ticketstable");
            }
          }
        } else {
          if (response.status === 403) {
            toast.error(response.data);
          }
        }
      })
      .catch((err) => {
        toast.error("Server Error Try After SomeTime");
        console.log(err);
      });
  };

  handleForget = async (e) => {
    e.preventDefault();
    const data = {
      email: this.state.forgetemail,
    };
    try {
      let resp = await axios.post(`http://localhost:5000/forgot`, data);

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
        <Toaster position="top-right" />
        <MDBContainer
          fluid
          style={{
            background: "rgb(2,0,36)",
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(148,148,161,1) 0%, rgba(238,238,238,1) 100%)",
            height: "100vh",
          }}
        >
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol col="12">
              <MDBCard
                className="bg-dark my-5 mx-auto"
                style={{ borderRadius: "1rem", maxWidth: "500px" }}
              >
                <MDBCardBody
                  className="p-5 w-100 d-flex flex-column"
                  style={{ backgroundColor: "whitesmoke" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <img
                      src={Logo}
                      alt="Logo"
                      style={{
                        width: "190px",
                      }}
                    />
                  </div>
                  <h2 className="fw-md mb-4 fs-3 text-center">Sign in</h2>
                  <form onSubmit={this.handlesubmit}>
                    <MDBInput
                      wrapperClass="mb-4 w-100"
                      label="Email address"
                      id="formControlemail"
                      type="email"
                      size="lg"
                      value={this.state.email}
                      autoComplete="off"
                      required="true"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                    <MDBInput
                      wrapperClass="mb-4 w-100"
                      label="Password"
                      id="formControl"
                      type="password"
                      autoComplete="off"
                      size="lg"
                      required="true"
                      value={this.state.password}
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    />
                    <MDBBtn size="lg" type="submit">
                      SignIn
                    </MDBBtn>
                    <div
                      style={{
                        margin: "10px",
                        fontWeight: "500",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        this.setState({ forget: !this.state.forget });
                      }}
                    >
                      <p>Forget Password!!</p>
                    </div>
                  </form>
                  {this.state.forget ? (
                    <>
                      <form onSubmit={this.handleForget}>
                        <MDBRow className="pt-1 d-flex ">
                          <MDBCol size="12">
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
                            <button type="submit" class="btn btn-primary my-2">
                              Reset
                            </button>
                          </MDBCol>
                        </MDBRow>
                      </form>
                    </>
                  ) : null}
                  <MDBContainer className="d-flex justify-center">
                    <GoogleLogin
                      onSuccess={this.responseMessage}
                      onError={this.errorMessage}
                      useOneTap
                      auto_select
                    />
                  </MDBContainer>

                  <div>
                    <p className="mt-5">
                      Don't have an account?
                      <Link to="/signup" className="text-dark-50 fw-bold">
                        SignUp
                      </Link>
                    </p>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    );
  }
}

export default connect(mapStatetoProps, DispatchToProps)(withRouter(Login));

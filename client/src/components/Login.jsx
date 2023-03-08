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
import { withRouter } from "./withRouter";
import UserContext from "../auth/UserContext";

class Login extends Component {
  static contextType = UserContext;
  state = {
    email: "",
    password: "",
    success: false,
    forget: false,
    forgetemail: "",
  };

  handleCallbackResponse = async (response) => {
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
        console.log(resp);

        localStorage.clear();
        localStorage.setItem("username", resp.data.username);
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("access", resp.data.access_level);
        localStorage.setItem("picture", resp.data.picture);
        localStorage.setItem("id", resp.data.user_id);

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

  componentDidMount() {
    const google = window.google;
    google.accounts.id.initialize({
      client_id:
        "214010166124-urdkbn0993d2f8h950voub3cmfdkgbfd.apps.googleusercontent.com",
      callback: this.handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }

  handlesubmit = async (e) => {
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    e.preventDefault();

    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/login`, data)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("access", response.data.access_level);
          localStorage.setItem("id", response.data.user_id);
          localStorage.setItem("departmentname", response.data.department_name);

          if (response.data.access_level === "user") {
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
        console.log(err);
        toast.error("Invalid Email Address and Password");
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
                            <button type="submit" class="btn btn-primary">
                              Reset
                            </button>
                          </MDBCol>
                        </MDBRow>
                      </form>
                    </>
                  ) : null}

                  <div
                    id="signInDiv"
                    style={{ margin: "auto", marginTop: "15px" }}
                  ></div>
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

export default withRouter(Login);

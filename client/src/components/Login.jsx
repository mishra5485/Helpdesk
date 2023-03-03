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
import { withRouter } from "../withRouter";

class Login extends Component {
  state = {
    email: "",
    password: "",
    success: false,
  };

  handleCallbackResponse = async (response) => {
    const ssotoken = response.credential;
    const data = {
      token: ssotoken,
    };
    console.log(data);

    try {
      let resp = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/loginwithgoogle`,
        data
      );
      if (resp.status === 200) {
        console.log(resp);

        // localStorage.setItem("");
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
          this.props.navigate("/employee/alltickets");
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
          <form onSubmit={this.handlesubmit}>
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
                        margin: "auto",
                        marginTop: "15px",
                        fontWeight: "Bold",
                      }}
                    >
                      OR
                    </div>
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
          </form>
        </MDBContainer>
      </>
    );
  }
}

export default withRouter(Login);

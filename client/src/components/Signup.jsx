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
class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  handleCallbackResponse = async (response) => {
    const ssotoken = response.credential;
    const data = {
      token: ssotoken,
    };

    try {
      let resp = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/registerwithgoogle`,
        data
      );
      if (resp.status === 200) {
        toast.success(resp.data);
        this.props.navigate("/user/UserTickets");
      } else {
        if (resp.status === 403) {
          toast.error(resp.data);
        }
      }
    } catch (err) {
      toast.error("Already registered. Please login in!");
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
    e.preventDefault();
    const data = {
      name: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/users/register`, data)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Registered Successfully");
          this.props.navigate("/");
        } else {
          if (response.status === 403) {
            toast.error(response.data);
          } else {
            if (response.status === 400) {
              toast.error(response.data);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
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
                  className="bg-white my-5 mx-auto"
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
                    <h2 className="fw-md fs-3 mb-4 text-center">Sign Up</h2>

                    <MDBInput
                      wrapperClass="mb-4 w-100"
                      label="UserName"
                      id="formControlLgName"
                      type="text"
                      size="lg"
                      autoComplete="off"
                      required="true"
                      value={this.state.username}
                      onChange={(e) =>
                        this.setState({ username: e.target.value })
                      }
                    />
                    <MDBInput
                      wrapperClass="mb-4 w-100"
                      label="Email address"
                      id="formControlLgEmail"
                      type="email"
                      autoComplete="off"
                      required="true"
                      size="lg"
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                    <MDBInput
                      wrapperClass="mb-4 w-100"
                      label="Password"
                      id="formControlLgPassword"
                      type="password"
                      size="lg"
                      autoComplete="off"
                      required="true"
                      value={this.state.password}
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    />
                    <MDBBtn size="lg">SignUp</MDBBtn>
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
                      <p className="mt-5  ">
                        Already have an account??
                        <Link to="/" className="text-dark-50 fw-bold ml-2">
                          Sign In
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
export default withRouter(Signup);

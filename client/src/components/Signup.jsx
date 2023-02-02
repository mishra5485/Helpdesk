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

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  handlesubmit = async (e) => {
    e.preventDefault();
    alert("hello");
    try {
      await axios
        .post("http://localhost:5000/register", {
          name: this.state.username,
          email: this.state.email,
          password: this.state.password,
        })
        .then((response) => {
          toast.success(response.data);
        });
    } catch (err) {
      toast.error(err);
    }
  };
  render() {
    return (
      <>
        <div className="form-group">
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="dark"
          />
        </div>
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
                    <h2 className="fw-bold mb-2 text-center">Sign Up</h2>
                    <p className="text-dark-50 mb-3">
                      Please enter your login and password!
                    </p>

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

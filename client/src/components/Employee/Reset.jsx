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
import Logo from "../../images/logo.svg";
import toast, { Toaster } from "react-hot-toast";
import { withRouter } from "react-router";

class Reset extends Component {
  state = {
    password: "",
    cpassword: "",
  };

  handlesubmit = async (e) => {
    if (this.state.password === this.state.cpassword) {
      const token = this.props.match.params.token;
      const data = {
        new_password: this.state.cpassword,
      };
      e.preventDefault();

      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/employees/reset/${token}`,
          data
        )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            toast.success("Password Updated Successfully");
            window.href = "/employee/Profile";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else toast.error("Password and Confirm Password must same");
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
                    <h2 className="fw-md mb-4 fs-3 text-center">
                      Reset Password
                    </h2>
                    <MDBInput
                      wrapperClass="mb-4 w-100"
                      label="Password"
                      id="formControlemail"
                      type="password"
                      size="lg"
                      value={this.state.password}
                      autoComplete="off"
                      required="true"
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    />
                    <MDBInput
                      wrapperClass="mb-4 w-100"
                      label=" Confirm Password"
                      id="formControl"
                      type="password"
                      autoComplete="off"
                      size="lg"
                      required="true"
                      value={this.state.cpassword}
                      onChange={(e) =>
                        this.setState({ cpassword: e.target.value })
                      }
                    />
                    <MDBBtn size="lg" type="submit">
                      Submit
                    </MDBBtn>
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

export default withRouter(Reset);

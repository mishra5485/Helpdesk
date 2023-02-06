import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class Employeeinfo extends Component {
  state = {
    id: "",
    username: "",
    email: "",
    body: "",
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.getdata(id);
  }

  getdata = async (id) => {
    try {
      let resp = await axios.get(
        `https://jsonplaceholder.typicode.com/comments/${id}`
      );
      this.setState({
        id: resp.data.id,
        username: resp.data.name,
        email: resp.data.email,
        body: resp.data.body,
      });
    } catch (err) {
      console.log(err);
    }
  };

  handlesubmit = (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <MDBContainer fluid>
        <form onSubmit={this.handlesubmit}>
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol col="12">
              <MDBCard
                className="bg-white my-5 mx-auto"
                style={{ borderRadius: "1rem", maxWidth: "1100px" }}
              >
                <MDBCardBody className="p-5 w-100 d-flex flex-column">
                  <div>
                    <p className="mt-5">
                      <Link to="/dashboard" className="text-dark-50 fw-bold">
                        Back to Table
                      </Link>
                      <h1>EMPLOYEEINFO</h1>
                    </p>
                  </div>
                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    id="formControlemail"
                    type="email"
                    size="lg"
                    value={this.state.id}
                    disabled
                  />

                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    id="formControlBody"
                    type="textarea"
                    size="lg"
                    value={this.state.username}
                    disabled
                  />
                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    id="formControlCreatedOn"
                    type="text"
                    size="lg"
                    value={this.state.email}
                    disabled
                  />

                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    id="formControlResolution"
                    type="text"
                    size="lg"
                    value={this.state.body}
                    disabled
                    style={{ userSelect: "none" }}
                  />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>
    );
  }
}

export default withRouter(Employeeinfo);

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

class TicketInfo extends Component {
  state = {
    userid: "",
    subject: "",
    body: "",
    departmentname: "",
    status: "",
    CreatedAt: "",
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.getdata(id);
  }

  getdata = async (id) => {
    try {
      let resp = await axios.get(`http://localhost:5000/tickets/${id}`);
      console.log(resp.data);
      this.setState({
        userid: resp.data.user_id,
        subject: resp.data.subject,
        body: resp.data.body,
        departmentname: resp.data.department_name,
        status: resp.data.status,
        CreatedAt: resp.data.createdDate,
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
                      <Link
                        to="/user/dashboard"
                        className="text-dark-50 fw-bold"
                      >
                        Back to Table
                      </Link>
                    </p>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">
                        User Id
                      </span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={this.state.userid}
                    />
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">
                        Subject
                      </span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={this.state.subject}
                    />
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">
                        Body
                      </span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={this.state.Body}
                    />
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">
                        CreatedOn
                      </span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={this.state.CreatedAt}
                    />
                  </div>

                  {/* <MDBInput
                    wrapperClass="mb-4 w-100"
                    id="formControlemail"
                    type="email"
                    size="lg"
                    value={this.state.userid}
                    disabled
                  />

                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    id="formControlBody"
                    type="textarea"
                    size="lg"
                    value={this.state.subject}
                    disabled
                  />
                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    id="formControlCreatedOn"
                    type="textarea"
                    size="lg"
                    value={this.state.body}
                    disabled
                  />

                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    id="formControlResolution"
                    type="text"
                    size="lg"
                    value={this.state.departmentname}
                    disabled
                  />

                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    id="formControlResolution"
                    type="text"
                    size="sm"
                    value={this.state.status}
                    disabled
                  /> */}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>
    );
  }
}

export default withRouter(TicketInfo);

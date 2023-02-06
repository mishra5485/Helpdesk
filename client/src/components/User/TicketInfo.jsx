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
    department_id: "",
    status: "",
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.getdata(id);
  }

  getdata = async (id) => {
    try {
      let resp = await axios.get(`http://localhost:3000/tickets/${id}`);
      this.setState({
        userid: resp.user_id,
        subject: resp.subject,
        body: resp.body,
        departmentid: resp.department_id,
        status: resp.status,
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
                  <MDBInput
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
                    value={this.state.departmentid}
                    disabled
                  />

                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    id="formControlResolution"
                    type="text"
                    size="sm"
                    value={this.state.status}
                    disabled
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

export default withRouter(TicketInfo);

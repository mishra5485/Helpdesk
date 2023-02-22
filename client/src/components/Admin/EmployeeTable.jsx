import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import Nav from "./Nav";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
  MDBBtn,
  MDBBadge,
  MDBInputGroup,
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import axios from "axios";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import AddIcon from "@mui/icons-material/Add";

class EmployeeTable extends Component {
  state = {
    showNav: false,
    basicModal: false,
    items: [],
    currentpage: 0,
    SearchcurrentPage: 0,
    pageCount: 0,
    searchPageCount: 0,
    bdcolor: "",
    search: "",
    searchPagination: false,
  };

  limit = 5;

  toggleShow = () => {
    this.setState({ basicModal: !this.state.basicModal });
    console.log("calling");
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const Usertoken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${Usertoken}` },
    };
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/employees/emp/all/${this.limit}/${this.state.currentPage}`,
        config
      )
      .then((response) => {
        console.log(response);
        let total = response.data.count;
        this.setState({
          pageCount: Math.ceil(total / this.limit),
        });
        this.setState({ items: response.data.employees });
        toast.success("Employee Fetched Successfully");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  fetchComments = async (currentPage) => {
    const Usertoken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${Usertoken}` },
    };
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/employees/emp/all/${this.limit}/${currentPage}`,
        config
      );
      let respdata = await response.data;
      toast.success("Employee Fetched Successfully");
      return respdata.employees;
    } catch (error) {
      console.log(error);
    }
  };

  handlePageClick = async (data) => {
    let currentPage = data.selected;
    this.setState({ currentPage: currentPage });
    const ApiData = await this.fetchComments(currentPage);
    this.setState({ items: ApiData });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const Usertoken = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${Usertoken}` },
    };
    const data = {
      name: this.state.username,
      password: this.state.password,
      department_name: this.state.department,
      email: this.state.email,
    };

    try {
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/employees/register`,
          data,
          config
        )
        .then((response) => {
          toast.success(response.data);
          this.getData();
        });
    } catch (err) {
      toast.error(err);
    }
    this.setState({ modal: false });
  };

  deleteEmp = async (empid) => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/employees/delete/${empid}`
      );
      let respdata = await response.data;
      toast.success("Employee deleted Successfully");
      this.getData();
    } catch (error) {
      console.log(error);
    }
  };

  search = async (e) => {
    e.preventDefault();
    alert(this.state.search);
    this.setState({ searchPagination: true });
    const Usertoken = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${Usertoken}` },
    };

    const data = {
      keyword: this.state.search,
    };

    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/tickets/search/${this.limit}/${this.state.SearchcurrentPage}`,
        data,
        config
      )
      .then((response) => {
        console.log(response);
        let total = response.data.count;
        this.setState({
          searchPageCount: Math.ceil(total / this.limit),
        });
        this.setState({ items: response.data.ticket });
        toast.success("Tickets Fetched Successfully");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  fetchSearchData = async (currentPage) => {
    const Usertoken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${Usertoken}` },
    };
    const data = {
      keyword: this.state.search,
    };
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/tickets/search/${this.limit}/${currentPage}`,
        data,
        config
      );
      let respdata = await response.data;
      toast.success("Tickets Fetched Successfully");
      return respdata.ticket;
    } catch (error) {
      console.log(error);
    }
  };

  SearchhandlePageClick = async (data) => {
    let currentPage = data.selected;
    this.setState({ SearchcurrentPage: currentPage });
    const ApiData = await this.fetchSearchData(currentPage);
    this.setState({ items: ApiData });
  };

  reset = async (e) => {
    e.preventDefault();
    this.setState({ searchPagination: false });
    toast.success("Resetting search");
    this.getData();
  };

  render() {
    return (
      <>
        <Nav />
        <Toaster position="top-right" />
        <MDBContainer fluid className="mt-3">
          <Form onSubmit={this.search}>
            <MDBRow
              style={{
                display: "flex",
                justifyContent: "end",
                className: "m-2",
              }}
            >
              <MDBCol size="3">
                <MDBInputGroup className="mb-3" size="4">
                  <input
                    className="form-control"
                    placeholder="Search"
                    type="text"
                    value={this.state.search}
                    onChange={(e) => this.setState({ search: e.target.value })}
                  />
                  <MDBBtn
                    className="me-1"
                    color="info"
                    onClick={() => this.search}
                    style={{ cursor: "pointer" }}
                  >
                    Search
                  </MDBBtn>
                </MDBInputGroup>
              </MDBCol>
              <MDBCol size="1">
                <MDBBadge
                  color="success"
                  light
                  onClick={this.toggleShow}
                  style={{ cursor: "pointer" }}
                >
                  <AddIcon />
                </MDBBadge>
              </MDBCol>
            </MDBRow>
          </Form>
        </MDBContainer>
        <div className="table-responsive">
          <MDBContainer>
            <MDBTable bordered className="mt-5">
              <MDBTableHead className="table-dark">
                <tr>
                  <th scope="col">Employee.Id</th>
                  <th scope="col">Employee Name</th>
                  <th scope="col">Email-id</th>
                  <th scope="col">Department</th>
                  <th scope="col">CreatedOn</th>
                  <th scope="col">Action</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {this.state.items.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td>{item.employeeNumber}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.department_name}</td>
                      <td>
                        {moment.unix(item.createdAt).format("MMMM Do YYYY")}
                      </td>

                      <td>
                        <Link to={`/admin/employeeinfo/${item._id}`}>
                          <button
                            className="btn btn-success "
                            style={{ marginRight: "8px" }}
                          >
                            <RemoveRedEyeOutlinedIcon />
                          </button>
                        </Link>
                        <button
                          onClick={() => this.deleteEmp(item._id)}
                          className="btn btn-danger "
                          style={{ marginRight: "8px" }}
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </MDBTableBody>
            </MDBTable>
          </MDBContainer>
          {this.state.searchPagination ? (
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              pageCount={this.state.searchPageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={this.SearchhandlePageClick}
              containerClassName={"pagination justify-content-center"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          ) : (
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination justify-content-center"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          )}
        </div>
        <button onClick={this.toggleShow}>Click me</button>
        <MDBModal
          show={this.state.basicModal}
          setShow={this.toggleShow}
          tabIndex="-1"
        >
          <MDBModalDialog>
            <Form onSubmit={this.handleSubmit}>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Create-Employee</MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={this.toggleShow}
                  ></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="UserName"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="name@example.com"
                      autoComplete="off"
                      onChange={(e) =>
                        this.setState({ username: e.target.value })
                      }
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      autoComplete="off"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Password"
                    className="mb-3"
                  >
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      autoComplete="off"
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingSelectGrid"
                    label="Department"
                  >
                    <Form.Control
                      as="select"
                      required
                      aria-label="Floating label select example"
                      onChange={(e) =>
                        this.setState({ department: e.target.value })
                      }
                    >
                      <option>please select Department</option>
                      <option value="L1">L1</option>
                      <option value="L2">L2</option>
                      <option value="L3">L3</option>
                    </Form.Control>
                  </FloatingLabel>
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn color="secondary" onClick={this.toggleShow}>
                    Close
                  </MDBBtn>
                  <MDBBtn>Submit</MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </Form>
          </MDBModalDialog>
        </MDBModal>
      </>
    );
  }
}

export default EmployeeTable;

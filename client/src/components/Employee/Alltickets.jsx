import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
  MDBBadge,
  MDBRow,
  MDBCol,
  MDBInputGroup,
  MDBBtn,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import toast, { Toaster } from "react-hot-toast";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";

const mapStatetoProps = (props) => {
  return {
    log: props.LoginUserData,
  };
};

class Alltickets extends Component {
  state = {
    items: [],
    department_list: [],
    currentpage: 0,
    pageCount: 0,
    bdcolor: "",
    search: "",
    searchPagination: false,
    searchPageCount: 0,
    SearchcurrentPage: 0,
    departmentcheck: false,
    statuscheck: false,
    filterdepartment: "",
    filterstatus: "",
    filtersearch: "",
    filterPagination: false,
    filterPageCount: "",
    filtercurrentPage: "",
  };

  limit = 7;

  componentDidMount() {
    this.getData();
    this.getDepartments();
  }

  getData = async () => {
    const config = {
      headers: { Authorization: `Bearer ${this.props.log.token}` },
    };

    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/tickets/all/${this.limit}/${this.state.currentPage}`,
        config
      )
      .then((response) => {
        let total = response.data.count;
        this.setState({
          pageCount: Math.ceil(total / this.limit),
        });
        this.setState({ items: response.data.tickets });
        toast.success("Tickets Fetched Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getDepartments = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/departments/getdepartment`)
      .then((response) => {
        this.setState({ department_list: response.data });
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  fetchComments = async (currentPage) => {
    const config = {
      headers: { Authorization: `Bearer ${this.props.log.token}` },
    };
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/tickets/all/${this.limit}/${currentPage}`,
        config
      );
      let respdata = await response.data;
      toast.success("Tickets Fetched Successfully");
      return respdata.tickets;
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

  search = async (e) => {
    e.preventDefault();
    this.setState({ searchPagination: true });

    const config = {
      headers: { Authorization: `Bearer ${this.props.log.token}` },
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
        console.log(err);
      });
  };

  fetchSearchData = async (currentPage) => {
    const config = {
      headers: { Authorization: `Bearer ${this.props.log.token}` },
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
    this.setState({ searchPagination: false, search: "" });
    this.getData();
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  handleFilter = async (e) => {
    e.preventDefault();
    this.setState({ filterPagination: true });

    const config = {
      headers: { Authorization: `Bearer ${this.props.log.token}` },
    };

    const data = {
      status: this.state.filterstatus,
      department_name: this.state.filterdepartment,
      keyword: this.state.filterkeyword,
    };

    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/tickets/search/${this.limit}/${this.state.SearchcurrentPage}`,
        data,
        config
      )
      .then((response) => {
        let total = response.data.count;
        this.setState({
          filterPageCount: Math.ceil(total / this.limit),
        });
        this.setState({ items: response.data.ticket });
        this.handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchFilterData = async (currentPage) => {
    const config = {
      headers: { Authorization: `Bearer ${this.props.log.token}` },
    };
    const data = {
      status: this.state.filterstatus,
      department_name: this.state.filterdepartment,
      keyword: this.state.filterkeyword,
    };
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/tickets/search/${this.limit}/${currentPage}`,
        data,
        config
      );
      let respdata = await response.data;
      return respdata.ticket;
    } catch (error) {
      console.log(error);
    }
  };

  FilterhandlePageClick = async (data) => {
    let currentPage = data.selected;
    this.setState({ filtercurrentPage: currentPage });
    const ApiData = await this.fetchFilterData(currentPage);
    this.setState({ items: ApiData });
  };

  render() {
    return (
      <>
        <Toaster position="top-center" />
        <MDBContainer fluid className="mt-3">
          <Form onSubmit={this.search}>
            <MDBRow
              style={{
                display: "flex",
                justifyContent: "end",
                className: "m-2",
              }}
            >
              <MDBCol sm="10" lg="4" md="6">
                <MDBInputGroup className="mb-3" size="4">
                  <input
                    className="form-control"
                    placeholder="Search"
                    type="text"
                    value={this.state.search}
                    required="true"
                    onChange={(e) => this.setState({ search: e.target.value })}
                  />
                  <MDBBtn
                    className="me-2"
                    color="info"
                    onClick={() => this.search}
                    style={{ cursor: "pointer" }}
                  >
                    Search
                  </MDBBtn>
                  <MDBBtn
                    className="me-2"
                    type="button"
                    color="danger"
                    onClick={this.reset}
                  >
                    Reset
                  </MDBBtn>

                  <MDBBtn
                    className="me-2"
                    type="button"
                    color="info"
                    onClick={this.handleShow}
                  >
                    Filter
                  </MDBBtn>
                </MDBInputGroup>
              </MDBCol>
            </MDBRow>
          </Form>
        </MDBContainer>
        <div className="table-responsive">
          <MDBContainer className="mx-5" style={{ maxWidth: 1800 }}>
            <MDBTable bordered className="mt-5">
              <MDBTableHead className="table-dark">
                <tr>
                  <th scope="col">Ticket.no</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Created-on</th>
                  <th scope="col">Department</th>
                  <th scope="col">Priority</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {this.state.items.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td>{item.ticketNumber}</td>
                      <td>{item.subject}</td>
                      <td>{item.createdDate}</td>
                      <td>{item.department_name}</td>
                      <td>
                        {item.priority === "Low" ? (
                          <MDBBadge
                            className="mx-2"
                            color="success"
                            light
                            style={{ fontSize: "medium" }}
                          >
                            {item.priority}
                          </MDBBadge>
                        ) : item.priority === "Medium" ? (
                          <MDBBadge
                            className="mx-2"
                            color="warning"
                            light
                            style={{ fontSize: "medium" }}
                          >
                            {item.priority}
                          </MDBBadge>
                        ) : (
                          <MDBBadge
                            className="mx-2"
                            color="danger"
                            light
                            style={{ fontSize: "medium" }}
                          >
                            {item.priority}
                          </MDBBadge>
                        )}
                      </td>
                      <td>
                        {item.status === "Open" ? (
                          <MDBBadge
                            className="mx-2"
                            color="warning"
                            light
                            style={{ fontSize: "medium" }}
                          >
                            {item.status}
                          </MDBBadge>
                        ) : item.status === "In Progress" ? (
                          <MDBBadge
                            className="mx-2"
                            color="primary"
                            light
                            style={{ fontSize: "medium" }}
                          >
                            {item.status}
                          </MDBBadge>
                        ) : (
                          <MDBBadge
                            className="mx-2"
                            color="success"
                            light
                            style={{ fontSize: "medium" }}
                          >
                            {item.status}
                          </MDBBadge>
                        )}
                      </td>
                      <td>
                        <Link to={`/employee/allticketsinfo/${item._id}`}>
                          <button
                            className="btn btn-success "
                            style={{ marginRight: "8px" }}
                          >
                            <RemoveRedEyeOutlinedIcon />
                          </button>
                        </Link>
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
          ) : this.state.filterPagination ? (
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              pageCount={this.state.filterPageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={this.FilterhandlePageClick}
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

        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Filter</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                className="form-control my-3"
                placeholder="Search Keyword"
                type="text"
                value={this.state.filterkeyword}
                required="true"
                onChange={(e) =>
                  this.setState({ filterkeyword: e.target.value })
                }
              />

              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Department"
                onChange={(e) =>
                  this.setState({ departmentcheck: e.target.checked })
                }
              />

              {this.state.departmentcheck ? (
                <Form.Select
                  aria-label="Default select example"
                  className="my-3"
                  onChange={(e) =>
                    this.setState({ filterdepartment: e.target.value })
                  }
                >
                  {this.state.department_list.map((elem, key) => {
                    return (
                      <option key={key} value={elem}>
                        {elem}
                      </option>
                    );
                  })}
                </Form.Select>
              ) : null}

              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Status"
                onChange={(e) =>
                  this.setState({ statuscheck: e.target.checked })
                }
              />
              {this.state.statuscheck ? (
                <Form.Select
                  aria-label="Default select example"
                  className="my-3"
                  onChange={(e) =>
                    this.setState({ filterstatus: e.target.value })
                  }
                >
                  <option>Open this select menu</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </Form.Select>
              ) : null}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                type="button"
                onClick={this.handleClose}
              >
                Close
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={this.handleFilter}
              >
                Filter
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
}

export default connect(mapStatetoProps)(Alltickets);

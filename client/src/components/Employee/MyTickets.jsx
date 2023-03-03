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
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import axios from "axios";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import toast, { Toaster } from "react-hot-toast";

class MyTickets extends Component {
  state = {
    items: [],
    currentpage: 0,
    pageCount: 0,
    bdcolor: "",
    search: "",
    searchPagination: false,
    searchPageCount: 0,
    SearchcurrentPage: 0,
  };

  limit = 15;

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const Usertoken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${Usertoken}` },
    };
    const data = {
      department_name: "L2",
    };
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/tickets/department/${this.limit}/${this.state.currentPage}`,
        data,
        config
      )
      .then((response) => {
        console.log(response.data);
        let total = response.data.count;
        this.setState({
          pageCount: Math.ceil(total / this.limit),
        });
        this.setState({ items: response.data.ticket });
        toast.success("Tickets Fetched Successfully");
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
    const data = {
      department_name: "L2",
    };
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/tickets/department/${this.limit}/${currentPage}`,
        data,
        config
      );
      let respdata = await response.data;
      console.log(respdata);
      toast.success("Tickets Fetched Successfully");
      return respdata.ticket;
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
        console.log(err);
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
        `${process.env.REACT_APP_BASE_URL}/employees/search/${this.limit}/${currentPage}`,
        data,
        config
      );
      let respdata = await response.data;
      console.log(respdata);
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

  render() {
    return (
      <>
        <Toaster position="top-center" />
        <MDBContainer fluid className="mt-3">
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
                <MDBBtn className="me-1" color="info" onClick={this.search}>
                  Search
                </MDBBtn>
              </MDBInputGroup>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div className="table-responsive">
          <MDBContainer>
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
                        <Link to={`/employee/myticketsinfo/${item._id}`}>
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
      </>
    );
  }
}

export default MyTickets;

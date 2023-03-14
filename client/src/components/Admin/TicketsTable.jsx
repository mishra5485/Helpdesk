import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
  MDBBadge,
  MDBBtn,
  MDBInputGroup,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import Form from "react-bootstrap/Form";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import toast, { Toaster } from "react-hot-toast";

class TicketsTable extends Component {
  state = {
    items: [],
    currentpage: 0,
    SearchcurrentPage: 0,
    pageCount: 0,
    searchPageCount: 0,
    search: "",
    searchPagination: false,
  };

  limit = 7;

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
        `${process.env.REACT_APP_BASE_URL}/tickets/all/${this.limit}/${this.state.currentPage}`,
        config
      )
      .then((response) => {
        if (response.status === 200) {
          let total = response.data.count;
          this.setState({
            pageCount: Math.ceil(total / this.limit),
          });
          this.setState({ items: response.data.tickets });
          toast.success("Tickets Fetched Successfully");
        } else {
          if (response.status === 404) {
            toast.error(response.data);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchData = async (currentPage) => {
    const Usertoken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${Usertoken}` },
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
    const ApiData = await this.fetchData(currentPage);
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
        if (response.status === 200) {
          let total = response.data.count;
          this.setState({
            searchPageCount: Math.ceil(total / this.limit),
          });
          this.setState({ items: response.data.ticket });
          toast.success("Tickets Fetched Successfully");
        } else {
          if (response.status === 500) {
            toast.error(response.data);
          }
        }
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
        <Toaster position="top-center" />
        <MDBContainer fluid className="mt-3">
          <Form>
            <MDBRow
              style={{
                display: "flex",
                justifyContent: "end",
                className: "m-2",
              }}
            >
              <MDBCol size="4">
                <MDBInputGroup className="mb-3" size="4">
                  <input
                    className="form-control"
                    placeholder="Search"
                    style={{ height: "40px" }}
                    type="text"
                    value={this.state.search}
                    required="true"
                    onChange={(e) => this.setState({ search: e.target.value })}
                  />
                  <MDBBtn
                    className="me-2"
                    type="button"
                    color="info"
                    onClick={this.search}
                  >
                    <SearchIcon />
                  </MDBBtn>
                  <MDBBtn
                    className="me-2"
                    type="button"
                    color="danger"
                    onClick={this.reset}
                  >
                    Reset
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
                        <Link to={`/admin/ticketinfo/${item._id}`}>
                          <button className="btn btn-secondary ">
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

export default TicketsTable;

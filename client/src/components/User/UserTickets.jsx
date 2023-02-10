import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import axios from "axios";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

export default class TicketTable extends Component {
  state = {
    items: [],
    pageCount: 0,
    currentpage: 0,
  };

  limit = 5;

  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    const config = {
      headers: {
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhcnNobWlzaHJhNTQ4NUBnbWFpbC5jb20iLCJpYXQiOjE2NzYwMDkyOTEsImV4cCI6MTY3NjAxMjg5MX0.znoU1FSOoF9WAeECTe_-EzkIEQ2K2fmWUQyZYqrzqdk",
      },
    };
    const URL = `http://localhost:5000/tickets/all/${this.limit}/${this.state.currentPage}`;

    await axios
      .get(URL, config)
      .then((response) => {
        let total = response.data.count;
        this.setState({
          pageCount: Math.ceil(total / this.limit),
        });
        this.setState({ items: response.data.tickets });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  fetchComments = async (currentPage) => {
    const res = await fetch(
      `http://localhost:5000/tickets/all/${this.limit}/${currentPage}`
    );
    const data = await res.json();
    const pageData = data.tickets;
    return pageData;
  };

  handlePageClick = async (data) => {
    let currentPage = data.selected + 1;

    const NextData = await this.fetchComments(currentPage);
    this.setState({ items: NextData });
  };

  render() {
    return (
      <div className="table-responsive">
        <MDBContainer>
          <MDBTable className="mt-5">
            <MDBTableHead className="table-dark">
              <tr>
                <th scope="col">Ticket.no</th>
                <th scope="col">Subject</th>
                <th scope="col">Created-on</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {this.state.items.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>
                      <Link to={`/user/ticketinfo/${item.id}`}>{key + 1}</Link>
                    </td>
                    <td>{item.subject}</td>
                    <td>{item.createdDate}</td>
                    <td>{item.status}</td>
                    <td>
                      <Link to={`/user/ticketinfo/${item._id}`}>
                        <button className="btn btn-success">
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
      </div>
    );
  }
}

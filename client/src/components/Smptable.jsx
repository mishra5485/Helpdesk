import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
} from "mdb-react-ui-kit";
import { MDBTooltip } from "mdb-react-ui-kit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

export default class Smptable extends Component {
  state = {
    items: [],
    pageCount: 0,
  };

  limit = 5;

  componentDidMount() {
    this.getComments();
  }
  getComments = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=${this.limit}`
    );
    const data = await res.json();
    const total = res.headers.get("x-total-count");
    this.setState({ pageCount: Math.ceil(total / this.limit) });
    this.setState({ items: data });
  };

  fetchComments = async (currentPage) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${this.limit}`
    );
    const data = await res.json();
    return data;
  };

  handlePageClick = async (data) => {
    console.log(data.selected);

    let currentPage = data.selected + 1;

    const commentsFormServer = await this.fetchComments(currentPage);
    this.setState({ items: commentsFormServer });
  };

  render() {
    return (
      <div className="table-responsive">
        <MDBContainer>
          <MDBTable hover className="mt-5">
            <MDBTableHead className="table-dark">
              <tr>
                <th scope="col">Ticket.no</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Body</th>
                <th scope="col">Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {this.state.items.map((item, key) => {
                return (
                  <tr key={key}>
                    <Link to={`/ticketinfo/${item.id}`}>
                      <td>{item.id}</td>
                    </Link>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.body}</td>
                    <td></td>
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
          pageRangeDisplayed={3}
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

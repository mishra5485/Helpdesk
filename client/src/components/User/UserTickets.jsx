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
    await axios
      .get(
        `http://localhost:5000/tickets/all/${this.limit}/${this.state.currentPage}`
      )
      .then((response) => {
        console.log(response.data);
        const total = response.headers.get("x-total-count");
        console.log(total);
        this.setState({ pageCount: Math.ceil(24 / this.limit) });
        this.setState({ items: response.data });
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
                <th scope="col">Subject</th>
                <th scope="col">Created-on</th>
                <th scope="col">Status</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {this.state.items.map((item, key) => {
                return (
                  <tr key={key}>
                    <Link to={`/user/ticketinfo/${item.id}`}>
                      <td>{item.key}</td>
                    </Link>
                    <td>{item.subject}</td>
                    <td>{item.createdAt}</td>
                    <td>{item.status}</td>
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

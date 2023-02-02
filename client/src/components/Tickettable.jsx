import React, { Component } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
} from "mdb-react-ui-kit";
import { MDBTooltip } from "mdb-react-ui-kit";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

export default class Tickettable extends Component {
  state = {
    rowdata: [],
    pageCount: 0,
  };
  limit = 10;
  componentDidMount() {
    this.getdata();
  }

  getdata = async () => {
    try {
      let resp = await axios.get(
        `https://jsonplaceholder.typicode.com/users?_page=1&_limit=${this.limit}`
      );
      const total = resp.headers.get("x-total-count");
      this.setState({ pageCount: Math.ceil(total / this.limit) });
      this.setState({ rowdata: resp.data });
    } catch (err) {
      console.log(err);
    }
  };

  fetchComments = async (currentPage) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${this.limit}`
    );
    const data = await res.json();
    return data;
  };

  handlepageClick = async (data) => {
    let currentPage = data.selected + 1;
    const commentsFormServer = await this.fetchComments(currentPage);
    this.setState({ rowdata: commentsFormServer });
  };

  render() {
    return (
      <div className="table-responsive">
        <MDBContainer>
          <MDBTable hover className="mt-5">
            <MDBTableHead className="table-dark">
              <tr>
                <th scope="col">Ticket-Number</th>
                <th scope="col">Subject</th>
                <th scope="col">Body</th>
                <th scope="col">Created-on</th>
                <th scope="col">Status</th>
                <th scope="col">Resolution</th>
                <th scope="col">Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {this.state.rowdata.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.address.street}</td>
                    <td>{item.address.city}</td>
                    <td>
                      <Link to={`/ticketinfo/${item.id}`}>
                        <MDBTooltip title="View">
                          <VisibilityIcon />
                        </MDBTooltip>
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
          pageCount={this.pageCount}
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

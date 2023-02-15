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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../context/AuthContext";

class UserTickets extends Component {
  static contextType = AuthContext;
  state = {
    items: [],
    currentpage: 0,
    pageCount: 0,
    bdcolor: "",
  };

  limit = 5;

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
        let total = response.data.count;
        this.setState({
          pageCount: Math.ceil(total / this.limit),
        });
        this.setState({ items: response.data.tickets });
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
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/tickets/all/${this.limit}/${currentPage}`,
        config
      );
      let respdata = await response.data;

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

  render() {
    return (
      <>
        <div className="form-group">
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="dark"
          />
        </div>

        <div className="table-responsive">
          <MDBContainer>
            <MDBTable bordered className="mt-5">
              <MDBTableHead className="table-dark">
                <tr>
                  <th scope="col">Ticket.no</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Created-on</th>
                  <th scope="col">Department</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {this.state.items.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td>
                        <Link to={`/user/ticketinfo/${item.id}`}>
                          {key + 1}
                        </Link>
                      </td>
                      <td>{item.subject}</td>
                      <td>{item.createdDate}</td>
                      <td>{item.department_name}</td>
                      <td>{item.status}</td>

                      <td>
                        <Link to={`/user/ticketinfo/${item._id}`}>
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
      </>
    );
  }
}

export default UserTickets;

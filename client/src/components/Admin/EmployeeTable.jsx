import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import Nav from "./Nav";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import axios from "axios";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import toast, { Toaster } from "react-hot-toast";

class EmployeeTable extends Component {
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
      return respdata.tickets;
    } catch (error) {
      console.log(error);
    }
  };

  handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    this.setState({ currentPage: currentPage });
    const ApiData = await this.fetchComments(currentPage);
    this.setState({ items: ApiData });
  };

  render() {
    return (
      <>
        <Nav />
        <Toaster position="top-right" />
        <div className="table-responsive">
          <MDBContainer>
            <MDBTable bordered className="mt-5">
              <MDBTableHead className="table-dark">
                <tr>
                  <th scope="col">Employee.Id</th>
                  <th scope="col">Employee Name</th>
                  <th scope="col">CreatedOn</th>
                  <th scope="col">Department</th>
                  <th scope="col">Email-id</th>
                  <th scope="col">Action</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {this.state.items.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td>{`#${item.ticketNumber}`}</td>
                      <td>{item.name}</td>
                      <td>{item.createdDate}</td>
                      <td>{item.department_name}</td>
                      <td>{item.status}</td>

                      <td>
                        <Link to={`/admin/employeeinfo/${item._id}`}>
                          <button
                            className="btn btn-success "
                            style={{ marginRight: "8px" }}
                          >
                            <RemoveRedEyeOutlinedIcon />
                          </button>
                        </Link>
                        <Link to={`/user/ticketinfo/${item._id}`}>
                          <button
                            className="btn btn-danger "
                            style={{ marginRight: "8px" }}
                          >
                            <DeleteIcon />
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

export default EmployeeTable;

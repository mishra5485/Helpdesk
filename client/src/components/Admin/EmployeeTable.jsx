import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import Nav from "./Nav";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import axios from "axios";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

class EmployeeTable extends Component {
  state = {
    items: [],
    currentpage: 0,
    pageCount: 0,
    bdcolor: "",
    search: "",
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

  deleteEmp = (empid) => {
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
  render() {
    return (
      <>
        <Nav />
        <Toaster position="top-right" />
        <MDBContainer
          fluid
          style={{
            display: "flex",
            justifyContent: "end",
            className: "m-2",
          }}
        >
          <MDBInput
            label="Search"
            id="form1"
            type="text"
            style={{ maxWidth: "250px", marginRight: " 50px" }}
            onChange={(e) => e.target.value}
          />
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

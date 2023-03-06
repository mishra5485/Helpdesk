import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import Nav from "./Nav";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
  MDBBtn,
  MDBBadge,
  MDBInputGroup,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import AddIcon from "@mui/icons-material/Add";

class Departments extends Component {
  state = {
    showNav: false,
    showModal: false,
    delModal: false,
    promptres: false,
    name: "",
    description: "",
    deleteId: "",
    items: [],
    currentpage: 0,
    SearchcurrentPage: 0,
    pageCount: 0,
    searchPageCount: 0,
    bdcolor: "",
    search: "",
    searchPagination: false,

  };

  limit = 5;

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  handleDelShow = () => {
    this.setState({ delModal: true });
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    // const Usertoken = localStorage.getItem("token");
    // const config = {
    //   headers: { Authorization: `Bearer ${Usertoken}` },
    // };
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/departments/getalldepartment`,
        // config
      )
      .then((response) => {
        console.log(response)
        this.setState({items:response.data})
      })
      .catch((err) => {
        console.log(err);
      });
  };

    fetchData = async (currentPage) => {
    // const Usertoken = localStorage.getItem("token");
    // const config = {
    //   headers: { Authorization: `Bearer ${Usertoken}` },
    // };
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/departments/getdepartment/${this.limit}/${currentPage}`,
        // config
      );
      let respdata = await response.data;
      toast.success("department Fetched Successfully");
      return respdata.Departments;
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


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  handleSubmit = async (e) => {
    e.preventDefault();
    this.handleClose();
    // const Usertoken = localStorage.getItem("token");
    // console.log("hello")

    // const config = {
    //   headers: { Authorization: `Bearer ${Usertoken}` },
    // };
    const data = {
      name: this.state.name,
      description: this.state.description,
      // employees :this.state.employees
      // email: this.state.email,
    };
    console.log(data)

    try {
      await axios
        .post(
          // `${process.env.REACT_APP_BASE_URL}/departments/createdepartment`,
          "http://localhost:5000/departments/createdepartment",
          data,
          // config
        )
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            toast.success("department Created SuccessFully");
            this.getData();
          }
        });
    } catch (err) {
      console.log(err);
    }
    this.setState({ modal: false });
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

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
        `${process.env.REACT_APP_BASE_URL}/employees/search/${this.limit}/${this.state.SearchcurrentPage}`,
        data,
        config
      )
      .then((response) => {
        console.log(response);
        let total = response.data.count;
        this.setState({
          searchPageCount: Math.ceil(total / this.limit),
        });
        this.setState({ items: response.data.employees });
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
      toast.success("Tickets Fetched Successfully");
      return respdata.employees;
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

  handleDelClose = (e) => {
    e.preventDefault();
    this.setState({ delModal: false });
  };

  deleteEmp = async (empid) => {
    this.setState({ delModal: true });
    this.setState({ deleteId: empid });
  };

  handleDelResp = async (e) => {
    e.preventDefault();
    this.setState({ delModal: false });
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/employees/delete/${this.state.deleteId}`
      );
      let respdata = await response.data;
      toast.success("Employee deleted Successfully");
      this.getData();
      this.setState({ deleteId: "" });
    } catch (error) {
      console.log(error);
    }
  };

  reset = async (e) => {
    e.preventDefault();
    this.setState({ searchPagination: false });
    this.setState({ search: "" });
    toast.success("Resetting search");

    this.getData();
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
              <MDBCol size="3">
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
                </MDBInputGroup>
              </MDBCol>
              <MDBCol size="1">
                <MDBBadge
                  color="success"
                  light
                  onClick={this.handleShow}
                  style={{ cursor: "pointer" }}
                >
                  <AddIcon />
                </MDBBadge>
              </MDBCol>
            </MDBRow>
          </Form>
        </MDBContainer>

        <div className="table-responsive">
          <MDBContainer>
            <MDBTable bordered className="mt-5">
              <MDBTableHead className="table-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Action</th>
                  {/*<th scope="col">Email-id</th>
                  <th scope="col">Employess</th>
                 <th scope="col">CreatedOn</th>*/} 
            </tr>
              </MDBTableHead>
              <MDBTableBody>
                {this.state.items.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                     {/* <td>{item.employess}</td>*/}
                      

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

        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Create-Department</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FloatingLabel
                controlId="floatingTextarea1"
                label="Name"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  required
                  placeholder="Leave a comment here"
                  style={{ height: "60px", resize: "none" }}
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingTextarea2"
                label="Description"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  required
                  placeholder="Leave a comment here"
                  style={{ height: "150px", resize: "none" }}
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                />
              </FloatingLabel>
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
                onClick={this.handleSubmit}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <Modal show={this.state.delModal} onHide={this.handleDelClose}>
          <Modal.Body>Are you Sure!!! you want to delete</Modal.Body>
          <Modal.Footer>
            <form>
              <Button
                className="m-2"
                variant="primary"
                onClick={this.handleDelResp}
              >
                Yes
              </Button>
              <Button
                variant="secondary"
                className="m-2"
                onClick={this.handleDelClose}
              >
                No
              </Button>
            </form>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Departments;

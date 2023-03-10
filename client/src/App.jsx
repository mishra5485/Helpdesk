import { Routes, Route } from "react-router-dom";
import React, { Component } from "react";
import { withRouter } from "./components/withRouter";

import Signup from "./components/Signup";
import Login from "./components/Login";
import PageNotFound from "./components/404Page";
import Reset from "./components/Reset";

import UserDashBoard from "./components/User/UserDashboard";
import UserTicketInfo from "./components/User/UserTicketInfo";
import UserTickets from "./components/User/UserTickets";
import UserProfile from "./components/User/UserProfile";

import AdminDashboard from "./components/Admin/AdminDashboard";
import TicketsTable from "./components/Admin/TicketsTable";
import TicketInfo from "./components/Admin/Ticketinfo";
import EmployeeTable from "./components/Admin/EmployeeTable";
import EmployeeInfo from "./components/Admin/Employeeinfo";
import AdminProfile from "./components/Admin/AdminProfile";
import Departments from "./components/Admin/Departments";

import EmployeeTicketinfo from "./components/Employee/EmployeeTicketinfo";
import MyTickets from "./components/Employee/MyTickets";
import Alltickets from "./components/Employee/Alltickets";
import MyTicketsinfo from "./components/Employee/MyTicketsinfo";
import EmployeeTickets from "./components/Employee/EmployeeTickets";
import EmployeeProfile from "./components/Employee/Employeeprofile";
import EmployeeDashboard from "./components/Employee/EmployeeDashboard";
import Allticketsinfo from "./components/Employee/Allticketsinfo";

class App extends Component {
  state = {
    token: false,
    access_level: localStorage.getItem("access"),
  };

  render() {
    return (
      <Routes>
        <Route path="/user" element={<UserDashBoard />}>
          <Route path="usertickets" element={<UserTickets />} />
          <Route path="ticketinfo/:id" element={<UserTicketInfo />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>

        <Route path="/employee" element={<EmployeeDashboard />}>
          <Route path="alltickets" element={<Alltickets />} />
          <Route path="allticketsinfo/:id" element={<Allticketsinfo />} />
          <Route path="mytickets" element={<MyTickets />} />
          <Route path="myticketsinfo/:id" element={<MyTicketsinfo />} />
          <Route path="departmenttickets" element={<EmployeeTickets />} />
          <Route
            path="departmentticketsinfo/:id"
            element={<EmployeeTicketinfo />}
          />
          <Route path="profile" element={<EmployeeProfile />} />
        </Route>

        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="employeetable" element={<EmployeeTable />} />
          <Route path="employeeinfo/:id" element={<EmployeeInfo />} />
          <Route path="ticketstable" element={<TicketsTable />} />
          <Route path="ticketinfo/:id" element={<TicketInfo />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="departments" element={<Departments />} />
        </Route>

        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset/:token" element={<Reset />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    );
  }
}

export default withRouter(App);

import { Routes, Route } from "react-router-dom";
import React, { Component } from "react";
import { withRouter } from "./components/withRouter";
import RequireAuth from "./components/Context/requireauth";

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
        <Route
          path="/user"
          element={
            <RequireAuth>
              <UserDashBoard />
            </RequireAuth>
          }
        >
          <Route
            path="usertickets"
            element={
              <RequireAuth>
                <UserTickets />
              </RequireAuth>
            }
          />
          <Route
            path="ticketinfo/:id"
            element={
              <RequireAuth>
                <UserTicketInfo />
              </RequireAuth>
            }
          />
          <Route
            path="profile"
            element={
              <RequireAuth>
                <UserProfile />
              </RequireAuth>
            }
          />
        </Route>

        <Route
          path="/employee"
          element={
            <RequireAuth>
              <EmployeeDashboard />
            </RequireAuth>
          }
        >
          <Route
            path="alltickets"
            element={
              <RequireAuth>
                <Alltickets />
              </RequireAuth>
            }
          />
          <Route
            path="allticketsinfo/:id"
            element={
              <RequireAuth>
                <Allticketsinfo />
              </RequireAuth>
            }
          />
          <Route
            path="mytickets"
            element={
              <RequireAuth>
                <MyTickets />
              </RequireAuth>
            }
          />
          <Route
            path="myticketsinfo/:id"
            element={
              <RequireAuth>
                <MyTicketsinfo />
              </RequireAuth>
            }
          />
          <Route
            path="departmenttickets"
            element={
              <RequireAuth>
                <EmployeeTickets />
              </RequireAuth>
            }
          />
          <Route
            path="departmentticketsinfo/:id"
            element={
              <RequireAuth>
                <EmployeeTicketinfo />
              </RequireAuth>
            }
          />
          <Route
            path="profile"
            element={
              <RequireAuth>
                <EmployeeProfile />
              </RequireAuth>
            }
          />
        </Route>

        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminDashboard />
            </RequireAuth>
          }
        >
          <Route
            path="employeetable"
            element={
              <RequireAuth>
                <EmployeeTable />
              </RequireAuth>
            }
          />
          <Route
            path="employeeinfo/:id"
            element={
              <RequireAuth>
                <EmployeeInfo />
              </RequireAuth>
            }
          />
          <Route
            path="ticketstable"
            element={
              <RequireAuth>
                <TicketsTable />
              </RequireAuth>
            }
          />
          <Route
            path="ticketinfo/:id"
            element={
              <RequireAuth>
                <TicketInfo />
              </RequireAuth>
            }
          />
          <Route
            path="profile"
            element={
              <RequireAuth>
                <AdminProfile />
              </RequireAuth>
            }
          />
          <Route
            path="departments"
            element={
              <RequireAuth>
                <Departments />
              </RequireAuth>
            }
          />
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

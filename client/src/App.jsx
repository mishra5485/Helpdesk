import { Switch, Route } from "react-router-dom";

// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import DashBoard from "./components/User/DashBoard";
// import PageNotFound from "./components/404Page";
// import TicketInfo from "./components/User/TicketInfo";

// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import DashBoard from "./components/Admin/DashBoard";
// import TicketsTable from "./components/Admin/TicketsTable";
// import TicketInfo from "./components/Admin/TicketInfo";
// import EmployeeTable from "./components/Admin/EmployeeTable";
// import EmployeeInfo from "./components/Admin/Employeeinfo";
// import PageNotFound from "./components/404Page";

import Signup from "./components/Signup";
import Login from "./components/Login";
import PageNotFound from "./components/404Page";
import EmployeeTicketinfo from "./components/Employee/EmployeeTicketinfo";
import MyTickets from "./components/Employee/MyTickets";
import Alltickets from "./components/Employee/Alltickets";
import MyTicketsinfo from "./components/Employee/MyTicketsinfo";
import EmployeeTickets from "./components/Employee/EmployeeTickets";
import Profile from "./components/Employee/Profile";

function App() {
  return (
    <>
      {/* <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/user/dashboard" component={DashBoard} />
        <Route path="/user/ticketinfo/:id" component={TicketInfo} />
        <Route path="*" component={PageNotFound} />
      </Switch> */}

      {/* <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/admin/dashboard" component={DashBoard} />
        <Route path="/admin/tickettable" component={TicketsTable} />
        <Route path="/admin/ticketinfo/:id" component={TicketInfo} />
        <Route path="/admin/employeetable" component={EmployeeTable} />
        <Route path="/admin/employeeinfo/:id" component={EmployeeInfo} />
        <Route path="*" component={PageNotFound} />
      </Switch> */}

      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/employee/tickets" component={EmployeeTickets} />
        <Route path="/employee/profile" component={Profile} />
        <Route path="/employee/alltickets" component={Alltickets} />
        <Route
          path="/employee/Employeeticketinfo/:id"
          component={EmployeeTicketinfo}
        />
        <Route path="/employee/mytickets/:id" component={MyTickets} />
        <Route path="/employee/Myticketinfo/:id" component={MyTicketsinfo} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;

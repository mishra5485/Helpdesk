import { Switch, Route } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import DashBoard from "./components/User/DashBoard";
import PageNotFound from "./components/404Page";
import TicketInfo from "./components/User/TicketInfo";

// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import TicketInfo from "./components/Admin/Ticketinfo";
// import DashBoard from "./components/Admin/DashBoard";
// import EmployeTable from "./components/Admin/EmployeTable";
// import TicketsTable from "./components/Admin/TicketsTable";
// import Employeeinfo from "./components/Admin/Employeeinfo";
// import PageNotFound from "./components/404Page";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/user/dashboard" component={DashBoard} />
        <Route path="/user/ticketinfo/:id" component={TicketInfo} />
        <Route path="*" component={PageNotFound} />
      </Switch>

      {/* <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/admin/dashboard" component={DashBoard} />
        <Route path="/admin/employee/table" component={EmployeTable} />
        <Route path="/admin/employee/info/:id" component={Employeeinfo} />
        <Route path="/admin/ticket/table" component={TicketsTable} />
        <Route path="/admin/ticketinfo/:id" component={TicketInfo} />
        <Route path="*" component={PageNotFound} />
      </Switch> */}
    </>
  );
}

export default App;

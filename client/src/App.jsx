import { Switch, Route } from "react-router-dom";

// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import DashBoard from "./components/User/DashBoard";
// import PageNotFound from "./components/404Page";
// import TicketInfo from "./components/User/TicketInfo";

import Signup from "./components/Signup";
import Login from "./components/Login";
import DashBoard from "./components/Admin/DashBoard";
import TicketsTable from "./components/Admin/TicketsTable";
import TicketInfo from "./components/Admin/TicketInfo";
import EmployeeTable from "./components/Admin/EmployeeTable";
import EmployeeInfo from "./components/Admin/Employeeinfo";
import PageNotFound from "./components/404Page";

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

      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/admin/dashboard" component={DashBoard} />
        <Route path="/admin/tickettable" component={TicketsTable} />
        <Route path="/admin/ticketinfo/:id" component={TicketInfo} />
        <Route path="/admin/employeetable" component={EmployeeTable} />
        <Route path="/admin/employeeinfo/:id" component={EmployeeInfo} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;

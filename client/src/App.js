import { Switch, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import DashBoard from "./components/DashBoard";
import PageNotFound from "./components/404Page";
import TicketInfo from "./components/TicketInfo";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={DashBoard} />
        <Route path="/TicketInfo/:id" component={TicketInfo} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;

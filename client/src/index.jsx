import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <GoogleOAuthProvider clientId="214010166124-urdkbn0993d2f8h950voub3cmfdkgbfd.apps.googleusercontent.com">
        <Router>
          <App />
        </Router>
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
);

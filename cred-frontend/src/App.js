import { useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { AuthContext } from "./context";
import ViewCard from "./components/ViewCard/ViewCard";
import DashBoard from "./components/DashBoard/DashBoard";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Landing from "./components/Landing/Landing";
import AddCard from "./components/AddCard/AddCard";
import Statement from "./components/Statement/Statement";
import Pay from "./components/Pay/Pay";
import CreditForm from "./components/AddCard/CreditForm";

axios.defaults.baseURL = "https://credcredit-server.herokuapp.com/";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});

  const login = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("userData", JSON.stringify(user));
  };
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  };
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("token"));
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (storedData && userData && storedData) {
      // console.log(storedData.token);
      login(storedData, userData);
    }
  }, [token]);
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, user: user, login: login, logout: logout }}
    >
      <Router>
        <Route exact path="/" component={Landing} />
        {!token ? (
          <Redirect exact to="/" />
        ) : (
          <div>
            <Route exact path="/dashboard" component={DashBoard} />
            <Route exact path="/addcard" component={CreditForm} />
            <Route exact path="/viewCards" component={ViewCard} />
            <Route
              exact
              path="/statement/:cardId/:year/:month"
              component={Statement}
            />
            <Route exact path="/pay/:cardId" component={Pay} />
          </div>
        )}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

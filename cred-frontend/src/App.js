import { useEffect, useState } from "react";
// import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContext } from "./context";
import ViewCard from "./components/ViewCard/ViewCard";
import DashBoard from "./components/DashBoard/DashBoard";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Landing from "./components/Landing/Landing";
import AddCard from "./components/AddCard/AddCard";
import { setAxiosAuthToken } from "./utils/Utils";
import Statement from "./components/Statement/Statement";
import Pay from "./components/Pay/Pay";
import SuccessPage from "./components/SuccessPage/SuccessPage";


if (window.location.origin === "http://localhost:3000") {
  axios.defaults.baseURL = "http://127.0.0.1:8080";
} else {
  axios.defaults.baseURL = window.location.origin;
}
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
    // console.log(!!token);
    const storedData = JSON.parse(localStorage.getItem("token"));
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (storedData && userData && storedData) {
      // console.log(storedData.token);
      login(storedData, userData);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, user: user, login: login, logut: logout }}
    >
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/dashboard" component={DashBoard} />
          <Route exact path="/addcard" component={AddCard} />
          <Route exact path="/viewCards" component={ViewCard} />
          <Route exact path="/statement/:cardId/:year/:month" component={Statement} />
          <Route exact path="/pay/:cardId" component={Pay} />
          <Route exact path="/success" component={SuccessPage} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

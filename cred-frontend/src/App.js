import './App.css';
import { ToastContainer } from "react-toastify";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
if (window.location.origin === "http://localhost:3000") {
  axios.defaults.baseURL = "http://127.0.0.1:8081";
} else {
  axios.defaults.baseURL = window.location.origin;
}
function App() {
  return (
    <Router>
      <ToastContainer hideProgressBar={true} newestOnTop={true} />
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        {/* <Route path="/dashboard" component={DashBoard}/> */}
      </Switch>
      </Router>
  );
}

export default App;
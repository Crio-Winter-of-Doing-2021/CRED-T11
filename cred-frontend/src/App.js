import './App.css';
import { ToastContainer } from "react-toastify";
import {Route,Switch} from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import DashBoard from './components/DashBoard/DashBoard';
import "react-toastify/dist/ReactToastify.css";
import requireAuth from './utils/RequireAuth';
import axios from 'axios';
import Root from './Root';
if (window.location.origin === "http://localhost:3000") {
  axios.defaults.baseURL = "http://127.0.0.1:8000";
} else {
  axios.defaults.baseURL = window.location.origin;
}
function App() {
  return (
    <Root>
      <ToastContainer hideProgressBar={true} newestOnTop={true} />
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={requireAuth(DashBoard)}/>
      </Switch>
    </Root>
  );
}

export default App;
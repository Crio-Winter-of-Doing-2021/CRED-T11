import './App.css';
import { useEffect ,useState } from 'react';
import { ToastContainer } from "react-toastify";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {AuthContext} from './context';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import DashBoard from './components/DashBoard/DashBoard';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
if (window.location.origin === "http://localhost:3000") {
  axios.defaults.baseURL = "http://127.0.0.1:8080";
} else {
  axios.defaults.baseURL = window.location.origin;
}
function App() {
  const [token,setToken]=useState(null);

  const login=(token)=>{
    setToken(token);
    localStorage.setItem("userData",JSON.stringify({token}));

  }
  const logout=()=>{
    setToken(null);
    localStorage.removeItem('userData');
  }
  useEffect(()=>{
    console.log(!!token)
    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (storedData && storedData.token){
      console.log(storedData.token)
      login(storedData.token)
    }
  },[login])

  return (
    <AuthContext.Provider value={{isLoggedIn:!!token,login:login,logut:logout}}>
    <Router>
      <ToastContainer hideProgressBar={true} newestOnTop={true} />
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={DashBoard}/>
      </Switch>
      </Router>
      </AuthContext.Provider>
  );
}

export default App;
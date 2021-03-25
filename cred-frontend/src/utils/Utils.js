import axios from "axios";
import { toast } from "react-toastify";


export const setAxiosAuthToken = () => {
    const token=JSON.parse(localStorage.getItem("token"))
    if (typeof token !== "undefined" && token) {
        axios.defaults.headers.common["x-access-token"] = token;
    } else {
        delete axios.defaults.headers.common["x-access-token"];
    }
}


export const toastOnError = error => {
    if (error.response) {
        toast.error(JSON.stringify(error.response.data))
    } else if (error.message) {
        toast.error(JSON.stringify(error.message))
    } else {
        toast.error(JSON.stringify(error));
    }
};
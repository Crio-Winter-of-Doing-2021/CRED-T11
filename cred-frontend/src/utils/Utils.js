import axios from "axios";


export const setAxiosAuthToken = () => {
    const token = JSON.parse(localStorage.getItem("token"))
    if (typeof token !== "undefined" && token) {
        axios.defaults.headers.common["x-access-token"] = token;
    } else {
        delete axios.defaults.headers.common["x-access-token"];
    }
}


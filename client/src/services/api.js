import axios from "axios";

const API = axios.create({
    baseURL: "https://lead-management-system-jnml.onrender.com/api",
});

export default API;
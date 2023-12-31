import axios from "axios";

const api = axios.create({
  baseURL: "https://ailembrei-backend.onrender.com",
});

export default api;
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.ailembrei.com",
});

export default api;
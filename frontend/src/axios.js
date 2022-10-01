import axios from "axios";

// * CREATING AXIOS INSTANCE
const instance = axios.create({
  baseURL: "http://localhost:5000",
});

// * ADD TOKEN IN REQUEST HEADER
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default instance;

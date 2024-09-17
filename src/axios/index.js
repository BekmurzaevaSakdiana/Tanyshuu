import axios from "axios";

const API = axios.create({
  baseURL: "https://akmaanai.pythonanywhere.com/api",
});

API.interceptors.request.use(
  (config) => {
    const TOKEN = localStorage.getItem("token");
    if (TOKEN) {
      config.headers.Authorization = "Token " + TOKEN;
    }
    return config;
  },
  (e) => Promise.reject(e)
);

API.interceptors.response.use(
  (res) => Promise.resolve(res),
  (error) => {
    if (error.response && (error.response.status == 401 || error.response.status === 403)) {
      localStorage.removeItem("token");
      window.location.replace('/login')
    }
    return Promise.reject(error);
  }
);
export default API;

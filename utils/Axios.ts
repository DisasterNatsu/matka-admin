import axios from "axios";

export const Axios = axios.create({
  baseURL: "https://api.smartmumbaimatka.in/",
  timeout: 50000,
});

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV
    ? `http://127.0.0.1:5000/api/v1`
    : import.meta.env.VITE_BACKEND,
});

export function setToken(token: string) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

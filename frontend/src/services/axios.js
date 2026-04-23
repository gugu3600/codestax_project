import axios from "axios";


const api = import.meta.env.VITE_APP;

export const apiClient = axios.create({
     baseURL : api,
     withCredentials: true,
     headers : {
          "Content-Type" : "application/json",
          "Accept" : "application/json",
     },
});

// apiClient.interceptors.request.use(
//      config => {
//           const token = localStorage.getItem("token");

//           if(token){
//                config.headers.Authorization = `Bearer ${token}`
//           }
//           return config;
//      },
//      error => Promise.reject(error)
// )
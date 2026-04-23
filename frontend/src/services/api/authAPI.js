import { apiClient } from "../axios"

export const authAPI = {

     login: async (data) => {
          const res = await apiClient.post("/auth/login",data);
          return res.data
     },

     logout : async () => {
          const res = await apiClient.get("/auth/logout");
          return res;
     },

     register: async (data) => {
          const res = await apiClient.post("/auth/register", data);
          return res.data;
     },

     verify : async () => {
          const res = await apiClient.get("/auth/verify");
          return res.data
     }

}
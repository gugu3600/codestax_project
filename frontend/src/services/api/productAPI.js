import { apiClient } from "../axios";


export const productAPI = {

     getAll: async () => {

          try {
               const res = await apiClient.get("/products");
               return res.data;
          }

          catch (error) {
               return error.message;
          }
     },

     create: async (data) => {
          try {
               const res = await apiClient.post("/products", data);
               return res.data;
          }

          catch (error) {
               return error.message;
          }
     },

     update: async (id, data) => {
          try {
               const res = await apiClient.put(`/products/${id}`, data);
               return res.data;
          }

          catch (error) {
               return error.message;
          }
     },

     delete: async (id) => {
          try {
               const res = await apiClient.delete(`/products/${id}`);
               return res.data;
          }

          catch (error) {
               return error.message;
          }
     },

     search: async (q) => {

          try {
               const res = await apiClient.get(`/products/search?q=${q}`);
               return res.data;
          }

          catch(error) {
               return error.message;
          }
     }
}
import { apiClient } from "../axios"

export const categoryAPI = {

     getAll: async () => {
          try {
               const res = await apiClient.get("/categories");
               return res.data;
          }
          catch (error) {
               return error.message || "Error in getAll Category API";
          }
     },

     create: async ({ name }) => {
          try {
               const res = await apiClient.post(`/categories`, { name });
               return res.data;
          }
          catch (error) {
               return error.message;
          }
     },

     update: async (id, { name }) => {
          try {
               const res = await apiClient.put(`/categories/${id}`, { name });
               return res.data;
          }
          catch (error) {
               return error.message;
          }
     },

     delete: async (id) => {
          try {
               const res = await apiClient.delete(`/categories/${id}`);
               return res.data;
          }

          catch (error) {
               return error.message;
          }
     }
}
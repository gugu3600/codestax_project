import { prisma } from "../lib/prisma.js";

export default class CategoryController { 

     static async index(req, res) {
          try {
               const categories = await prisma.category.findMany({
                    where: { isDeleted: false },
                    include: { products: true }
               });
               console.log("Categories retrive successfully");
               return res.status(200).json(categories);
          }
          catch (error) {
               console.log("Error retrived Categories", error.message);
               return res.status(500).json({ message: "Internal server error" });
          }
     }

     static async show(req, res) {
          try {
               const { category } = res.locals;
               console.log("Category retrive successfully");
               return res.status(200).json(category);
          }
          catch (error) {
               console.log("Error retrived category", error.message);
               return res.status(500).json({ message: "Internal server error" });
          }
     }

     static async store(req, res) {
          const {name} = res.locals;
          try {
               const category = await prisma.category.create({
                    data: {name}
               })
               console.log("Category create successfully");
               return res.status(200).json(category);
          }
          catch (error) {
               console.log("Error create category", error.message);
               return res.status(500).json({ message: "Internal server error" });
          }
     }

     static async update(req, res) {
          const { id } = res.locals.category;
          // console.log(id);
          const {name} = res.locals;
          try {
               const category = await prisma.category.update({
                    where: {id},
                    data: {name}
               });
               console.log("Category update successfully");
               return res.status(200).json(category);
          }
          catch (error) {
               console.log("Error update products", error.message);
               return res.status(500).json({ message: "Internal server error" });
          }
     }

     static async destroy(req, res) {

          const { id } = req.params;
          try {
               const category = await prisma.category.update({
                    where: { id: Number(id) },
                    data: {
                         isDeleted: true,
                         deleted_at: new Date()
                    },
               });
               console.log("Product deleted successfully");
               return res.status(200).json(category);
          }
          catch (error) {
               console.log("Error deleted categories", error.message);
               return res.status(500).json({ message: "Internal server error" });
          }
     }

     static async restore(req,res) {

          const { id } = req.params;
          try {
               const category = await prisma.category.update({
                    where: { id: Number(id) },
                    data: {
                         isDeleted: false,
                         deleted_at: null
                    },
               });
               console.log("Category restoer successfully");
               return res.status(200).json(category);
          }
          catch (error) {
               console.log("Error restore categories", error.message);
               return res.status(500).json({ message: "Internal server error" });
          }
     }
}
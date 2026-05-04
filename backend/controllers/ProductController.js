import { prisma } from "../lib/prisma.js";

export default class ProductController {

     static async index(req, res) {
          try {
               const products = await prisma.product.findMany({
                    where: { isDeleted: false },
                    include: { category: true }
               });
               console.log("Products retrive successfully");
               return res.status(200).json(products);
          }
          catch (error) {
               console.log("Error retrived products", error.message);
               return res.status(500).json({ message: "Internal server error" });
          }
     }

     static async show(req, res) {
          try {
               const { product } = res.locals;
               console.log("Product retrive successfully");
               return res.status(200).json(product);
          }
          catch (error) {
               console.log("Error retrived product", error.message);
               return res.status(500).json({ message: "Internal server error" });
          }
     }

     static async store(req, res) {
          const { data } = res.locals;
          const profilePath = req.files["profile"] ? req.files["profile"][0].path : null;
          const imagesPaths = req.files["images"] ? req.files["images"].map(img => ({path : img.path})) : [];

          try {
               const product = await prisma.product.create({
                    data: {
                         ...data,
                         profile : profilePath,
                         images : {
                              create : imagesPaths
                         }
                    },
                    include: { category: true }
               })
               console.log("Product create successfully");
               return res.status(200).json(product);
          }
          catch (error) {
               console.log("Error create product", error.message);
               return res.status(500).json({ message: "Internal server error" });
          }
     }

     static async update(req, res) {
          const { id } = res.locals.product;
          const data = req.body;
          try {
               const product = await prisma.product.update({
                    where: { id },
                    data: data
               });
               console.log("Product update successfully");
               return res.status(200).json(product);
          }
          catch (error) {
               console.log("Error update products", error.message);
               return res.status(500).json({ message: "Internal server error" });
          }
     }

     static async destroy(req, res) {

          const { id } = req.params;
          try {
               const product = await prisma.product.update({
                    where: { id: Number(id) },
                    data: {
                         isDeleted: true,
                         deleted_at: new Date()
                    },
               });
               console.log("Product deleted successfully");
               return res.status(200).json(product);
          }
          catch (error) {
               console.log("Error deleted products", error.message);
               return res.status(500).json({ message: "Internal server error" });
          }
     }

     static async restore(req, res) {

          const { id } = req.params;
          try {
               const product = await prisma.product.update({
                    where: { id: Number(id) },
                    data: {
                         isDeleted: false,
                         deleted_at: null
                    },
               });
               console.log("Product restoer successfully");
               return res.status(200).json(product);
          }
          catch (error) {
               console.log("Error restore product", error.message);
               return res.status(500).json({ message: "Internal server error" });
          }
     }

     static async search(req, res) {
          const { q } = req.query;
          try {
               const products = await prisma.product.findMany({
                    where: {
                         isDeleted: false,
                         OR: [
                              { name: { contains: q || ""} },
                              {
                                   category:
                                        { name: { contains: q } }
                              }
                         ]
                    },
                    include: { category: true }
               });

               console.log("Product search successfully");
               return res.status(200).json(products);
          }

          catch (error){
               console.log("Error search product", error.message);
               return res.status(500).json({ message: "Internal server error" });
          }
     }
}
import express from "express";
import ProductController from "../controllers/ProductController.js";
import { isDelete } from "../middleware/isDelete.js";
import { categoryIsDelete } from "../middleware/categoryIsDelete.js";
import CategoryController from "../controllers/CategoryController.js";
import { canRestoreProduct } from "../middleware/canRestoreProduct.js";
import { canRestoreCategory } from "../middleware/canRestoreCategory.js";
import { categoryValidator } from "../validation/categoryValidate.js";
import AuthController from "../controllers/AuthController.js";
import { authValidator } from "../validation/auth/AuthValidate.js";
import { productValidator } from "../validation/productValidate.js";
import { auth } from "../middleware/auth.js";

export const route = express.Router();

//auth
route.post("/auth/register", authValidator, AuthController.register);
route.post("/auth/login", authValidator, AuthController.login);
route.get("/auth/verify",AuthController.verify);


route.use(auth)
//category 
route.get("/categories", CategoryController.index);
route.get("/categories/:id", categoryIsDelete, CategoryController.show);
route.post("/categories",categoryValidator, CategoryController.store);
route.put("/categories/:id", categoryIsDelete,categoryValidator, CategoryController.update);
route.delete("/categories/:id", categoryIsDelete, CategoryController.destroy);
route.get("/categories/:id/restore", canRestoreCategory, CategoryController.restore);

// product 
route.get("/products", ProductController.index);
route.get("/products/:id",isDelete,ProductController.show);
route.post("/products",productValidator,ProductController.store);
route.put("/products/:id", isDelete, productValidator, ProductController.update);
route.delete("/products/:id", isDelete, ProductController.destroy);
route.get("/products/:id/restore", canRestoreProduct, ProductController.restore);

// auth
route.get("/auth/logout", AuthController.logout);


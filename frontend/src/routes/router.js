import CategoryView from "@/view/CategoryView.vue";
import ProductView from "@/view/ProductView.vue";
import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "./routeguard.js";
import Home from "@/view/client/Home.vue";

const routes = [
     {path : "/",component : Home,meta : {auth : false}},
     {path : "/login",component : import("../view/LoginView.vue")},
     { path: "/register", component: import("../view/RegisterView.vue")},
     {path : "/cart" , component : import ("@/view/client/CartView.vue") ,meta : {auth : true}},
     {path : "/admin/categories" , component : CategoryView,meta : {auth : true,authorize : true}},
     { path: "/admin/products", component: ProductView , meta : {auth : true,authorize : true}},
]


export const router = createRouter({
     history : createWebHistory(),
     routes
});
authGuard(router);
import CategoryView from "@/view/CategoryView.vue";
import ProductView from "@/view/ProductView.vue";
import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "./routeguard.js";
import Home from "@/view/client/Home.vue";

const routes = [
     {path : "/home",component : Home},
     {path : "/",component : import("../view/LoginView.vue")},
     { path: "/register", component: import("../view/RegisterView.vue")},
     {path : "/categories" , component : CategoryView,meta : {auth : true}},
     { path: "/products", component: ProductView , meta : {auth : true}},
]


export const router = createRouter({
     history : createWebHistory(),
     routes
});
authGuard(router);
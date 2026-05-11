<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { removeAuth, isLoggedIn, auth } from '@/stores/authStore';
import { authAPI } from '@/services/api/authAPI';

import {cartCount} from "@/stores/cartStore"

const admin_headers = [
     { path: "/", name: "Home" },
     { path: "/admin/categories", name: "Categories" },
     { path: "/admin/products", name: "Products" },
     { path: "/admin/orders", name: "Orders" },
     { path: "/admin/order_items", name: "Order_Items" }
];
const router = useRouter();

const logout = async () => {
     if (isLoggedIn.value) {
          await authAPI.logout();
          removeAuth();
          router.replace("/");
     }
}
</script>

<template>
     <header class="max-w-7xl mx-auto px-4">
          <nav class="bg-slate-800 text-white mt-4 p-4 flex justify-between items-center rounded-xl shadow-lg">
          
               <h1 class="text-2xl font-black tracking-tighter text-amber-500">LOGO</h1>

               <ul v-if="auth?.role_id == 1" class="hidden md:flex items-center gap-6 font-medium">
                    <li v-for="header in admin_headers" :key="header.path" class="hover:text-amber-500 transition-colors duration-300">
                         <RouterLink :to="header.path">
                              {{ header.name }}
                         </RouterLink>
                    </li>
               </ul>

               <ul v-else class="flex items-center gap-6 font-medium">
                    <li class="hover:text-amber-500 transition-colors duration-300">
                         <RouterLink to="/">Home</RouterLink>
                    </li>
                    <li class="relative group">
                         <RouterLink to="/cart" class="flex items-center">
                              <i class="fa-solid fa-cart-shopping text-xl group-hover:text-amber-500 transition-colors"></i>
                              <span v-if="cartCount > 0" 
                                    class="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-slate-800">
                                   {{ cartCount }}
                              </span>
                         </RouterLink>
                    </li>
               </ul>

               <div class="flex items-center gap-4">
                    <RouterLink v-if="!isLoggedIn" 
                         to="/login" 
                         class="bg-amber-600 hover:bg-amber-700 px-5 py-2 rounded-lg font-bold transition-all shadow-md">
                         Login
                    </RouterLink>
                    <button v-else 
                         @click="logout" 
                         class="bg-slate-700 hover:bg-red-600 px-5 py-2 rounded-lg font-bold transition-all border border-slate-600">
                         Logout
                    </button>
               </div>
          </nav>
     </header>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { removeAuth, isLoggedIn, auth } from '@/stores/authStore';
import { authAPI } from '@/services/api/authAPI';


const admin_headers = [
     { path: "/", name: "Home" },
     { path: "/admin/categories", name: "Categories" },
     { path: "/admin/products", name: "Products" },
     { path: "/admin/orders", name: "Orders" },
     { path: "/admin/order_items", name: "Order_Items" }
];
const router = useRouter();

// console.log(auth);
const logout = async () => {

     if (isLoggedIn.value) {
          await authAPI.logout();
          removeAuth();
          router.replace("/");
     }
}
</script>


<template>
     <header>
          <nav class="bg-slate-500 mt-3 p-3 flex justify-between">
          
               <ul v-if="auth?.role_id == 1" class="text-xl flex gap-3 mx-4">
                    <li v-for="header in admin_headers" class="hover:text-amber-700">
                         <RouterLink :to="header.path">
                              {{ header.name }}
                         </RouterLink>
                    </li>
               </ul>

                <ul v-else class="text-xl flex gap-3 mx-4">
                    <li class="hover:text-amber-700">
                         <RouterLink to="/">
                              Home
                         </RouterLink>
                    </li>
               </ul>

               <ul>
                    <li>
                         <RouterLink v-if="!isLoggedIn" to="/login">Login</RouterLink>
                         <button v-else @click="logout">Logout</button>
                    </li>
               </ul>
          </nav>
     </header>
</template>
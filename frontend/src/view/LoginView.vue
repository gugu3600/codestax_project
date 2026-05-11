<script setup>
import { authAPI } from '@/services/api/authAPI';
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { setAuth } from '@/stores/authStore';

const name = ref("");
// const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const handleLogin = async () => {

     error.value = "";
     if (!name.value || !password.value) {
          error.value = "Required Username or Password for login";
          return 0;
     }

     const data = {
          email: name.value,
          password: password.value
     }
     // console.log(password.value);
     
     try {
          const user = await authAPI.login(data);
          if (user) {
               setAuth(user);
               return router.push("/");
          }
          console.log(user);
          error.value = "Wrong Name or Password"
          return router.push("/login")
     }

     catch (error) {
          error.value = "You Cannot Login Internal Server error";
          return 0;
     }
}

</script>


<template>

     <div class="flex justify-center items-center mt-10">
          <div class="w-64 h-[400px] p-5 bg-gray-300 rounded-lg">
               <h1 class="text-center text-xl font-bold my-3">Login</h1>

               <form @submit.prevent="handleLogin">

                    <div v-if="error" class="text-center text-red-700">
                         <p>{{ error }}</p>
                    </div>
                    <div class="form-group mb-5">
                         <label for="name" class="font-bold">Name</label>
                         <input type="text" id="name" class="p-2 rouded-xl border-b outline-none"
                              placeholder="Enter A Name" v-model="name">
                    </div>

                    <div class="form-group my-5">
                         <label for="password" class="font-bold">Password</label>
                         <input type="password" class="p-2 rouded-xl border-b outline-none" id="password"
                              placeholder="********" v-model="password">
                    </div>

                    <div class="form-group mx-6">
                         <button type="submit" class="bg-green-700 text-white p-3 w-40 rounded-2xl">Login</button>
                    </div>

                    <div class="form-group mx-6 mt-4">
                         <RouterLink class="bg-amber-700 text-white p-3 w-40 rounded-2xl mx-10" to="/register">Register
                         </RouterLink>
                    </div>
               </form>

          </div>
     </div>

</template>
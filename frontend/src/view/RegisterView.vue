<script setup>
import { authAPI } from '@/services/api/authAPI';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const error = ref(null);
const user = reactive({
     name : "",
     password : "",
});

const handleRegister = async () => {

     try {
          await authAPI.register(user);
          return router.push("/");
     }

     catch (error){
          error.value = "Invalid Register"
          return false; 
     }
}

</script>

<template>

     <div class="flex justify-center items-center mt-7">
          <div class="w-64 h-[400px] p-5 bg-gray-300 rounded-lg">
               <h1 class="text-center text-xl font-bold my-3">Register</h1>

               <form @submit.prevent="handleRegister">

                    <div v-if="error">
                         <p>{{ error }}</p>
                    </div>
                    <div class="form-group mb-5">
                         <label for="name" class="font-bold">Name</label>
                         <input type="text" id="name" class="p-2 rouded-xl border-b outline-none"
                              placeholder="Enter A Name" v-model="user.name">
                    </div>

                    <div class="form-group my-5">
                         <label for="password" class="font-bold">Password</label>
                         <input type="password" class="p-2 rouded-xl border-b outline-none" id="password"
                              placeholder="********" v-model="user.password">
                    </div>

                    <div class="form-group mx-6 mt-4">
                         <button type="submit" class="bg-amber-700 text-white p-3 w-40 rounded-2xl hover:bg-amber-400">Register</button>
                    </div>
               </form>

          </div>
     </div>


</template>
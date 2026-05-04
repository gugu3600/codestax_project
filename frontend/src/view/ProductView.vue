<script setup>
import Table from '@/components/Table.vue';
import { categoryAPI } from '@/services/api/categoryAPI';
import { productAPI } from '@/services/api/productAPI';
import { onMounted, ref, watch } from 'vue';

const imgURL = import.meta.env.VITE_IMG_URL;
const products = ref([]);
const categories = ref([]);
const newProduct = ref({ name: "", stock: 0, price: 0, category_id: 0 });
const makeCreate = ref(false);
const searchQuery = ref("");
const profileImg = ref(null);
const images = ref([]);

const handleProfileChange = e => {
     profileImg.value = e.target.files[0];
}

const handleImageChange = e => {
     images.value = Array.from(e.target.files);
}


const getAllProducts = async () => {

     try {
          const data = await productAPI.getAll();
          products.value = data.map(p => ({ ...p, isEdit: false }));
     }

     catch (error) {
          console.error("Error fetching Categories", error);
     }
}

const handleCreate = async () => {

     const formData = new FormData();

     formData.append("name", newProduct.value.name);
     formData.append("stock", Number(newProduct.value.stock));
     formData.append("price", Number(newProduct.value.price));
     formData.append("category_id", Number(newProduct.value.category_id));

     if (profileImg.value) {
          formData.append("profile", profileImg.value);
     }

     images.value.forEach(file => {
          formData.append("images", file);
     });
     // const data = {
     //      name: newProduct.value.name,
     //      stock: Number(newProduct.value.stock),
     //      price: Number(newProduct.value.price),
     //      category_id: Number(newProduct.value.category_id),
     // }


     try {
          const product = await productAPI.create(formData)
          newProduct.value.name = "";
          newProduct.value.stock = 0;
          newProduct.value.price = 0;
          profileImg.value = null;
          images.value = [];
          products.value.push({ ...product, isEdit: false });
          makeCreate.value = false;
          searchQuery.value = "";
          getAllProducts();
     }

     catch {
          console.error("Error posting Product", error);
     }
}

const onUpdate = async (product) => {

     const data = {
          name: product.name,
          stock: Number(product.stock),
          price: Number(product.price),
          category_id: Number(product.category_id)
     }

     try {
          await productAPI.update(product.id, data);
          const updateCat = categories.value.find(category => category.id === data.category_id);

          if (updateCat) {
               product.category = updateCat;
          }
          product.isEdit = false;
     }

     catch (error) {
          console.error("Error Updating Product", error);
     }
}

const deleteProduct = async (id) => {
     try {
          await productAPI.delete(id);
          products.value = products.value.filter(p => p.id != id);
     }

     catch (error) {
          console.error("Error Deleting Prdouct", error);
     }
}

const handleSearch = async (query) => {

     if (!query && query.trim() === "") {
          await getAllProducts();
          return true;
     }

     const data = await productAPI.search(query);
     return products.value = data.map(p => ({ ...p, isEdit: false }));

}

onMounted(async () => {
     await getAllProducts();
     categories.value = await categoryAPI.getAll();
     console.log(products.value)
     // console.log(categories.value)
});


</script>


<template>
     <div>

          <div class="p-3 bg-gray-600 w-[50%]">
               <div v-if="!makeCreate">
                    <button @click="() => { makeCreate = true }">Create A Product</button>
               </div>
               <div v-else class="m-3 p-3">
                    <form @submit.prevent="handleCreate">
                         <h1 class="text-bold text-2xl mb-3">Create A New Category </h1>
                         <div class="form-group">
                              <label for="name">Product Name</label>
                              <input id="name" type="text" placeholder="Product Name" class="p-2 mx-3"
                                   v-model="newProduct.name">
                         </div>


                         <div class="form-group">
                              <label for="stock">Stock Amount</label>
                              <input id="stock" type="number" placeholder="Product Stock" class="p-2 mx-3"
                                   v-model="newProduct.stock">

                         </div>

                         <div class="form-group">
                              <label for="price">Product Price</label>
                              <input type="number" placeholder="Product Price" class="p-2 mx-3"
                                   v-model="newProduct.price">
                         </div>


                         <div class="form-group">
                              <select v-model="newProduct.category_id">
                                   <option :value="0" disabled="">Select An Category Type</option>
                                   <option v-for="category in categories" :value="category.id">{{ category.name }}
                                   </option>
                              </select>
                         </div>

                         <div class="form-group">
                              <label class="block">
                                   Product Profile Image
                              </label>

                              <input type="file" @change="handleProfileChange" accept="image/*" class="bg-white p-1">
                         </div>

                         <div class="form-group">
                              <label class="block">
                                   Product Profile Image
                              </label>

                              <input type="file" @change="handleImageChange" accept="image/*" multiple
                                   class="bg-white p-1">
                         </div>

                         <div class="form-group">
                              <button type="submit" class="bg-green-700 text-white p-3">Create Product</button>
                         </div>

                    </form>
               </div>
          </div>

          <div>
               <input type="search" v-debounce:500ms="handleSearch" v-model="searchQuery"
                    placeholder="Search Something ..." class="w-full p-2 border-gray-700 my-3 rounded-lg">
          </div>
          <div>
               <h1>Products</h1>

               <Table>
                    <template #table-header>
                         <th class=" border border-slate-300 px-4 py-2">ID</th>

                         <th class=" border border-slate-300 px-4 py-2">Name</th>

                         <th class=" border border-slate-300 px-4 py-2">Stock</th>



                         <th class=" border border-slate-300 px-4 py-2">Price</th>

                         <th class=" border border-slate-300 px-4 py-2">Category</th>

                         <th class=" border border-slate-300 px-4 py-2">Image</th>

                         <th class=" border border-slate-300 px-4 py-2">Action</th>

                         <th class=" border border-slate-300 px-4 py-2">DELETE</th>
                    </template>

                    <template #table-body>

                         <tr v-for="product in products">
                              <td class=" border border-slate-300 px-4 py-2">{{ product.id }}</td>


                              <td v-if="!product.isEdit" class=" border border-slate-300 px-4 py-2">{{ product.name }}
                              </td>

                              <td v-else><input type="text" v-model="product.name"></td>

                              <td v-if="!product.isEdit" class=" border border-slate-300 px-4 py-2">{{ product.stock }}
                              </td>

                              <td v-else><input type="number" v-model="product.stock"></td>



                              <td v-if="!product.isEdit" class=" border border-slate-300 px-4 py-2">{{ product.price }}
                              </td>
                              <input v-else type="text" v-model="product.price">

                              <td v-if="!product.isEdit" class=" border border-slate-300 px-4 py-2">
                                   {{ product.category.name }}
                              </td>

                              <select v-else v-model="product.category_id">
                                   <option v-for="category in categories" :value="category.id">{{ category.name }}
                                   </option>
                              </select>

                              <td v-if="!product.isEdit" class=" border border-slate-300 px-4 
                              py-2">
                                   <img :src="`${imgURL}/${product.profile}`" alt="img" class="w-40">
                              </td>

                              <td v-else class=" border border-slate-300 px-4 
                              py-2">
                                   <img :src="`${imgURL}/${product.profile}`" alt="img" class="w-40">
                              </td>

                              <td v-if="!product.isEdit"><button class="bg-slate-700 text-white w-24"
                                        @click="product.isEdit = true">Edit</button></td>

                              <td v-else><button class="bg-slate-700 text-white w-24"
                                        @click="onUpdate(product)">Submit</button></td>

                              <td><button class="bg-red-700 text-white w-24"
                                        @click="deleteProduct(product.id)">DELETE</button></td>
                         </tr>
                    </template>
               </Table>
          </div>
     </div>
</template>
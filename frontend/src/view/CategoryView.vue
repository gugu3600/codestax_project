<script setup>
import Table from '@/components/Table.vue';
import { categoryAPI } from '@/services/api/categoryAPI';
import { onMounted, ref } from 'vue';

const categories = ref([]);
const makeCreate = ref(false);
async function showAllCategory() {

     try {
          
          const data = await categoryAPI.getAll();
          categories.value = data.map(c => ({ ...c, isEdit: false }))
     }

     catch (error) {
          console.error("Error fetching Categories", error);
     }

}
const newCategory = ref("");

const handleCreate = async () => {

     const name = newCategory.value;

     try {
          const data = await categoryAPI.create({ name });
          newCategory.value = "";
          categories.value.push({ ...data, isEdit: false });
          makeCreate.value = false;
     }
     catch {
          console.error("Error posting Category", error);
     }
}

async function updateCat(category) {
     try {
          await categoryAPI.update(category.id, { name: category.name });
          category.isEdit = false;
     }
     catch (error) {
          console.error("Error Updating Categories", error);
     }
}

async function deleteCat(id) {
     try {
          await categoryAPI.delete(id);
          categories.value = categories.value.filter(c => c.id != id);
     }

     catch (error) {
          console.error("Error Deleting Categories", error);
     }
}

onMounted(async () => {
     await showAllCategory();
     // console.log(categories.value);

})
</script>
<template>

     <div>
          <div>
               <div v-if="!makeCreate">
                    <button @click="() => { makeCreate = true }">
                    Create A Product</button>
               </div>
               
               <div v-else class="m-3 p-3">
                    <form @submit.prevent="handleCreate">
                         <h1 class="text-bold text-2xl mb-3">Create A New Category </h1>
                         <input type="text" placeholder="Category Name" class="p-2 mx-3" v-model="newCategory">
                         <button type="submit" class="bg-green-700 text-white p-3">Create Category</button>
                    </form>
               </div>
          </div>

               <div>
               <h1>Categories</h1>
               <Table>
                    <template #table-header>
                         <th class=" border border-slate-300 px-4 py-2">ID</th>
                         <th class=" border border-slate-300 px-4 py-2">Name</th>
                         <th class=" border border-slate-300 px-4 py-2 ">Actions</th>
                         <th class=" border border-slate-300 px-4 py-2 ">DELETE</th>
                    </template>

                    <template #table-body>
                         <tr v-for="category in categories" :key="category.id">
                              <td class=" border border-slate-300 px-4 py-2">{{ category.id }}</td>
                              <td v-if="!category.isEdit" class=" border border-slate-300 px-4 py-2">{{ category.name }}
                              </td>

                              <td v-else><input type="text" v-model="category.name" @keyup.enter="updateCat(category)">
                              </td>

                              <td><button class="bg-slate-700 text-white w-24"
                                        @click="category.isEdit = !category.isEdit">{{category.isEdit ? "Cancel" : "Edit"}}</button></td>

                              <td><button class="bg-red-700 text-white w-24"
                                        @click="deleteCat(category.id)">DELETE</button></td>
                         </tr>
                    </template>
               </Table>
          </div>

     </div>

</template>
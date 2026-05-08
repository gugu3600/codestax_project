import { ref } from "vue";
import { productAPI } from "@/services/api/productAPI";

export const products = ref(null);


export const getProducts = async () => {

    return products.value = await productAPI.getAll();
}
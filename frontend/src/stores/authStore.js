import { computed, ref } from "vue";


export const auth = ref(null);
// export const getToken = ref(localStorage.getItem("token") || null);

export const userId = computed(() => auth.value?.id || null);

export const setAuth = (user) => {
     auth.value = user;
     // getToken.value = token;
     // localStorage.setItem("token",token);
}

export const removeAuth = () => {
     
     auth.value = null;
     // getToken.value = null;
     // localStorage.removeItem("token");
}

export const isLoggedIn = computed(() => !!auth.value);


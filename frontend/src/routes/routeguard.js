import { authAPI } from "@/services/api/authAPI";
import { auth, isLoggedIn, removeAuth, setAuth } from "@/stores/authStore";
import Cookies from "js-cookie";

export const authGuard = (router) => {
     router.beforeEach(async (to, from) => {
          // const token = Cookies.get("token");
          // console.log(token);

           if(to.meta.authorize){
               try {
                    const res = await authAPI.verify();
                    setAuth(res);

                    if(res.role_id == 1 || res.role === "admin"){
                         return true;
                    }

                    throw new Error("Admin only allowed route");
               }

               catch(error){
                    window.alert(error.message);
                    return ("/");
               }
          }

          if (to.meta.auth && !isLoggedIn.value) {
               try {
                    const res = await authAPI.verify();
                    setAuth(res);
                    // console.log(isLoggedIn.value)
                    return true;
               } catch (err) {
                    removeAuth();
                    window.alert("Logged In required");
                    return { path: "/" }; 
               }
          }

         

          if (to.path === "/login" || to.path === "/register") {
               if (isLoggedIn.value) {
                    return { path: "/" };
               }

               try {
                    const res = await authAPI.verify();
                    if (res) {
                         setAuth(res);
                         return { path: "/" }; 
                    }
               } catch (err) {
                    return true;
               }
          }

          if(to.path === "/"){
               
               try {
                    const res = await authAPI.verify();
                    setAuth(res);
                    return true;
               }
               catch (error){
                    return true;
               }
          }
          return true;
     });
}
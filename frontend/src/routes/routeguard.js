import { authAPI } from "@/services/api/authAPI";
import { isLoggedIn, removeAuth, setAuth } from "@/stores/authStore";
import Cookies from "js-cookie";

export const authGuard = (router) => {
     router.beforeEach(async (to, from) => {
          // const token = Cookies.get("token");
          // console.log(token);
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

          if (to.path === "/" || to.path === "/register") {
               if (isLoggedIn.value) {
                    return { path: "/categories" };
               }

               try {
                    const res = await authAPI.verify();
                    if (res) {
                         setAuth(res);
                         return { path: "/categories" }; 
                    }
               } catch (err) {
                    return true;
               }
          }
          return true;
     });
}
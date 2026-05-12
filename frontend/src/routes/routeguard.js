import { authAPI } from "@/services/api/authAPI";
import { auth, isLoggedIn, removeAuth, setAuth } from "@/stores/authStore";
import Cookies from "js-cookie";

export const authGuard = (router) => {
  router.beforeEach(async (to, from) => {

    const hasToken = Cookies.get("token");


    if (to.meta.authorize) {
      try {
        const res = await authAPI.verify();
        setAuth(res);
        if (res.role_id == 1 || res.role === "admin") return true;
        throw new Error("Admin only allowed route");
      } catch (error) {
        window.alert(error.message);
        return "/";
      }
    }

    if ((to.path === "/login" || to.path === "/register") && hasToken) {
      try {
        const res = await authAPI.verify();
        if (res) return "/";
      } catch (err) {
        return true; 
      }
    }
    if (to.path === "/") {
      if (hasToken && !isLoggedIn.value) {
        try {
          const res = await authAPI.verify();
          setAuth(res);
        } catch (e) {
          removeAuth();
        }
      }
      return true;
    }

    return true;
  });
};
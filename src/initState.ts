import { SplashScreen } from "@capacitor/splash-screen";
import router from "./router";
import store from "./store";
import axios from "axios";

async function init() {
  axios.defaults.baseURL = "https://nutri-log-server.herokuapp.com/api";

  const catalogItems = await axios.get("/items");
  store.commit("setCatalog", catalogItems.data);

  if (localStorage.getItem("userId")) {
    const user = await axios.get(`/users/${localStorage.getItem("userId")}`);
    store.commit("setUser", user.data);
  }

  SplashScreen.hide();

  if (!store.getters.isLoggedIn) {
    setTimeout(() => {
      router.push("/signin")
    }, 100);
  }
}

init();

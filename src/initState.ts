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
    const { 
      log, 
      email, 
      firstName, 
      lastName, 
      macronutrientCalibrations, 
      customItems,
      _id
    } = user.data;
    store.commit("setUser", { email, firstName, lastName, _id });
    store.commit("setLog", log);
    store.commit("setCustomItems", customItems);
    store.commit("setMacronutrientCalibrations", macronutrientCalibrations);
  }

  SplashScreen.hide();

  if (!store.getters.isLoggedIn) {
    setTimeout(() => {
      router.push("/signin")
    }, 100);
  }
}

init();

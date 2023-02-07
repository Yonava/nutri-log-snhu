import { SplashScreen } from "@capacitor/splash-screen";
import router from "./router";
import vuexStore from "./store";
import axios from "axios";

async function init() {

  SplashScreen.show();

  axios.defaults.baseURL = "https://nutri-log-server.herokuapp.com/api";

  vuexStore.dispatch("configClientStore");

  const catalogItems = await axios.get("/items");
  vuexStore.commit("setCatalog", catalogItems.data);

  if (localStorage.getItem("userId")) {
    let user;
    try {
      user = await axios.get(`/users/${localStorage.getItem("userId")}`);
      const { 
        log, 
        email, 
        firstName, 
        lastName, 
        macronutrientCalibrations, 
        customItems,
        _id
      } = user.data;
      vuexStore.commit("setUser", { email, firstName, lastName, _id });
      vuexStore.commit("setLog", log);
      vuexStore.commit("setCustomItems", customItems);
      vuexStore.commit("setMacronutrientCalibrations", macronutrientCalibrations);
    } catch (err) {
      console.warn(err)
    }
  }

  SplashScreen.hide();

  if (!vuexStore.getters.isLoggedIn) {
    setTimeout(() => {
      router.push("/signin")
    }, 100);
  }
}

init();

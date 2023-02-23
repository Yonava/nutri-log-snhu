import { SplashScreen } from "@capacitor/splash-screen";
import router from "./router";
import vuexStore from "./store";
import axios from "axios";

export async function init() {

  SplashScreen.show();

  axios.defaults.baseURL = "https://nutri-log-server.herokuapp.com/api";

  await vuexStore.dispatch("configClientStore");

  if (localStorage.getItem("userId")) {
    let user;
    try {
      user = await axios.get(`/users/${localStorage.getItem("userId")}`);
      const { 
        log, 
        email, 
        firstName, 
        lastName, 
        dailyTargets, 
        customItems,
        _id
      } = user.data;
      vuexStore.commit("setUser", { email, firstName, lastName, _id });
      vuexStore.commit("setLog", log);
      vuexStore.commit("setCustomItems", customItems);
      vuexStore.commit("setDailyTargets", dailyTargets);
    } catch (err) {
      console.warn(err)
    }
  }

  SplashScreen.hide();

  if (!vuexStore.getters.isLoggedIn) {
    setTimeout(() => {
      router.push("/signin")
    }, 100);
  } else {
    setTimeout(() => {
      router.push("/")
    }, 100);
  }
}

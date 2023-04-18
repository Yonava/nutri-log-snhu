import { SplashScreen } from "@capacitor/splash-screen";
import router from "./router";
import vuexStore from "./store";
import axios from "axios";

export async function init() {

  SplashScreen.show();

  axios.defaults.baseURL = "https://nutri-log-server.herokuapp.com/api";

  await vuexStore.dispatch("configClientStore");

  if (localStorage.getItem('email') != '') {
    let response, user;
    const userEmail = localStorage.getItem('email');
    try {
      response = await axios.get(`/users`)
      .then(response => response.data);

      response.forEach((element: any) => {
        if (element.email == userEmail) user = element;
      });
      if (user === undefined) return;
      const { 
        log, 
        email, 
        firstName, 
        lastName, 
        dailyTargets, 
        customItems,
        _id
      } = user;
      vuexStore.commit("setUser", { email, firstName, lastName, _id });
      vuexStore.commit("setLog", log);
      vuexStore.commit("setCustomItems", customItems);
      vuexStore.commit("setDailyTargets", dailyTargets);
    } catch (err) {
      console.warn(err)
    }
  }

  // TODO: remove this... temporary to show off/test splash screen
  setTimeout(() => {
    SplashScreen.hide();
  }, 3000);

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
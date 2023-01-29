import { SplashScreen } from "@capacitor/splash-screen";
import router from "./router";
import store from "./store";
import axios from "axios";

function init() {
  axios.defaults.baseURL = "https://nutri-log-server.herokuapp.com/api";

  
  SplashScreen.hide();
  if (!store.getters.isLoggedIn) {
    setTimeout(() => {
      router.push("/signin")
    }, 100);
  }
}

init();

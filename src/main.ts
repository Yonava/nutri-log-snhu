import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

import DefaultHeader from './base/DefaultHeader.vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

import store from './store'

import { SplashScreen } from '@capacitor/splash-screen';

Amplify.configure(awsExports);

const app = createApp(App)
  .use(store)
  .use(IonicVue)
  .use(router);

app.component('default-header', DefaultHeader);

// app.config.globalProperties.$SplashScreen = SplashScreen;
// app.config.globalProperties.$SplashScreeen.setSplashScreen({
//   image: '../public/assets/icon/icon.png',
//   resizeMode: 'contain',
//   backgroundColor: '#ffffff'
// })

router.isReady().then(() => {
  app.mount('#app');
});
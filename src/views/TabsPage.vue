<template>
  <ion-page>
    <ion-menu content-id="home-tab-content" menu-id="profile-menu">
      <ion-header>
        <ion-toolbar color="tertiary">
          <ion-title>Menu Content</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">This is the menu content.</ion-content>
    </ion-menu>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="scan" href="/tabs/scan">
          <ion-icon :icon="scanOutline" />
          <ion-label>Scan</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon :icon="nutrition" />
          <ion-label>Home</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="log" href="/tabs/log">
          <ion-icon :icon="document" />
          <ion-label>Log</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { 
  IonTabBar,  
  IonTabButton, 
  IonTabs, 
  IonLabel, 
  IonIcon, 
  IonPage, 
  IonRouterOutlet,
} from '@ionic/vue';
import { 
  scanOutline, 
  document, 
  nutrition
} from 'ionicons/icons';

export default defineComponent({
  name: 'TabsPage',
  components: { 
    IonLabel, 
    IonTabs, 
    IonTabBar, 
    IonTabButton, 
    IonIcon, 
    IonPage, 
    IonRouterOutlet 
  },
  setup() {
    return {
      scanOutline,
      document,
      nutrition,
    }
  }
});
</script>

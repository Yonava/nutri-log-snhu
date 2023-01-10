<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/scan">
          <ion-icon :icon="scanOutline" />
          <ion-label>Scan</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/home">
          <ion-icon :icon="nutrition" />
          <ion-label>Home</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="tab3" href="/tabs/log">
          <ion-icon :icon="document" />
          <ion-label>Log</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { scanOutline, document, nutrition } from 'ionicons/icons';

export default defineComponent({
  name: 'TabsPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      scanOutline,
      document,
      nutrition,
    }
  }
});
</script>

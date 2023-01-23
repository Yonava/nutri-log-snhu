<template>
  <ion-page>
    <ion-content>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/tabs/log"></ion-back-button>
          </ion-buttons>
          <ion-title>{{ itemId }}</ion-title>
        </ion-toolbar>
      </ion-header>
      Detail Page for {{ itemId }}
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonBackButton,
  IonButtons,
  IonToolbar,
  IonContent,
  IonTitle,
  IonHeader
} from '@ionic/vue';

import { useRoute } from 'vue-router';

export default {
  components: {
    IonPage,
    IonBackButton,
    IonButtons,
    IonContent,
    IonToolbar,
    IonTitle,
    IonHeader
  },
  setup() {
    const route = useRoute();
    const { itemId } = route.params;

    return {
      itemId
    };
  }
}
</script>